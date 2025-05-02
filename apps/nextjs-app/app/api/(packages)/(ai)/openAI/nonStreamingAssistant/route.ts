import { handleAssistantMessage } from "@repo/ai/openai/assistantServer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { chatMessage } = await request.json();
        const reply = await handleAssistantMessage(chatMessage);
        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Error in OpenAI API:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
