import { auth } from "@repo/auth/better-auth/auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { increaseCredits } from "@repo/prisma-db/repo/user";
import { headers } from "next/headers";

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
}

const openai = new OpenAI(configuration);

export async function POST(req: Request){
    try{
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const body = await req.json();
        const {messages} = body;

        if (!session.user) {
            return NextResponse.json({error:"User details not found"},{status:400});
        }
        if (session.user?.creditsUsed>=session.user?.creditsTotal) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        await increaseCredits(session.user.id,10);

        if (!configuration.apiKey){
            return NextResponse.json({error: 'API key is missing'}, {status: 500});
        }

        if(!messages ){
            return NextResponse.json({error: 'Messages is required '}, {status: 400});
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages
        })

        return NextResponse.json(response.choices[0]?.message, {status: 200});   

    }catch(error){
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
}