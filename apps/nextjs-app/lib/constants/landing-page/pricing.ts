import { PricingProps } from "@repo/ts-types/landing-page/pricing";
import { supportEmailAddress } from "../appDetails";

export const pricingList: PricingProps[] = [
    {
        title: "Trial",
        popular: 1,
        price: "$0",
        priceType: "",
        unregisteredHref: "/auth/login",
        registeredHref: "/",
        description:
          "To test live how this project works, you can use this trial plan and perform 20 credits worth of operations.",
        unregisteredButtonText: "Get Started",
        registeredButtonText: "Go to Dashboard",
        benefitList: [
          {title: "Open Source Code"},
          {title: "Testing how it works live"},
          {title: "Latest Tools and Technologies"},
          {title: "20 credits"},
          {title: "Mail Support"},
        ],
      },
      {
        title: "Small Pack",
        popular: 0,
        price: "$1.99",
        priceType: "",
        unregisteredHref: "/auth/login",
        registeredHref: "/billing",
        description:
          "To test live how this project works, you can use this trial plan and perform 200 credits worth of operations.",
        unregisteredButtonText: "Get Started",
        registeredButtonText: "Go to BillingPage",
        benefitList: [
          {title: "Open Source Code"},
          {title: "Testing how it works live"},
          {title: "Latest Tools and Technologies"},
          {title: "200 credits"},
          {title: "Mail Support"},
        ],
      },
      {
        title: "Medium Pack",
        popular: 0,
        price: "$4.99",
        priceType: "",
        unregisteredHref: "/auth/login",
        registeredHref: "/billing",
        description:
          "To test live how this project works, you can use this trial plan and perform 500 credits worth of operations.",
        unregisteredButtonText: "Get Started",
        registeredButtonText: "Go to Billing Page",
        benefitList: [
          {title: "Open Source Code"},
          {title: "Testing how it works live"},
          {title: "Latest Tools and Technologies"},
          {title: "500 credits"},
          {title: "Mail Support"},
        ],
      },
      {
        title: "Large Pack",
        popular: 0,
        price: "$9.99",
        priceType: "",
        unregisteredHref: "/auth/login",
        registeredHref: "/billing",
        description:
          "To test live how this project works, you can use this trial plan and perform 1000 credits worth of operations.",
        unregisteredButtonText: "Get Started",
        registeredButtonText: "Go to Billing Page",
        benefitList: [
          {title: "Open Source Code"},
          {title: "Testing how it works live"},
          {title: "Latest Tools and Technologies"},
          {title: "1000 credits"},
          {title: "Mail Support"},
        ],
      },
      {
        title: "Enterprise",
        popular: 0,
        price: "ꝏ",
        priceType: "",
        unregisteredHref: "https://mail.google.com/mail?view=cm&fs=1&to=support@bayesian-labs.com&su=Support",
        registeredHref: "/https://mail.google.com/mail?view=cm&fs=1&to=support@bayesian-labs.com&su=Support",
        description:
          "Hire us to customize the project as per your requirements and get all the future updates.",
        unregisteredButtonText: "Contact Us",
        registeredButtonText: "Contact Us",
        benefitList: [
          {title: "Open Source Code"},
          {title: "Testing how it works live"},
          {title: "Latest Tools and Technologies"},
          {title: "All Future Updates"},
          {title: "Mail Support"},
        ],
      },
];

export const pricingSection = {
    pricingList,
    heading: "Pricing",
    description: "Choose the best plan for you. We offer a free plan and a 14-day free trial for all paid plans.",
    supportEmailAddress
};