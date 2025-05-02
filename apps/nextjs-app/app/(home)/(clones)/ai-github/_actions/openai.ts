"use server"
import {streamText} from "ai";
import { createStreamableValue } from "ai/rsc";
import { generateEmbedding } from "@repo/ai/openai/base";
import db from "@repo/prisma-db/client";
import { openai } from '@ai-sdk/openai';


export async function askQuestion(question: string, projectId: string) {
    const stream = createStreamableValue();
    const queryVector = await generateEmbedding(question);
    const vectorQuery = `[${queryVector.join(",")}]`;

    const result = await db.$queryRaw`
    Select "fileName", "summary", "sourceCode",
    1-("summaryEmbedding" <=> ${vectorQuery}::vector) as "similarity"
    from "github_schema"."SourceCodeEmbedding"
    where  1-("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.4
    and "projectId" = ${projectId}
    order by "similarity" desc
    limit 10` as {fileName: string, summary: string, sourceCode: string, similarity: number}[];
    console.log(result)
    let context = ''

    for (const doc of result) {
        context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\n sumary of file: ${doc.summary}\n\n`
    }


    (async () =>{
        const {textStream} = await streamText({
            model: openai("gpt-4o"),
            prompt: `
            You are a ai code assistant who answers questions about the codebase. Your target audience is a 
            technical intern.
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of Ai include expert knowledge , helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful 
            responses to the user. 
            AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any 
            question about any topic in the world.
            If the question is asking about code or a specific file, Ai will provide the detailed answer, giving
            step by step instruction.
            START CONTEXT BLOCK
            ${context}
            END CONTEXT BLOCK
            
            START QUESTION
            ${question}
            END OF QUESTION
            AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the context does not provide the answer to question, the AI assistant will say, "I'm sorrcy, 
            but I don't know the answer to that question."
            AI assistant will not apologize for previous responses, but instead will indicated new information 
            was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering, 
            make sure there is no ambiguity in your answer.`
        })
        for await (const delta of textStream) {
            stream.update(delta)
        }
        stream.done()
    })()
    return {
        output: stream.value,
        fileReferences: result
    }
}