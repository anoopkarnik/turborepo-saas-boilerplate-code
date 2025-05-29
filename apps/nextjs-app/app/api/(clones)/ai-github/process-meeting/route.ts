import { NextRequest } from "next/server";
import * as z from "zod";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import db from "@repo/prisma-db/client";
import { processMeeting } from "../../../../(home)/(clones)/ai-github/lib/assembly";

const bodyParser = z.object({
    meetingUrl: z.string(),
    projectId: z.string(),
    meetingId: z.string(),
})

export const maxDuration = 60 // 5 minutes

export async function POST(req: NextRequest){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;

    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    try {
        const body = await req.json();
        const {meetingUrl, meetingId} = bodyParser.parse(body);

        const {summaries} = await processMeeting(meetingUrl);

        await db.issue.createMany({
            data: summaries.map(summary => ({
                meetingId,
                start: summary.start,
                end: summary.end,
                summary: summary.summary,
                headline: summary.headline,
                gist: summary.gist,
            })),
        })

        await db.meeting.update({
            where: {id: meetingId},
            data:{
                status: "COMPLETED",
                name: summaries[0]!.headline,
            }
        })


        return Response.json({success: true}, { status: 200 });  
    }catch (error) {
        console.error("Error processing meeting", error);
        return Response.json({error: "Error processing meeting"}, {status: 500});
    }
}