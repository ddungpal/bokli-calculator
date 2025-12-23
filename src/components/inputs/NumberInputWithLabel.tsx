type NumberInputWithLabelProps = {
  id: string;
  label: string;
  suffix?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChangeValue: (value: number) => void;
};

const NumberInputWithLabel = ({
  id,
  label,
  suffix,
  value,
  min,
  max,
  step,
  onChangeValue,
}: NumberInputWithLabelProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value.replace(/,/g, ""));
    if (Number.isNaN(next)) {
      return;
    }
    if (typeof min === "number" && next < min) {
      onChangeValue(min);
      return;
    }
    if (typeof max === "number" && next > max) {
      onChangeValue(max);
      return;
    }
    onChangeValue(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" && typeof step === "number") {
      event.preventDefault();
      onChangeValue(value + step);
    }
    if (event.key === "ArrowDown" && typeof step === "number") {
      event.preventDefault();
      onChangeValue(value - step);
    }
  };

  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-xs text-slate-900 sm:text-sm">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        {suffix && <span className="text-[11px] text-slate-600 sm:text-xs">{suffix}</span>}
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-right text-sm text-slate-900 shadow-inner shadow-slate-200/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        value={Number.isNaN(value) ? "" : value.toLocaleString("ko-KR")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={label}
      />
    </label>
  );
};

export default NumberInputWithLabel;


