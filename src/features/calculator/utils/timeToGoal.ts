import type { ContributionFrequency, GoalModeInput, GoalResult } from "../types/calculator";
import { calculatePredictMode } from "./compoundInterest";

const getCompoundingPerYear = (frequency: ContributionFrequency): number => {
  if (frequency === "daily") return 365;
  if (frequency === "weekly") return 52;
  if (frequency === "monthly") return 12;
  return 1;
};

export const calculateGoalMode = (input: GoalModeInput): GoalResult => {
  const { goalAmount, principal, recurringAmount, annualRate, frequency, maxYears = 100 } = input;

  if (goalAmount <= 0 || annualRate < 0 || maxYears <= 0) {
    return {
      reached: false,
      years: null,
      months: null,
      finalAmount: principal,
      totalPrincipal: principal,
      interestGained: 0,
      timeline: [
        {
          year: 0,
          total: principal,
          principal,
          interest: 0,
        },
      ],
    };
  }

  const n = getCompoundingPerYear(frequency);
  const stepYears = 0.25;

  let bestResult: GoalResult | null = null;

  for (let year = 0; year <= maxYears; year += stepYears) {
    const predictResult = calculatePredictMode({
      principal,
      recurringAmount,
      periodYears: year,
      annualRate,
      frequency,
    });

    const reached = predictResult.finalAmount >= goalAmount;

    if (!bestResult || predictResult.finalAmount >= bestResult.finalAmount) {
      bestResult = {
        reached,
        years: reached ? Math.floor(year) : null,
        months: reached ? Math.round((year - Math.floor(year)) * 12) : null,
        finalAmount: predictResult.finalAmount,
        totalPrincipal: predictResult.totalPrincipal,
        interestGained: predictResult.interestGained,
        timeline: predictResult.timeline,
      };
    }

    if (reached) {
      return bestResult;
    }
  }

  if (bestResult) {
    return bestResult;
  }

  return {
    reached: false,
    years: null,
    months: null,
    finalAmount: principal,
    totalPrincipal: principal,
    interestGained: 0,
    timeline: [
      {
        year: 0,
        total: principal,
        principal,
        interest: 0,
      },
    ],
  };
};


