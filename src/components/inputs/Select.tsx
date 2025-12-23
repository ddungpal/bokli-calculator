import type { ContributionFrequency } from "@/features/calculator/types/calculator";

type SelectProps = {
  id: string;
  label: string;
  value: ContributionFrequency;
  onChangeValue: (value: ContributionFrequency) => void;
};

const Select = ({ id, label, value, onChangeValue }: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue(event.target.value as ContributionFrequency);
  };

  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-1 text-xs text-slate-900 sm:text-sm"
    >
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label={label}
      >
        <option value="daily">매일</option>
        <option value="weekly">매주</option>
        <option value="monthly">매월</option>
        <option value="yearly">매년</option>
      </select>
    </label>
  );
};

export default Select;


