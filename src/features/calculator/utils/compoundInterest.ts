import type {
  ContributionFrequency,
  PredictModeInput,
  PredictResult,
  TimelinePoint,
} from "../types/calculator";

const getCompoundingPerYear = (frequency: ContributionFrequency): number => {
  if (frequency === "daily") return 365;
  if (frequency === "weekly") return 52;
  if (frequency === "monthly") return 12;
  return 1;
};

const buildTimeline = (
  years: number,
  principal: number,
  recurringAmount: number,
  annualRate: number,
  frequency: ContributionFrequency,
): TimelinePoint[] => {
  const n = getCompoundingPerYear(frequency);
  const rPerN = annualRate / n;
  const totalPeriods = years * n;

  const timeline: TimelinePoint[] = [];

  for (let periodIndex = 0; periodIndex <= totalPeriods; periodIndex += n) {
    const t = periodIndex / n;
    const compoundFactor = (1 + rPerN) ** (n * t);
    const base = principal * compoundFactor;
    // 월초 적립 방식: 적립금이 해당 기간 전체에 대해 이자 발생
    const contributionPart =
      recurringAmount > 0 && rPerN > 0
        ? recurringAmount * ((compoundFactor - 1) / rPerN) * (1 + rPerN)
        : recurringAmount * n * t;

    const total = base + contributionPart;
    const contributedPrincipal = principal + recurringAmount * n * t;

    timeline.push({
      year: t,
      total,
      principal: contributedPrincipal,
      interest: total - contributedPrincipal,
    });
  }

  return timeline;
};

export const calculatePredictMode = (input: PredictModeInput): PredictResult => {
  const { principal, recurringAmount, periodYears, annualRate, frequency } = input;

  if (periodYears <= 0 || annualRate < 0) {
    return {
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
  const rPerN = annualRate / n;
  const totalPeriods = periodYears * n;

  const compoundFactor = (1 + rPerN) ** (totalPeriods);
  const base = principal * compoundFactor;

  // 월초 적립 방식: 적립금이 해당 기간 전체에 대해 이자 발생
  const contributionPart =
    recurringAmount > 0 && rPerN > 0
      ? recurringAmount * ((compoundFactor - 1) / rPerN) * (1 + rPerN)
      : recurringAmount * totalPeriods;

  const finalAmount = base + contributionPart;
  const totalPrincipal = principal + recurringAmount * totalPeriods;
  const interestGained = finalAmount - totalPrincipal;

  const timeline = buildTimeline(periodYears, principal, recurringAmount, annualRate, frequency);

  return {
    finalAmount,
    totalPrincipal,
    interestGained,
    timeline,
  };
};


