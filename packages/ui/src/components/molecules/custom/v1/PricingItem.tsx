import { Badge } from "../../../atoms/shadcn/badge";
import { Button } from "../../../atoms/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../molecules/shadcn/card";
import { Check } from "lucide-react";
import { PricingProps } from "@repo/ts-types/landing-page/v1";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

enum PopularPlanType {
    NO = 0,
    YES = 1,
  }
  

const PricingItem = ({pricing}:{pricing:PricingProps}) => {
    const isExternal = pricing.registeredHref.includes("https");
    
        const {data:session} = useSession()
    
        const router = useRouter()

  return (
    <Card
        key={pricing.title}
        className={
            pricing.popular === PopularPlanType.YES
            ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 max-w-[400px]"
            : "max-w-[400px]"
        }
        >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{pricing.price}</span>
                <span className="text-muted-foreground"> {pricing.priceType}</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
                {pricing.registeredHref.includes("https") && session?.user && 
                     <a href={pricing.registeredHref|| "#"} target="_blank" rel="noreferrer noopener" aria-label="External link"              >
                     <Button className="w-full">{pricing.registeredButtonText}</Button>
                   </a>
                }
                {pricing.registeredHref.includes("https") && !session?.user && 
                     <a href={pricing.unregisteredHref|| "#"} target="_blank" rel="noreferrer noopener" aria-label="External link"              >
                     <Button className="w-full">{pricing.unregisteredButtonText}</Button>
                   </a>
                }
                {!pricing.registeredHref.includes("https") && session?.user && 
                     <Button className="w-full" onClick={()=>router.push(pricing.registeredHref)}>{pricing.registeredButtonText}</Button>
                }
                {!pricing.registeredHref.includes("https") && !session?.user && 
                  <Button className="w-full" onClick={()=>router.push(pricing.unregisteredHref)}>{pricing.unregisteredButtonText}</Button>
                }
                
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />
                
            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
        </Card>
  )
}

export default PricingItem