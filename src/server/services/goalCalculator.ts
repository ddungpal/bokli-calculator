import type { GoalModeInput, GoalResult } from "../types/calculation";
import { calculateGoalMode } from "@/features/calculator/utils/timeToGoal";

export const goalCalculator = (input: GoalModeInput): GoalResult => {
  return calculateGoalMode(input);
};


