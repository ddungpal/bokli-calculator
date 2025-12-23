export type ContributionFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type PredictModeInput = {
  principal: number;
  recurringAmount: number;
  periodYears: number;
  annualRate: number;
  frequency: ContributionFrequency;
};

export type GoalModeInput = {
  goalAmount: number;
  principal: number;
  recurringAmount: number;
  annualRate: number;
  frequency: ContributionFrequency;
  maxYears?: number; // 선택적: 제공되지 않으면 기본값 100 사용
};

export type TimelinePoint = {
  year: number;
  total: number;
  principal: number;
  interest: number;
};

export type PredictResult = {
  finalAmount: number;
  totalPrincipal: number;
  interestGained: number;
  timeline: TimelinePoint[];
};

export type GoalResult = {
  reached: boolean;
  years: number | null;
  months: number | null;
  finalAmount: number;
  totalPrincipal: number;
  interestGained: number;
  timeline: TimelinePoint[];
};


