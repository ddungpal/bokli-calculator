import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimelinePoint } from "@/features/calculator/types/calculator";
import { formatKoreanCurrency } from "@/lib/koreanNumberUtil";

type AssetGrowthChartProps = {
  data: TimelinePoint[];
};

const AssetGrowthChart = ({ data }: AssetGrowthChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-600 sm:h-64 sm:text-sm">
        조건을 입력하면, 시간이 지나며 자산이 어떻게 쌓이는지 곡선으로 보여드릴게요.
      </div>
    );
  }

  const chartData = data.map((point) => ({
    ...point,
    label: `${Math.round(point.year)}년`,
  }));

  return (
    <div className="h-56 rounded-xl border border-slate-200 bg-white px-2 py-2 sm:h-64 sm:px-4 sm:py-3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="totalValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="principalValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "#475569" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "#475569" }}
            tickFormatter={(value) => {
              const numValue = Math.round(Number(value));
              if (numValue >= 100000000) {
                return `${Math.round(numValue / 100000000)}억`;
              }
              return `${Math.round(numValue / 10000).toLocaleString("ko-KR")}만`;
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              padding: 12,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#1e293b", fontSize: 12, fontWeight: 600 }}
            labelFormatter={(label) => label}
            formatter={(value: number | string, name: string) => {
              // value가 문자열일 수 있으므로 숫자로 변환
              let numValue: number;
              if (typeof value === "string") {
                numValue = parseFloat(value.replace(/,/g, "")) || 0;
              } else {
                numValue = value || 0;
              }
              
              // 소수점 제거 및 반올림
              const roundedValue = Math.round(numValue);
              
              // 콤마로 포맷팅
              const formatted = roundedValue.toLocaleString("ko-KR");
              
              return [`${formatted}원`, name];
            }}
          />
          <Area
            type="monotone"
            dataKey="principal"
            stroke="#38bdf8"
            strokeWidth={2}
            fill="url(#principalValue)"
            name="누적 투자액"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#totalValue)"
            name="예상 자산"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetGrowthChart;


