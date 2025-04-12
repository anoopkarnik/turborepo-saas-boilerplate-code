import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import OpenAI from "openai";
import { auth } from "@repo/auth/better-auth/auth";
import { handleAssistantMessage } from "../../../src/openai/assistantServer";

vi.mock("@repo/auth/better-auth/auth", () => ({
    auth: vi.fn(() => Promise.resolve({ user: { id: "user123" } }))
}));

vi.mock("openai", () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            beta: {
                threads: {
                    create: vi.fn(),
                    messages: {
                        create: vi.fn(),
                        list: vi.fn(),
                    },
                    runs: {
                        createAndPoll: vi.fn(),
                    },
                },
            },
        })),
    };
});

describe("handleAssistantMessage", () => {
    const mockOpenAI = {
        beta: {
            threads: {
                create: vi.fn(),
                messages: {
                    create: vi.fn(),
                    list: vi.fn(),
                },
                runs: {
                    createAndPoll: vi.fn(),
                },
            },
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (OpenAI as unknown as any).mockImplementation(() => mockOpenAI);
    });

    test("should throw an error if user is not authenticated", async () => {
        (auth).mockResolvedValue(null);
        await expect(handleAssistantMessage("Hello"))
            .rejects.toThrow("User not authenticated");
    });

    test("should create a new thread if no thread exists for user", async () => {
        (auth as any).mockResolvedValue({ user: { id: "user123" } });
        mockOpenAI.beta.threads.create.mockResolvedValue({ id: "thread123" });
        mockOpenAI.beta.threads.messages.create.mockResolvedValue({});
        mockOpenAI.beta.threads.runs.createAndPoll.mockResolvedValue({ status: "completed", thread_id: "thread123" });
        mockOpenAI.beta.threads.messages.list.mockResolvedValue({
            data: [{ content: [{ text: { value: "Response from AI" } }] }]
        });

        const response = await handleAssistantMessage("Hello");
        
        expect(mockOpenAI.beta.threads.create).toHaveBeenCalled();
        expect(mockOpenAI.beta.threads.messages.create).toHaveBeenCalledWith("thread123", expect.any(Object));
        expect(response).toBe("Response from AI");
    });

    test("should reuse an existing thread for the user", async () => {
        (auth as any).mockResolvedValue({ user: { id: "user123" } });
        (global as any).threadMap = new Map();
        (global as any).threadMap.set("user123", "existing-thread");
        
        mockOpenAI.beta.threads.messages.create.mockResolvedValue({});
        mockOpenAI.beta.threads.runs.createAndPoll.mockResolvedValue({ status: "completed", thread_id: "existing-thread" });
        mockOpenAI.beta.threads.messages.list.mockResolvedValue({
            data: [{ content: [{ text: { value: "Existing thread response" } }] }]
        });

        const response = await handleAssistantMessage("What's up?");
        
        expect(mockOpenAI.beta.threads.create).not.toHaveBeenCalled(); // No new thread should be created
        expect(response).toBe("Existing thread response");
    });

    test("should throw an error if OpenAI run fails", async () => {
        (auth as any).mockResolvedValue({ user: { id: "user123" } });
        mockOpenAI.beta.threads.create.mockResolvedValue({ id: "thread123" });
        mockOpenAI.beta.threads.messages.create.mockResolvedValue({});
        mockOpenAI.beta.threads.runs.createAndPoll.mockResolvedValue({ status: "failed", thread_id: "thread123" });

        await expect(handleAssistantMessage("Test"))
            .rejects.toThrow("Failed to generate a response.");
    });
});
