import { Cashfree } from "cashfree-pg";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    console.log("Request received");
    try {
      const requestData = await req.json();
      const { order_id, order_amount, customer_id, customer_phone } = requestData;
      
      // Set Cashfree credentials from environment variables
      Cashfree.XClientId = process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID;
      Cashfree.XClientSecret = process.env.NEXT_PUBLIC_CASHFREE_CLIENT_SECRET;
      Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
  
      // Configure order request
      const request = {
        order_amount: order_amount,
        order_currency: "INR",
        order_id: order_id,
        customer_details: {
          customer_id: customer_id,
          customer_phone: customer_phone,
        },
        order_meta: {
          return_url: "http://dev.boilerplate.bsamaritan.com",  // Redirect URL after payment
        },
      };
  
      // Create an order with Cashfree
      const response = await Cashfree.PGCreateOrder("2023–08–01", request);
      if (response.status == 200) {
        return NextResponse.json({
          success: true,
          message: "Order created successfully!",
          data: response.data,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "No response data received from Cashfree.",
          },
          { status: 500 }
        );
      }
    } catch (error) {
      console.log("Error in order creation:", error);
      return NextResponse.json(
        {
          success: false,
          message:  "Error processing the request.",
        },
        { status: 500 }
      );
    }
  }