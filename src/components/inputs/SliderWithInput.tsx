import { formatKoreanCurrencyShort } from "@/lib/koreanNumberUtil";

type SliderWithInputProps = {
  id: string;
  label: string;
  suffix?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChangeValue: (value: number) => void;
};

const SliderWithInput = ({
  id,
  label,
  suffix,
  value,
  min,
  max,
  step,
  onChangeValue,
}: SliderWithInputProps) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (Number.isNaN(next)) {
      return;
    }
    onChangeValue(next);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value.replace(/,/g, ""));
    if (Number.isNaN(next)) {
      return;
    }
    if (next < min) {
      onChangeValue(min);
      return;
    }
    if (next > max) {
      onChangeValue(max);
      return;
    }
    onChangeValue(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      onChangeValue(Math.min(value + step, max));
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onChangeValue(Math.max(value - step, min));
    }
  };

  const getKoreanDisplay = (): string => {
    if (suffix === "원") {
      return formatKoreanCurrencyShort(value);
    } else if (suffix === "년") {
      return `${value}년`;
    } else if (suffix === "%") {
      return `${value}%`;
    }
    return "";
  };

  const koreanDisplay = getKoreanDisplay();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-900 sm:text-sm">
        <label htmlFor={id}>{label}</label>
        {koreanDisplay && (
          <span className="text-[11px] font-medium text-emerald-600 sm:text-xs">{koreanDisplay}</span>
        )}
      </div>
      <input
        id={`${id}-range`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500"
        aria-label={label}
      />
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={Number.isNaN(value) ? "" : value.toLocaleString("ko-KR")}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-right text-sm text-slate-900 shadow-inner shadow-slate-200/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      />
    </div>
  );
};

export default SliderWithInput;


