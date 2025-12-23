type CalculatorTab = "predict" | "goal";

type TabsProps = {
  activeTab: CalculatorTab;
  onChangeTab: (tab: CalculatorTab) => void;
};

const Tabs = ({ activeTab, onChangeTab }: TabsProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, tab: CalculatorTab) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChangeTab(tab);
    }
  };

  const baseTabClass =
    "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

  const activeClass = "bg-white text-slate-900 shadow-sm";
  const inactiveClass = "bg-slate-100 text-slate-600 hover:bg-slate-200";

  return (
    <div
      className="mb-6 flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 text-xs sm:text-sm"
      role="tablist"
      aria-label="복리 계산 모드 선택"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "predict"}
        aria-label="자산 예측 모드"
        tabIndex={0}
        onClick={() => onChangeTab("predict")}
        onKeyDown={(event) => handleKeyDown(event, "predict")}
        className={`${baseTabClass} ${activeTab === "predict" ? activeClass : inactiveClass}`}
      >
        이대로 가면 얼마가 될까
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "goal"}
        aria-label="목표 달성 모드"
        tabIndex={0}
        onClick={() => onChangeTab("goal")}
        onKeyDown={(event) => handleKeyDown(event, "goal")}
        className={`${baseTabClass} ${activeTab === "goal" ? activeClass : inactiveClass}`}
      >
        목표 금액까지 얼마나 걸릴까
      </button>
    </div>
  );
};

export type { CalculatorTab };
export default Tabs;


