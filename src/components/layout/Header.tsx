import { Flame, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 ring-1 ring-amber-500/40">
          <Flame className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            복리 계산기
          </h1>
          <p className="text-xs text-slate-900 sm:text-sm font-medium">
            지금처럼만 모으면, 미래의 나는 얼마나 여유로울까?
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-[11px] text-slate-700 sm:inline-flex">
        <Sparkles className="mr-1 h-3 w-3 text-emerald-600" aria-hidden="true" />
        복리는 시간과 꾸준함의 보너스입니다.
      </div>
    </header>
  );
};

export default Header;


