import { increaseCredits} from "@repo/prisma-db/repo/user";
import { NextResponse } from "next/server";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";



export async function shareRoute(request: Request, handler: (request: Request, body?: any,formData?:any) => Promise<Response>) {

    let body: any;
    const session = await auth.api.getSession({
        headers: await headers(),
    });;

    // Determine the content type
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        body = await request.json(); // Parse JSON body
        if (!session) {
            return NextResponse.json({error:"User details not found"},{status:400});
        }
        if (session?.user.creditsUsed>=session?.user?.creditsTotal) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
       
        await increaseCredits(session.user.id,1);
        return await handler(request,body);
    } else if (contentType?.includes("multipart/form-data")) {
        const formData = await request.formData(); // Parse form-data body
        if (!session) {
            return NextResponse.json({error:"User details not found"},{status:400});
        }
        if (session?.user.creditsUsed>=session?.user.creditsTotal) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        await increaseCredits(session.user.id,1);
        return await handler(request,formData);
    } else {
        throw new Error("Unsupported Content-Type");
    }
}