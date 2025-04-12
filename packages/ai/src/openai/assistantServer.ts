"use server"; // Ensure this stays a server action

import OpenAI from "openai";
import {auth} from "@repo/auth/better-auth/auth"
import { headers } from "next/headers";

const threadMap = new Map<string, string>();


export async function handleAssistantMessage(chatMessage: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if(!session){
        throw new Error("User not authenticated")
    }
    const userId = session.user.id;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });
    const assistant_id = process.env.OPENAI_ASSISTANT_ID as string;

    let threadId = threadMap.get(userId)

    if (!threadId) {
        const thread = await openai.beta.threads.create();
        threadId = thread.id;
        threadMap.set(userId, threadId); // Store client-specific thread
    }

    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: chatMessage,
    });

    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
        assistant_id,
        instructions: `
            - Maintain a polite, conversational tone.
            - Use clear and concise sentences.
            - Add line breaks between different points or steps.
            - Format any lists as:
            1. Step 1
            2. Step 2
            - Use bold text for emphasis and wrap inline code with backticks (\`).
            - End each response with a brief summary or suggestion if applicable.
        `,
    });

    if (run.status === "completed") {
        const messages: any = await openai.beta.threads.messages.list(run.thread_id);
        return messages.data[0].content[0].text.value;
    } else {
        throw new Error("Failed to generate a response.");
    }
}
