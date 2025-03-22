import { auth } from "@repo/auth/next-auth/auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getUserDetails } from "../../../../actions/user";
import { increaseCredits } from "@repo/prisma-db/repo/user";

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
}

const openai = new OpenAI(configuration);

export async function POST(req: Request){
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const body = await req.json();
        const {messages} = body;

        const userDetails = await getUserDetails();
        if (!userDetails) {
            return NextResponse.json({error:"User details not found"},{status:400});
        }
        if (userDetails?.creditsUsed>=userDetails?.creditsTotal) {
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