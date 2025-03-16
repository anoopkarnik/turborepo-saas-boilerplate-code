import { CancellationRefundPoliciesProps } from "@repo/ts-types/landing-page/legal"



const CancellationRefundPolicies = ({cancellationRefundPolicies}:{
    cancellationRefundPolicies:CancellationRefundPoliciesProps}) => {
  return (
    <div className='p-6 mx-[20%]'>
        <h2 className='text-title-h1'>Return and Refund Policy</h2>

        <p className="text-description mb-6">Last updated: {cancellationRefundPolicies.lastUpdated}</p>
        <p className="mb-4">Thank you for shopping at {cancellationRefundPolicies.siteName}.</p>
        <p className="mb-4">If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns. This Return and Refund Policy has been created with the help of the <a href="https://www.freeprivacypolicy.com/free-return-refund-policy-generator/" target="_blank">Free Return and Refund Policy Generator</a>.</p>
        <p className="mb-4">The following terms are applicable for any products that You purchased with Us.</p>
        
        <h2 className="text-title-h2 mt-6 mb-2">Interpretation and Definitions</h2>
        
        <h3 className="text-title-h3 mt-4 mb-2">Interpretation</h3>
        <p className="mb-4">The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
        
        <h3 className="text-title-h3 mt-4 mb-2">Definitions</h3>
        <p className="mb-4">For the purposes of this Return and Refund Policy:</p>

        <ul className="list-disc ml-8 mb-4">
            <li className="mb-2">
                <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to {cancellationRefundPolicies.companyLegalName}.</p>
            </li>
            <li className="mb-2">
                <p><strong>Goods</strong> refer to the items offered for sale on the Service.</p>
            </li>
            <li className="mb-2">
                <p><strong>Orders</strong> mean a request by You to purchase Goods from Us.</p>
            </li>
            <li className="mb-2">
                <p><strong>Service</strong> refers to the Website.</p>
            </li>
            <li className="mb-2">
                <p><strong>Website</strong> refers to {cancellationRefundPolicies.siteName}, accessible from <a href={cancellationRefundPolicies.websiteUrl} rel="external nofollow noopener" target="_blank">{cancellationRefundPolicies.websiteUrl}</a></p>
            </li>
            <li className="mb-2">
                <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </li>
        </ul>

        <h2 className="text-title-h2 mt-6 mb-2">Your Order Cancellation Rights</h2>
        <p className="mb-4">You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</p>
        <p className="mb-4">The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
        <p className="mb-4">In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>
        
        <ul className="list-disc ml-8 mb-4">
            <li className="mb-2">By email: {cancellationRefundPolicies.supportEmailAddress}</li>
        </ul>
        <p className="mb-4">We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
        
        <h2 className="text-title-h2 mt-6 mb-2">Conditions for Returns</h2>
        <p className="mb-4">In order for the Goods to be eligible for a return, please make sure that:</p>
        
        <ul className="list-disc ml-8 mb-4">
        <li className="mb-2">The Goods were purchased in the last 7 days</li>
        <li className="mb-2">The Goods are in the original packaging</li>
        </ul>
        <p className="mb-4">The following Goods cannot be returned:</p>
        
        <ul className="list-disc ml-8 mb-4">
        <li className="mb-2">The supply of Goods made to Your specifications or clearly personalized.</li>
        <li className="mb-2">The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
        <li className="mb-2">The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
        <li className="mb-2">The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
        </ul>
        <p className="mb-4">We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>
        <p className="mb-4">Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.</p>
        
        <h2 className="text-title-h2 mt-6 mb-2">Returning Goods</h2>
        <p className="mb-4">You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address:</p>
        <p className="mb-4">Digital Product</p>
        <p className="mb-4">We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>
        
        <h2 className="text-title-h2 mt-6 mb-2">Gifts</h2>
        <p className="mb-4">If the Goods were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.</p>
        <p className="mb-4">If the Goods weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.</p>
        
        <h3 className="text-title-h3 mt-4 mb-2">Contact Us</h3>
        <p className="mb-4">If you have any questions about our Returns and Refunds Policy, please contact us:</p>
        <ul className="list-disc ml-8 mb-4">
        <li className="mb-2">By email: {cancellationRefundPolicies.supportEmailAddress}</li>
        </ul>
    </div>
  )
}

export default CancellationRefundPolicies