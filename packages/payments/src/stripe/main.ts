'use server'

import { auth } from '@repo/auth/better-auth/auth';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil'
})

export async function createCheckoutSession(credits:number){
        const userSession = await auth.api.getSession({
            headers: await headers(),
        });
        if (!userSession?.user?.id) {
            throw new Error("User not authenticated");
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${credits} Credits`
                        },
                        unit_amount: Math.round((credits/50)*100)
                    },
                    quantity: 1
                }
            ],
            customer_creation: 'always',
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
            client_reference_id: userSession.user.id.toString(),
            metadata: {
                credits
            }
        })
        return redirect(session.url!)
}