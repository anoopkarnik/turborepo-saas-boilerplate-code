import {
    CallSessionParticipantLeftEvent,

    CallSessionStartedEvent,

} from "@stream-io/node-sdk";

import { NextRequest, NextResponse } from "next/server";
import db from "@repo/prisma-db/client"
import { AgentMeetingStatus } from "@prisma/client";
import { streamVideo} from "../../(home)/(clones)/meet-ai/_utils/stream-video";

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
        
    }


    return NextResponse.json({ status: 200 });
}