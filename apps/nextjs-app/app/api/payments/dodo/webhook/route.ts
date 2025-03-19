import { NextResponse } from "next/server";
import { Webhook } from 'standardwebhooks';
import { headers } from "next/headers"
import { HandleCheckoutSessionCompleted } from "../../../../../actions/payments/dodo";

const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET as string);

export async function POST(request: Request) {
    const headersList = headers();

    try {
        const rawBody = await request.text();
    
        const webhookHeaders = {
          "webhook-id": headersList.get("webhook-id") || "",
          "webhook-signature": headersList.get("webhook-signature") || "",
          "webhook-timestamp": headersList.get("webhook-timestamp") || "",
        };
    
        await webhook.verify(rawBody, webhookHeaders);


        const event = JSON.parse(rawBody);

        HandleCheckoutSessionCompleted(event);

        return new NextResponse(null, { status: 200 });
    }catch (error) {
        console.log("Webhook processing failed", error);
        return Response.json(
          {
            error: "Webhook processing failed",
            details: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 400 }
        );
    }

}

