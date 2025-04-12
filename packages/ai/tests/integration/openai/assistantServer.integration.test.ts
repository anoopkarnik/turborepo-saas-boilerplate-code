import { describe, test, expect, beforeEach,vi } from "vitest";
import OpenAI from "openai";
import { handleAssistantMessage } from "../../../src/openai/assistantServer";
import dotenv from "dotenv";
dotenv.config();

// This is an integration test, using real OpenAI API calls

vi.mock("@repo/auth/better-auth/auth", () => ({
    auth: vi.fn(() => Promise.resolve({ user: { id: "user123" } }))
}));

describe("handleAssistantMessage - Integration Test",{timeout: 15_000}, () => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });


    test("should authenticate user and return AI response", async () => {
        const response = await handleAssistantMessage("Hello, AI!");
        
        expect(response).toBeDefined();
        expect(typeof response).toBe("string");
    });

    test("should interact with OpenAI and get a valid response", async () => {
        const thread = await openai.beta.threads.create();
        const threadId = thread.id;

        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: "Tell me a joke"
        });

        const run = await openai.beta.threads.runs.createAndPoll(threadId, {
            assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
            instructions: "Keep the response fun and engaging."
        });

        if (run.status === "completed") {
            const messages: any = await openai.beta.threads.messages.list(run.thread_id);
            const responseText = messages.data[0].content[0].text.value;
            
            expect(responseText).toBeDefined();
            expect(typeof responseText).toBe("string");
        } else {
            throw new Error("Failed to complete OpenAI response.");
        }
    });
});
