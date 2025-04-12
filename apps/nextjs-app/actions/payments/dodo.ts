"use server"

import DodoPayments from 'dodopayments';
import { auth } from '@repo/auth/better-auth/auth';
import db from '@repo/prisma-db/client';
import { redirect } from 'next/navigation';
import { CountryCode } from 'dodopayments/resources/misc/supported-countries.mjs';
import { getCreditsPack, PackId } from '../../lib/constants/billing';
import { headers } from 'next/headers';
const client = new DodoPayments({
  bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted
  environment: 'test_mode', // defaults to 'live_mode'
});


export async function PurchaseCreditsWithDodo(packId: PackId) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    
    await db.user.findUnique({
        where: {
            id: session.user.id
        }
    })
    
    const userFinancial = await db.userFinancial.findUnique({
        where: {
            userId: session.user.id
        }
    })
   
    if (!userFinancial) {
        throw new Error("Billing Address not added");
    }

    const selectedPack = getCreditsPack(packId);

    if(!selectedPack){
        throw new Error("Invalid pack selected");
    }

    const payment = await client.payments.create({
        billing: { city: userFinancial.city, country: userFinancial.country as CountryCode,
             state: userFinancial.state, street: userFinancial.street, zipcode: userFinancial.zipcode },
        customer: { customer_id: userFinancial.customerId },
        product_cart: [{ product_id: selectedPack.productId as string, quantity: 1 }],
        payment_link:true,
        return_url: process.env.NEXT_PUBLIC_URL + "/billing",
        metadata: {
            userId: session.user.id,
            packId
        }
    });

    redirect(payment.payment_link as string);
}


export async function createNewCustomer(name:string, email:string){
    const customer = await client.customers.create({
        name,
        email
    });
    return customer;
}

export async function getCountryCodes(){
    return client.misc.supportedCountries.list();
}


export async function HandleCheckoutSessionCompleted(event: any){
    if(event.type!="payment.succeeded"){
        throw new Error("Payment not succeeded");
    }
    if(!event.data.metadata){
        throw new Error("Metadata not found in event");
    }
    const { userId, packId} = event.data.metadata;
    if (!userId){
        throw new Error("User not found in session");
    }
    if (!packId){
        throw new Error("Pack not found in session");
    }

    const purchasedPack = getCreditsPack(packId as PackId);
    if(!purchasedPack){
        throw new Error("Purchased Pack not found");
    }

    await db.user.update({
        where:{id: userId},
        data:{
            creditsTotal:{
                increment: purchasedPack.credits
            }
        }
    })

    await db.userPurchase.create({
        data:{
            userId,
            eventId: event.data.payment_id,
            description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
            amount: event.data.total_amount,
            currency: event.data.currency,

        }
    })
}