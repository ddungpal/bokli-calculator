import type { PredictModeInput, PredictResult } from "../types/calculation";
import { calculatePredictMode } from "@/features/calculator/utils/compoundInterest";

export const compoundCalculator = (input: PredictModeInput): PredictResult => {
  return calculatePredictMode(input);
};


