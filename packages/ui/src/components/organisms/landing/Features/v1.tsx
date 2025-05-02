import { FeatureSectionProps } from "@repo/ts-types/landing-page/features";
import { Badge } from "../../../atoms/shadcn/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../molecules/shadcn/card";
import { useEffect, useState } from "react";

const Features = ({featureSection}:{featureSection:FeatureSectionProps}) => {
  const [headingArray,setHeadingArray] = useState<string[]>([])
  useEffect(()=>{
      if(featureSection.heading){
          setHeadingArray(featureSection.heading.split(" "))
      }
  },[featureSection.heading])
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 relative"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-left leading-tight">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {headingArray.slice(0, Math.ceil(headingArray.length / 2)).join(" ")}
        </span>{" "}
        <span>
          {headingArray.slice(Math.ceil(headingArray.length / 2)).join(" ")}
        </span>
      </h2>
      <p className="text-muted-foreground text-xl mt-4 mb-8 ">
        {featureSection.description}
      </p>

      <div className="flex flex-wrap md:justify-center gap-4 mb-4">
        {featureSection.featureList?.map((feature: any) => (
          <div key={feature.title}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature.title}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureSection.featuresWithDescription?.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>

            <CardContent>{feature.description}</CardContent>

            <CardFooter>
              <img
                src={feature.href}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;