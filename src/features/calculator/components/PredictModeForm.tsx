import SliderWithInput from "@/components/inputs/SliderWithInput";
import Select from "@/components/inputs/Select";
import type { ContributionFrequency } from "../types/calculator";

type PredictModeFormProps = {
  principal: number;
  recurringAmount: number;
  periodYears: number;
  annualRatePercent: number;
  frequency: ContributionFrequency;
  onChangePrincipal: (value: number) => void;
  onChangeRecurringAmount: (value: number) => void;
  onChangePeriodYears: (value: number) => void;
  onChangeAnnualRatePercent: (value: number) => void;
  onChangeFrequency: (value: ContributionFrequency) => void;
};

const PredictModeForm = ({
  principal,
  recurringAmount,
  periodYears,
  annualRatePercent,
  frequency,
  onChangePrincipal,
  onChangeRecurringAmount,
  onChangePeriodYears,
  onChangeAnnualRatePercent,
  onChangeFrequency,
}: PredictModeFormProps) => {
  return (
    <div className="space-y-4">
      <SliderWithInput
        id="predict-principal"
        label="시작금액(만원)"
        suffix="원"
        value={principal}
        min={0}
        max={1_000_000_000}
        step={100_000}
        onChangeValue={onChangePrincipal}
      />
      <SliderWithInput
        id="predict-recurring"
        label="적립금액(만원)"
        suffix="원"
        value={recurringAmount}
        min={0}
        max={10_000_000}
        step={50_000}
        onChangeValue={onChangeRecurringAmount}
      />
      <Select
        id="predict-frequency"
        label="적립주기"
        value={frequency}
        onChangeValue={onChangeFrequency}
      />
      <SliderWithInput
        id="predict-period"
        label="투자기간(년)"
        suffix="년"
        value={periodYears}
        min={1}
        max={50}
        step={1}
        onChangeValue={onChangePeriodYears}
      />
      <SliderWithInput
        id="predict-rate"
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

export default PredictModeForm;


