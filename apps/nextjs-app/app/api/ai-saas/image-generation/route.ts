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
        const {prompt, amount="1", resolution="512x512"} = body;


        const userDetails = await getUserDetails();
        if (!userDetails) {
            return NextResponse.json({error:"User details not found"},{status:400});
        }
        if (userDetails?.creditsUsed>=userDetails?.creditsTotal) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        await increaseCredits(session.user.id,50);

        if (!configuration.apiKey){
            return NextResponse.json({error: 'API key is missing'}, {status: 500});
        }

        if (!configuration.apiKey){
            return NextResponse.json({error: 'API key is missing'}, {status: 500});
        }

        if(!prompt ){
            return NextResponse.json({error: 'Prompt is required '}, {status: 400});
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount,10),
            size: resolution
        })
        return NextResponse.json(response.data, {status: 200});   

    }catch(error){
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
}