const UNITS = [
  { value: 100000000, label: "억" },
  { value: 10000, label: "만" },
];

export const formatKoreanCurrency = (amount: number): string => {
  if (!Number.isFinite(amount)) {
    return "- 원";
  }

  const absolute = Math.floor(Math.abs(amount));
  if (absolute === 0) {
    return "0원";
  }

  let remaining = absolute;
  const parts: string[] = [];

  for (const unit of UNITS) {
    if (remaining >= unit.value) {
      const count = Math.floor(remaining / unit.value);
      remaining -= count * unit.value;
      if (count > 0) {
        parts.push(`${count.toLocaleString("ko-KR")}${unit.label}`);
      }
    }
  }

  if (remaining > 0) {
    parts.push(`${remaining.toLocaleString("ko-KR")}원`);
  } else {
    parts.push("원");
  }

  const sign = amount < 0 ? "-" : "";
  return `${sign}${parts.join(" ")}`;
};

export const formatKoreanCurrencyWithNumber = (amount: number): { korean: string; number: string } => {
  if (!Number.isFinite(amount)) {
    return { korean: "- 원", number: "-" };
  }

  const absolute = Math.floor(Math.abs(amount));
  if (absolute === 0) {
    return { korean: "0원", number: "0원" };
  }

  let remaining = absolute;
  const parts: string[] = [];

  for (const unit of UNITS) {
    if (remaining >= unit.value) {
      const count = Math.floor(remaining / unit.value);
      remaining -= count * unit.value;
      if (count > 0) {
        parts.push(`${count.toLocaleString("ko-KR")}${unit.label}`);
      }
    }
  }

  if (remaining > 0) {
    parts.push(`${remaining.toLocaleString("ko-KR")}원`);
  } else {
    parts.push("원");
  }

  const sign = amount < 0 ? "-" : "";
  return {
    korean: `${sign}${parts.join(" ")}`,
    number: `${sign}${absolute.toLocaleString("ko-KR")}원`,
  };
};

export const formatKoreanCurrencyShort = (amount: number): string => {
  if (!Number.isFinite(amount)) {
    return "-원";
  }

  const absolute = Math.floor(Math.abs(amount));
  if (absolute === 0) {
    return "0원";
  }

  // 만원 단위로 표시
  if (absolute >= 10000) {
    const man = Math.floor(absolute / 10000);
    const remainder = absolute % 10000;
    if (remainder === 0) {
      return `${man.toLocaleString("ko-KR")}만원`;
    }
    return `${man.toLocaleString("ko-KR")}만${remainder.toLocaleString("ko-KR")}원`;
  }

  return `${absolute.toLocaleString("ko-KR")}원`;
};


