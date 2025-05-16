import { FeatureSectionProps } from "@repo/ts-types/landing-page/features";
import { useEffect, useId, useState } from "react";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 ">
        {featureSection.featuresWithDescription?.map((feature) => (
          <div
          key={feature.title}
          className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
        >
          <Grid size={20} />
          <div className="flex items-center gap-2 text-base font-bold text-neutral-800 dark:text-white">
            {feature.title}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                {feature.category}
            </span>
            </div>
          <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
            {feature.description}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
};

export const Grid = ({
    pattern,
    size,
  }: {
    pattern?: number[][];
    size?: number;
  }) => {
    const p = pattern ?? [
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
      <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
          <GridPattern
            width={size ?? 20}
            height={size ?? 20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
          />
        </div>
      </div>
    );
  };
   
  export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();
   
    return (
      <svg aria-hidden="true" {...props}>
        <defs>
          <pattern
            id={patternId}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path d={`M.5 ${height}V.5H${width}`} fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill={`url(#${patternId})`}
        />
        {squares && (
          <svg x={x} y={y} className="overflow-visible">
            {squares.map(([x, y]: any) => (
              <rect
                strokeWidth="0"
                key={`${x}-${y}`}
                width={width + 1}
                height={height + 1}
                x={x * width}
                y={y * height}
              />
            ))}
          </svg>
        )}
      </svg>
    );
  }
  
  

export default Features;