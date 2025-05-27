"use client";

import React, { useEffect } from "react";
import { Progress } from "@repo/ui/atoms/shadcn/progress";
import { CreditsProps } from "@repo/ts-types/home/v1";
import { Loader2Icon } from "lucide-react";

const ProgressWithCredits = ({ creditsUsed, creditsTotal }: CreditsProps) => {

  useEffect(() => {
  }, [creditsUsed, creditsTotal]);

  if (creditsUsed === undefined || creditsTotal === undefined || creditsTotal === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-description">Credits Used</div>
          <div className="text-description">
            <Loader2Icon className="h-4 w-4 animate-spin stroke-primary" />
          </div>
        </div>
        <Progress value={0} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-description">Credits Used</div>
        <div className="text-description">{`${creditsUsed}/${creditsTotal}`}</div>
      </div>
      <Progress value={(creditsUsed * 100) / creditsTotal} />
    </div>
  );
};

export default ProgressWithCredits;
