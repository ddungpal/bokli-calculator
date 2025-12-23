import SliderWithInput from "@/components/inputs/SliderWithInput";
import Select from "@/components/inputs/Select";
import type { ContributionFrequency } from "../types/calculator";

type GoalModeFormProps = {
  goalAmount: number;
  principal: number;
  recurringAmount: number;
  annualRatePercent: number;
  frequency: ContributionFrequency;
  onChangeGoalAmount: (value: number) => void;
  onChangePrincipal: (value: number) => void;
  onChangeRecurringAmount: (value: number) => void;
  onChangeAnnualRatePercent: (value: number) => void;
  onChangeFrequency: (value: ContributionFrequency) => void;
};

const GoalModeForm = ({
  goalAmount,
  principal,
  recurringAmount,
  annualRatePercent,
  frequency,
  onChangeGoalAmount,
  onChangePrincipal,
  onChangeRecurringAmount,
  onChangeAnnualRatePercent,
  onChangeFrequency,
}: GoalModeFormProps) => {
  return (
    <div className="space-y-4">
      <SliderWithInput
        id="goal-amount"
        label="목표금액(만원)"
        suffix="원"
        value={goalAmount}
        min={1_000_000}
        max={10_000_000_000}
        step={1_000_000}
        onChangeValue={onChangeGoalAmount}
      />
      <SliderWithInput
        id="goal-principal"
        label="시작금액(만원)"
        suffix="원"
        value={principal}
        min={0}
        max={1_000_000_000}
        step={100_000}
        onChangeValue={onChangePrincipal}
      />
      <SliderWithInput
        id="goal-recurring"
        label="적립금액(만원)"
        suffix="원"
        value={recurringAmount}
        min={0}
        max={10_000_000}
        step={50_000}
        onChangeValue={onChangeRecurringAmount}
      />
      <Select
        id="goal-frequency"
        label="적립주기"
        value={frequency}
        onChangeValue={onChangeFrequency}
      />
      <SliderWithInput
        id="goal-rate"
        label="연간 이자율(년)"
        suffix="%"
        value={annualRatePercent}
        min={0}
        max={30}
        step={0.1}
        onChangeValue={onChangeAnnualRatePercent}
      />
    </div>
  );
};

export default GoalModeForm;


