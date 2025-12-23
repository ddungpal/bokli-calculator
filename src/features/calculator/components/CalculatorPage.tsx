"use client";

import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Card from "@/components/common/Card";
import Tabs, { type CalculatorTab } from "@/components/common/Tabs";
import PredictModeForm from "./PredictModeForm";
import GoalModeForm from "./GoalModeForm";
import ResultSection from "./ResultSection";
import { useState } from "react";
import type { GoalResult, PredictResult } from "../types/calculator";
import { calculatePredictMode } from "../utils/compoundInterest";
import { calculateGoalMode } from "../utils/timeToGoal";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const CalculatorPage = () => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("predict");

  const [predictPrincipal, setPredictPrincipal] = useState<number>(10_000_000);
  const [predictRecurring, setPredictRecurring] = useState<number>(500_000);
  const [predictPeriodYears, setPredictPeriodYears] = useState<number>(25);
  const [predictAnnualRatePercent, setPredictAnnualRatePercent] = useState<number>(7);
  const [predictFrequency, setPredictFrequency] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "monthly",
  );

  const [goalAmount, setGoalAmount] = useState<number>(1_000_000_000);
  const [goalPrincipal, setGoalPrincipal] = useState<number>(20_000_000);
  const [goalRecurring, setGoalRecurring] = useState<number>(1_000_000);
  const [goalAnnualRatePercent, setGoalAnnualRatePercent] = useState<number>(7);
  const [goalFrequency, setGoalFrequency] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "monthly",
  );

  const debouncedPredictPrincipal = useDebouncedValue(predictPrincipal, 200);
  const debouncedPredictRecurring = useDebouncedValue(predictRecurring, 200);
  const debouncedPredictPeriodYears = useDebouncedValue(predictPeriodYears, 200);
  const debouncedPredictAnnualRatePercent = useDebouncedValue(predictAnnualRatePercent, 200);
  const debouncedPredictFrequency = useDebouncedValue(predictFrequency, 200);

  const debouncedGoalAmount = useDebouncedValue(goalAmount, 200);
  const debouncedGoalPrincipal = useDebouncedValue(goalPrincipal, 200);
  const debouncedGoalRecurring = useDebouncedValue(goalRecurring, 200);
  const debouncedGoalAnnualRatePercent = useDebouncedValue(goalAnnualRatePercent, 200);
  const debouncedGoalFrequency = useDebouncedValue(goalFrequency, 200);

  const predictResult: PredictResult = calculatePredictMode({
    principal: debouncedPredictPrincipal,
    recurringAmount: debouncedPredictRecurring,
    periodYears: debouncedPredictPeriodYears,
    annualRate: debouncedPredictAnnualRatePercent / 100,
    frequency: debouncedPredictFrequency,
  });

  const goalResult: GoalResult = calculateGoalMode({
    goalAmount: debouncedGoalAmount,
    principal: debouncedGoalPrincipal,
    recurringAmount: debouncedGoalRecurring,
    annualRate: debouncedGoalAnnualRatePercent / 100,
    frequency: debouncedGoalFrequency,
    maxYears: 100, // 기본값으로 충분히 큰 값 설정
  });

  const handleChangeTab = (tab: CalculatorTab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Header />
      <Tabs activeTab={activeTab} onChangeTab={handleChangeTab} />
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        <Card
          title="투자 목표"
          description={
            activeTab === "predict"
              ? "원금, 적립금, 기간, 수익률을 바꿔 보면서 미래의 자산을 직관적으로 확인해 보세요."
              : "달성하고 싶은 목표 금액을 정하고, 지금부터 얼마씩 투자할지 시뮬레이션합니다."
          }
        >
          {activeTab === "predict" ? (
            <PredictModeForm
              principal={predictPrincipal}
              recurringAmount={predictRecurring}
              periodYears={predictPeriodYears}
              annualRatePercent={predictAnnualRatePercent}
              frequency={predictFrequency}
              onChangePrincipal={setPredictPrincipal}
              onChangeRecurringAmount={setPredictRecurring}
              onChangePeriodYears={setPredictPeriodYears}
              onChangeAnnualRatePercent={setPredictAnnualRatePercent}
              onChangeFrequency={setPredictFrequency}
            />
          ) : (
            <GoalModeForm
              goalAmount={goalAmount}
              principal={goalPrincipal}
              recurringAmount={goalRecurring}
              annualRatePercent={goalAnnualRatePercent}
              frequency={goalFrequency}
              onChangeGoalAmount={setGoalAmount}
              onChangePrincipal={setGoalPrincipal}
              onChangeRecurringAmount={setGoalRecurring}
              onChangeAnnualRatePercent={setGoalAnnualRatePercent}
              onChangeFrequency={setGoalFrequency}
            />
          )}
        </Card>
        <Card
          title="투자 결과"
          description="복리의 힘으로 시간이 지날수록 어떻게 자산이 쌓여 가는지, 한눈에 확인해 보세요."
        >
          <ResultSection mode={activeTab} predictResult={predictResult} goalResult={goalResult} />
        </Card>
      </div>
    </Container>
  );
};

export default CalculatorPage;


