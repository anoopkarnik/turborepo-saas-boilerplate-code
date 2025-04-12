"use client"
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "../../../atoms/shadcn/button";

import { useSession } from "@repo/auth/better-auth/auth-client";
import { useEffect, useState } from "react";
import {createOrder} from "@repo/server-utils/cashfree"
import { CrownIcon } from "lucide-react";

export const UpgradeToProButton = () => {
    const {data:session,status} = useSession();
    // Function to handle the "Buy Now" button click
    const [user, setUser] = useState<any>(null);

    useEffect(() =>{
        if (status === "authenticated") {
            setUser(session.user);
          } 
    },[session,status])
    
    const handleBuyNow = async () => {
    try {
      const response = await createOrder({
        order_amount: "20",
        customer_id: `${session?.user?.id}`,
        customer_email: `${session?.user?.email}`,
        customer_name: `${session?.user?.name}`

      });
      initiatePayment(response.data.payment_session_id);
    } catch (error) {
      console.log("Network Error:", error);
    }
  };
    let cashfree:any;
   const initializeSDK = async function () {          
        cashfree = await load({
            mode: process.env.NEXT_PUBLIC_ENV=="development"?"sandbox":"production",
        });
        return cashfree;
    }

    const initiatePayment = async (sessionId:string) => {
        const cashfree = await initializeSDK();
        let checkoutOptions = {
            paymentSessionId: sessionId,
            redirectTarget: "_self",
        };
        cashfree.checkout(checkoutOptions);
    };

    return (
      <div className="w-full flex justify-center relative">
        <Button className="flex gap-2 cursor-pointer w-full" onClick={handleBuyNow}>
          Upgrade to Pro
        </Button>
      </div>
    );
}
export default UpgradeToProButton;