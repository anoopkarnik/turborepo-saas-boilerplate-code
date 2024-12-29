import { increaseCredits} from "@repo/prisma-db/repo/user";
import { getUserDetails } from "../home/_actions/prisma";
import { maxTrialCredits,maxProCredits } from "../../lib/constants/appDetails";
import { NextResponse } from "next/server";

export async function shareRoute(request: Request, handler: (request: Request, body?: any,formData?:any) => Promise<Response>) {
    let body: any;

    // Determine the content type
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        body = await request.json(); // Parse JSON body
        const userDetails = await getUserDetails(body.id);
        if (userDetails?.access=="TRIAL" && userDetails?.creditsUsed>=maxTrialCredits) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        if (userDetails?.access=="PRO" && userDetails?.creditsUsed>=maxProCredits) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        await increaseCredits(body.id,1);
        return await handler(request,body);
    } else if (contentType?.includes("multipart/form-data")) {
        const formData = await request.formData(); // Parse form-data body
        const userDetails = await getUserDetails(formData.get("id") as string);
        if (userDetails?.access=="TRIAL" && userDetails?.creditsUsed>=maxTrialCredits) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        if (userDetails?.access=="PRO" && userDetails?.creditsUsed>=maxProCredits) {
            return NextResponse.json({error:"Credits exhausted"},{status:400});
        }
        await increaseCredits(formData.get("id") as string,1);
        return await handler(request,formData);
    } else {
        throw new Error("Unsupported Content-Type");
    }
}