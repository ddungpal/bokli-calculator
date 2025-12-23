import BigNumberDisplay from "@/components/display/BigNumberDisplay";
import AssetGrowthChart from "@/components/charts/AssetGrowthChart";
import type { GoalResult, PredictResult } from "../types/calculator";

type ResultSectionProps = {
  mode: "predict" | "goal";
  predictResult: PredictResult;
  goalResult: GoalResult;
};

const ResultSection = ({ mode, predictResult, goalResult }: ResultSectionProps) => {
  if (mode === "goal") {
    return (
      <div className="flex h-full flex-col gap-4">
        <BigNumberDisplay
          mode="goal"
          years={goalResult.years ?? 0}
          months={goalResult.months ?? 0}
          finalAmount={goalResult.finalAmount}
          totalPrincipal={goalResult.totalPrincipal}
          interestGained={goalResult.interestGained}
          reached={goalResult.reached}
        />
        <AssetGrowthChart data={goalResult.timeline} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <BigNumberDisplay
        mode="predict"
        years={predictResult.timeline[predictResult.timeline.length - 1]?.year ?? 0}
        months={0}
        finalAmount={predictResult.finalAmount}
        totalPrincipal={predictResult.totalPrincipal}
        interestGained={predictResult.interestGained}
        reached
      />
      <AssetGrowthChart data={predictResult.timeline} />
    </div>
  );
};

export default ResultSection;


