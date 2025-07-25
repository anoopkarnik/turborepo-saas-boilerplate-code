import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@repo/prisma-db/client"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil'
});

export async function POST (request: NextRequest){
    const body = await request.text();
    const signature = (await headers()).get("Stripe-Signature") as string;
    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    }catch (error) {
        return NextResponse.json({
            error: "Webhook Error: " + (error instanceof Error ? error.message : "Unknown error"),
        }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    console.log(event.type);

    if(event.type === "checkout.session.completed"){
        const credits = Number(session.metadata?.['credits']);
        const userId = session.client_reference_id;
        if (!credits || !userId) {
            return NextResponse.json({
                error: "Missing userId or credits",
            }, { status: 400 });
        }
        await db.user.update({
            where:{id: userId},
            data:{
                creditsTotal:{
                    increment: credits
                }
            }
        })
    
        await db.userPurchase.create({
            data:{
                userId,
                eventId: session.id,
                description: `${credits} credits`,
                amount: credits/50,
                currency: "USD",
    
            }
        })

        return NextResponse.json({
            message: "Checkout session completed and credits updated",
        }, { status: 200 });
    }

     



    return NextResponse.json({
        message: "Stripe webhook received but not processed",
    })
}