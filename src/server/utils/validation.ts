import type { GoalRequestBody, PredictRequestBody } from "../types/api";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export const validatePredictBody = (body: unknown): PredictRequestBody | null => {
  if (!body || typeof body !== "object") {
    return null;
  }

  const candidate = body as Partial<PredictRequestBody>;

  if (
    !isFiniteNumber(candidate.principal) ||
    !isFiniteNumber(candidate.recurringAmount) ||
    !isFiniteNumber(candidate.periodYears) ||
    !isFiniteNumber(candidate.annualRate) ||
    !candidate.frequency
  ) {
    return null;
  }

  if (candidate.principal < 0 || candidate.recurringAmount < 0 || candidate.periodYears <= 0) {
    return null;
  }

  if (candidate.annualRate < 0) {
    return null;
  }

  if (!["daily", "weekly", "monthly", "yearly"].includes(candidate.frequency)) {
    return null;
  }

  return candidate as PredictRequestBody;
};

export const validateGoalBody = (body: unknown): GoalRequestBody | null => {
  if (!body || typeof body !== "object") {
    return null;
  }

  const candidate = body as Partial<GoalRequestBody>;

  if (
    !isFiniteNumber(candidate.goalAmount) ||
    !isFiniteNumber(candidate.principal) ||
    !isFiniteNumber(candidate.recurringAmount) ||
    !isFiniteNumber(candidate.annualRate) ||
    !candidate.frequency
  ) {
    return null;
  }

  if (candidate.goalAmount <= 0 || candidate.principal < 0 || candidate.recurringAmount < 0) {
    return null;
  }

  if (candidate.annualRate < 0) {
    return null;
  }

  // maxYears는 선택적이므로, 제공된 경우에만 검증
  if (candidate.maxYears !== undefined && (!isFiniteNumber(candidate.maxYears) || candidate.maxYears <= 0)) {
    return null;
  }

  if (!["daily", "weekly", "monthly", "yearly"].includes(candidate.frequency)) {
    return null;
  }

  return candidate as GoalRequestBody;
};


