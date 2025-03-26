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
        await increaseCredits(session.user.id,200);

        if(!prompt ){
            return NextResponse.json({error: 'Prompt is required '}, {status: 400});
        }

        const input = {
            loop: true,
            prompt: prompt,
            duration: 5,
            aspect_ratio: "16:9"
          };

          const output = await replicate.run("luma/ray-flash-2-720p", { input });
          
          
          const chunks: any[] = [];
          for await (const chunk of output as any) {
            chunks.push(chunk);
          }
        
          const buffer = Buffer.concat(chunks);
        
          return new NextResponse(buffer, {
            headers: {
              "Content-Type": "video/mp4",
            },
          });

    }catch(error){
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
}