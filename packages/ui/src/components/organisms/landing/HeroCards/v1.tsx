import { TestimonialProps } from "@repo/ts-types/landing-page/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "../../../atoms/shadcn/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../molecules/shadcn/card";
import { LightbulbIcon } from "lucide-react";
import { TeamProps } from "@repo/ts-types/landing-page/team";
import { FeatureWithDescriptionProps } from "@repo/ts-types/landing-page/features";
import { PricingProps } from "@repo/ts-types/landing-page/pricing";
import PricingItem from "../../../../../../payments/src/components/molecules/v1/PricingItem";

const HeroCards = ({testimonials,teamList,features,pricingList}:{testimonials:TestimonialProps[] | undefined,
  teamList:TeamProps[] | undefined, features:FeatureWithDescriptionProps[] | undefined,
  pricingList: PricingProps[] | undefined
}) => {
  return (
    <div className="hidden xl:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-10 w-10 ">
              <AvatarImage src={testimonials && testimonials[0]?.image} className="h-full w-full object-contain" />
              <AvatarFallback>{testimonials && testimonials[0]?.userName.slice(0,1)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">{testimonials?.[0]?.name}</CardTitle>
            <CardDescription>{testimonials?.[0]?.userName}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>{testimonials?.[0]?.comment}</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src={teamList?.[0]?.imageUrl}
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">{teamList?.[0]?.name}</CardTitle>
          <CardDescription className="font-normal text-primary">
            {teamList?.[0]?.position}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            {teamList?.[0]?.description}
          </p>
        </CardContent>
      </Card>

      {/* Services */}

      <div className="absolute top-[180px] left-[50px] w-72 ">
        {pricingList?.[1] && <PricingItem pricing={pricingList[1]} />}
      </div>

      {/* Projects*/}
      {features && <Card className="absolute w-[350px] -right-[10px] top-[250px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightbulbIcon />
          </div>
          <div>
            <CardTitle>{features[3]?.title}</CardTitle>
            <CardDescription className="text-md mt-2 ">
              {features[3]?.description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>}
    </div>
  );
};

export default HeroCards;