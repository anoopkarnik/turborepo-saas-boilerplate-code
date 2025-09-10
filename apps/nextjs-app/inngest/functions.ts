import { StreamTranscriptItem } from "@/app/(home)/(clones)/meet-ai/_utils/types";
import { inngest } from "./client";
import JSONL from "jsonl-parse-stringify";
import db from "@repo/prisma-db/client";
import { createAgent, openai, TextMessage } from "@inngest/agent-kit"

const summarizer = createAgent({
    name: "summarizer",
    system: `
        You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

        Use the following markdown structure for every output:

        ### Overview
        Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

        ### Notes
        Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

        Example:
        #### Section Name
        - Main point or demo shown here
        - Another key insight or interaction
        - Follow-up tool or explanation provided

        #### Next Section
        - Feature X automatically does Y
        - Mention of integration with Z
    `.trim(),
    model: openai({model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY}),
})

export const meetingsProcessing = inngest.createFunction(
    {id: "meetings/processing"},
    {event: "meetings/processing"},
    async ({event, step}) => {
        const response = await step.run("fetch-transcript", async () =>{
            return fetch(event.data.transcriptUrl).then((res) => res.text())
        })

        const transcript = await step.run("parse-transcript", async () =>{
            return JSONL.parse<StreamTranscriptItem>(response);
        })

        const transcriptWithSpeakers = await step.run("add-speakers",async () =>{
            const speakersIds = [
                ...new Set(transcript.map(item => item.speaker_id))
            ]
            const userSpeakers = await db.user.findMany({
                where: { id: { in: speakersIds } },
            })

            const agentSpeakers = await db.agents.findMany({
                where: { id: { in: speakersIds } },
            })

            const speakers = [...userSpeakers, ...agentSpeakers];

            return transcript.map(item => {
                const speaker = speakers.find(s => s.id === item.speaker_id);
                if (!speaker) {
                    return {
                        ...item,
                        user: {
                            name: "Unknown"
                        }
                    }
                }
                return {
                    ...item,
                    user: {
                        name: speaker.name
                    }
                }
            })
        })

        const { output } = await summarizer.run(
            "Summarize the follwing transcript: " + JSON.stringify(transcriptWithSpeakers)
        );

        await step.run("save-summary", async () =>{
            await db.meetings.update({
                where: { id: event.data.meetingId },
                data: { 
                    summary: (output[0] as TextMessage).content as string,
                    status: "COMPLETED",
                },
            })
        })

        
    },
)