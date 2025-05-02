import Script from 'next/script';

function Payment() {
  return (
  <>
   <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />
  </>
 );
}

export default Payment;