import { auth } from "@repo/auth/next-auth/auth";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getUserDetails } from "../../../../actions/user";
import { increaseCredits } from "@repo/prisma-db/repo/user";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(req: Request){
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const body = await req.json();
        const {prompt} = body;

        const userDetails = await getUserDetails();
        if (!userDetails) {
            return NextResponse.json({error:"User details not found"},{status:400});
        }
        if (userDetails?.creditsUsed>=userDetails?.creditsTotal) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        await increaseCredits(session.user.id,30);

        if(!prompt ){
            return NextResponse.json({error: 'Prompt is required '}, {status: 400});
        }

        const response = await replicate.run(
            "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
            {
              input: {
                top_k: 250,
                top_p: 0,
                prompt: prompt,
                duration: 3,
                temperature: 1,
                continuation: false,
                model_version: "stereo-large",
                output_format: "mp3",
                continuation_start: 0,
                multi_band_diffusion: false,
                normalization_strategy: "peak",
                classifier_free_guidance: 3
              },
            }
          );
        
        // ⛏️ Convert Node.js stream to buffer
        const chunks: any[] = [];
        for await (const chunk of response as any) {
            chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);

        return new NextResponse(buffer, {
        headers: {
            "Content-Type": "audio/mpeg",
        },
        });

    }catch(error){
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
}