import { formatKoreanCurrencyWithNumber } from "@/lib/koreanNumberUtil";

type Mode = "predict" | "goal";

type BigNumberDisplayProps = {
  mode: Mode;
  years: number;
  months?: number | null;
  finalAmount: number;
  totalPrincipal: number;
  interestGained: number;
  reached?: boolean;
};

const BigNumberDisplay = ({
  mode,
  years,
  months,
  finalAmount,
  totalPrincipal,
  interestGained,
  reached,
}: BigNumberDisplayProps) => {
  const formattedFinal = formatKoreanCurrencyWithNumber(finalAmount);
  const formattedPrincipal = formatKoreanCurrencyWithNumber(totalPrincipal);
  const formattedInterest = formatKoreanCurrencyWithNumber(interestGained);
  
  const totalReturnRate = totalPrincipal > 0 
    ? ((interestGained / totalPrincipal) * 100).toFixed(2)
    : "0.00";

  const durationText =
    typeof years === "number" && years > 0
      ? `${years}년${months && months > 0 ? ` ${months}개월` : ""}`
      : "지금부터";

  if (mode === "goal") {
    if (!reached) {
      return (
        <div className="space-y-2 rounded-xl bg-white border border-rose-200 p-4">
          <p className="text-xs font-medium text-rose-600 sm:text-sm">
            설정하신 조건으로는 목표 금액에 도달하기 어렵습니다.
          </p>
          <p className="text-sm text-slate-700 sm:text-base">
            적립금이나 기간, 수익률을 조금만 조정해 보시면, 충분히 현실적인 시나리오를 만들 수 있어요.
          </p>
        </div>
      );
    }

    // 억원 단위로 변환
    const formatEokWon = (amount: number): string => {
      const eok = amount / 100000000;
      return `${eok.toFixed(2)}억원`;
    };

    return (
      <div className="rounded-xl bg-white border border-slate-200 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-slate-600">총투자결과</p>
            <p className="text-lg font-bold text-emerald-600">{formatEokWon(finalAmount)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-600">총투자금액</p>
            <p className="text-lg font-bold text-slate-900">{formatEokWon(totalPrincipal)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-600">총수익률</p>
            <p className="text-lg font-bold text-slate-900">{totalReturnRate}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-600">총이자수익</p>
            <p className="text-lg font-bold text-slate-900">{formatEokWon(interestGained)}</p>
          </div>
        </div>
      </div>
    );
  }

  // 억원 단위로 변환
  const formatEokWon = (amount: number): string => {
    const eok = amount / 100000000;
    return `${eok.toFixed(2)}억원`;
  };

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-slate-600">총투자결과</p>
          <p className="text-lg font-bold text-emerald-600">{formatEokWon(finalAmount)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">총투자금액</p>
          <p className="text-lg font-bold text-slate-900">{formatEokWon(totalPrincipal)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">총수익률</p>
          <p className="text-lg font-bold text-slate-900">{totalReturnRate}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">총이자수익</p>
          <p className="text-lg font-bold text-slate-900">{formatEokWon(interestGained)}</p>
        </div>
      </div>
    </div>
  );
};

export default BigNumberDisplay;


