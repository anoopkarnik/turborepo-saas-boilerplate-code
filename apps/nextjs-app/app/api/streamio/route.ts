import {
    CallEndedEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent, CallTranscriptionReadyEvent,
    CallSessionStartedEvent,
    MessageNewEvent,

} from "@stream-io/node-sdk";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources.mjs";
import { NextRequest, NextResponse } from "next/server";
import db from "@repo/prisma-db/client"
import { AgentMeetingStatus } from "@prisma/client";
import { streamVideo} from "../../(home)/(clones)/meet-ai/_utils/stream-video";
import { inngest } from "@/inngest/client";
import { streamChat } from "@/app/(home)/(clones)/meet-ai/_utils/stream-chat";
import { generateAvatarUri } from "@/app/(home)/(clones)/meet-ai/_utils/avatar";

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});


function verifySignatureWithSDK(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature");
    const apiKey = req.headers.get("x-api-key");

    if (!signature || !apiKey) {
        return NextResponse.json({ message: "Missing signature or API key" }, { status: 400 });
    }

    const body = await req.text();

    if (!verifySignatureWithSDK(body, signature)) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    let payload: unknown;

    try {
        payload = JSON.parse(body) as Record<string, unknown>;
    } catch  {
        return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }

    const eventType = (payload as Record<string, unknown>)?.type;

    if (eventType === "call.session_started"){
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;
        if (!meetingId) return NextResponse.json({ message: "Missing meetingId in call custom data" }, { status: 400 });

        const existingMeeting = await db.meetings.findUnique({ 
            where: {
                id: meetingId,
                status: { 
                    notIn: [AgentMeetingStatus.COMPLETED, AgentMeetingStatus.ONGOING,
                         AgentMeetingStatus.CANCELLED, AgentMeetingStatus.PROCESSING]
                },
            } 
        });
        if (!existingMeeting) {
            return NextResponse.json({ message: "Meeting not found or already started/cancelled" }, { status: 404 });
        }
        
        await db.meetings.update({
            where: { id: meetingId },
            data: { status: AgentMeetingStatus.ONGOING, startedAt: new Date() },
        });

        const existingAgent = await db.agents.findUnique({ 
            where: { id: existingMeeting.agentId } 
        });
        if (!existingAgent) {
            return NextResponse.json({ message: "Agent not found for the meeting" }, { status: 404 });
        }

        const call = streamVideo.video.call("default", meetingId);
        const realtimeClient = await streamVideo.video.connectOpenAi({
            call,
            openAiApiKey: process.env.OPENAI_API_KEY!,
            agentUserId: existingAgent.id
        })

        realtimeClient.updateSession({
            instructions: existingAgent.instructions,
        })

    } else if (eventType === "call.session_participant_left"){
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];
        if (!meetingId) return NextResponse.json({ message: "Missing meetingId in call CID" }, { status: 400 });

        const call = streamVideo.video.call("default", meetingId);
        await call.end();
        
    } else if (eventType === "call.session_ended"){
        const event = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;
        if (!meetingId) return NextResponse.json({ message: "Missing meetingId in call custom data" }, { status: 400 });

        await db.meetings.update({
            where: { id: meetingId, status: AgentMeetingStatus.ONGOING },
            data: { status: AgentMeetingStatus.PROCESSING, endedAt: new Date() },
        });
    } else if (eventType === "call.transcription_ready"){
        const event = payload as CallTranscriptionReadyEvent;
        const meetingId = event.call_cid.split(":")[1];
        const updatedMeeting = await db.meetings.update({
            where: { id: meetingId },
            data: { transcriptUrl: event.call_transcription.url},
        });
        if (!updatedMeeting) {
            return NextResponse.json({ message: "Meeting not found for transcription update" }, { status: 404 });
        }
        await inngest.send({
            name: "meetings/processing",
            data: {
                meetingId: updatedMeeting.id,
                transcriptUrl: updatedMeeting.transcriptUrl!,
            }
        })
    } else if (eventType === "call.recording_ready"){
        const event = payload as CallRecordingReadyEvent;
        const meetingId = event.call_cid.split(":")[1];
        const updatedMeeting = await db.meetings.update({
            where: { id: meetingId },
            data: { recordingUrl: event.call_recording.url},
        });
        if (!updatedMeeting) {
            return NextResponse.json({ message: "Meeting not found for recording update" }, { status: 404 });
        }
    } else if (eventType === "message.new"){
        const event = payload as MessageNewEvent;

        const userId = event.user?.id;
        const channelId = event.channel_id;
        const text = event.message?.text;

        if (!userId || !channelId || !text) {
            return NextResponse.json({ message: "Missing userId, channelId or text in message.new event" }, { status: 400 });
        }

        const existingMeeting = await db.meetings.findUnique({
            where: {id: channelId, status: AgentMeetingStatus.COMPLETED}
        })

        if (!existingMeeting) {
            return NextResponse.json({ message: "Meeting not found" }, { status: 404 });
        }

        const existingAgent = await db.agents.findUnique({
            where: { id: existingMeeting.agentId } 
        });
        if (!existingAgent) {
            return NextResponse.json({ message: "Agent not found for the meeting" }, { status: 404 });
        }

        if (userId !== existingAgent.id) {
            const instructions = `
                You are an AI assistant helping the user revisit a recently completed meeting.
                Below is a summary of the meeting, generated from the transcript:
                
                ${existingMeeting.summary}
                
                The following are your original instructions from the live meeting assistant. Please continue to follow these behavioral guidelines as you assist the user:
                
                ${existingAgent.instructions}
                
                The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
                Always base your responses on the meeting summary above.
                
                You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
                
                If the summary does not contain enough information to answer a question, politely let the user know.
                
                Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
            `;
            const channel = streamChat.channel("messaging", channelId);
            await channel.watch();

            const previousMessages = channel.state.messages.slice(-5)
               .filter((msg) => msg.text && msg.text.trim() !== "")
               .map<ChatCompletionMessageParam>((message) =>({
                    role: message.user?.id === existingAgent.id ? "assistant" : "user",
                    content: message.text || "",
               }))
            const gptResponse = await openaiClient.chat.completions.create({
                messages: [
                    { role: "system", content: instructions },
                    ...previousMessages,
                    { role: "user", content: text }
                ],
                model: "gpt-4o",
            })

            const responseText = gptResponse?.choices[0]?.message?.content;
            if (!responseText) {
                return NextResponse.json({ message: "No response from OpenAI" }, { status: 400 });
            }
            const avatarUrl = generateAvatarUri({seed: existingAgent.name, variant: "botttsNeutral" });

            streamChat.upsertUser({
                id: existingAgent.id,
                name: existingAgent.name,
                image: avatarUrl
            });

            channel.sendMessage({
                text: responseText,
                user: {
                    id: existingAgent.id,
                    name: existingAgent.name,
                    image: avatarUrl
                }
            });

        }

    }

    return NextResponse.json({ status: 200 });
}