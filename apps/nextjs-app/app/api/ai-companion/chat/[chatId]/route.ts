import { NextResponse } from "next/server";

import { MemoryManager} from "../../../../(home)/ai-companion/lib/memory";
import { ratelimit } from "../../../../(home)/ai-companion/lib/rate-limit";

import Replicate from "replicate";
import { auth } from "@repo/auth/next-auth/auth";

import db from "@repo/prisma-db/client";

export async function POST(req: Request, {params}: {params: {chatId: string}}){
    try{
        const {prompt} = await req.json();
        const session = await auth();

        if (!session.user) {
            return new NextResponse("User not authenticated", {status: 401});
        }

        const identifier = req.url + "-" + session.user.id;
        const { success} = await ratelimit(identifier)

        if (!success) {
            return new NextResponse("Rate limit exceeded", {status: 429});
        }
        
        const companion = await db.companion.update({
            where: {
                id: params.chatId,
                userId: session.user.id
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: session.user.id
                    }
                }
            }
        })

        if (!companion) {
            return new NextResponse("Companion not found", {status: 404});
        }

        const name = companion.id;
        const companion_file_name = name + ".txt";

        const companionKey = {
            companionName: name,
            userId: session.user.id,
            modelName: "llama3-70b"
        }

        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(companionKey);
        if (records.length == 0){
            await memoryManager.seedChatHistory(companion.seed,"\n\n", companionKey);
        }

        await memoryManager.writeToHistory("User: "+ prompt + "\n", companionKey);
        await memoryManager.addToPinecone(prompt, companionKey, companion_file_name);

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            companion_file_name
        )

        let relevantHistory = "";

        if(!! similarDocs && similarDocs.length > 0){
            relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
          });
        
        const input = {
            prompt: `Only generate plain sentences without prefix of who is speaking. DO 
            NOT use ${name}: prefix. 
            
            Below are the relevant details about ${name}'s
            past and the conversation you are in ${relevantHistory}
            
            ${recentChatHistory}\n${name}
            `,
            system_prompt: companion?.instructions,
        };
        
        let finalResult = "";

        for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", { input })) {
            finalResult += event.toString();
        }

        await memoryManager.writeToHistory(""+ finalResult?.trim(), companionKey);

        await memoryManager.addToPinecone(finalResult?.trim(), companionKey, companion_file_name);


        await db.companion.update({
            where: {
                id: params.chatId,
            },
            data:{
                messages:{
                    create:{
                        content: finalResult.trim(),
                        role: "system",
                        userId: session.user.id
                    }
                }
            }
        })
        

        return NextResponse.json(finalResult.trim());


    }catch(error){
        console.log( "[AI_COMPANION_CHAT_POST]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}