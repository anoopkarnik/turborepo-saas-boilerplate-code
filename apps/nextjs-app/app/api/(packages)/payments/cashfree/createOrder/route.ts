import { NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";

export async function POST(request: Request) {
    const { order_amount, customer_id, customer_email, customer_name} = await request.json();
    
    try {
        Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
        Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
        if(process.env.NEXT_PUBLIC_ENV==="development"){
            Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
        }else{
            Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
        }
        
        // Configure order request
        const request = {
          order_amount: order_amount,
          order_currency: "INR",
          order_id: `order_${new Date().getTime()}`,
          customer_details: {
            customer_id: customer_id,
            customer_phone: "+919999999999",
            customer_email: customer_email,
            customer_name: customer_name,
          },
          order_meta: {
            return_url: process.env.NEXT_PUBLIC_URL+"/api/payments/updateAccess",  // Redirect URL after payment
          },
        };
    
        // Create an order with Cashfree
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        if(response.status === 200){
          return NextResponse.json({success:"Order created successfully",data:response.data});
        }else{
          return NextResponse.json({error:"Error creating order as no response from Cashfree"});
        }
  
        
      } catch {
        return NextResponse.json({error:"Error running the function"});
      }
}