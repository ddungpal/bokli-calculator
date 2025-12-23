## Project-Overview (프로젝트 개요)

- **프로젝트 목적**
  - 한국 사용자 정서에 맞는 **복리 계산기 웹 앱**을 구현한다.
  - 사용자가 원금, 주기적 적립금, 수익률, 기간 등을 직관적으로 조작하며 **미래 자산 가치**를 시각적으로 이해할 수 있게 한다.
  - **자산 예측 모드 / 목표 달성 모드** 두 가지 모드로, “이대로 가면 얼마가 될까?”와 “언제 목표 금액에 도달할까?” 두 질문에 답을 준다.

- **프론트엔드 방향성**
  - **Next.js(App Router) + TypeScript + Tailwind CSS + Recharts** 조합을 사용한다.
  - 토스 / 뱅크샐러드와 같은 **깔끔한 금융 서비스 UI**를 목표로 한다.
  - **숫자 가독성(만/억 단위 표기), 실시간 인터랙션, 반응형 레이아웃**을 최우선 UX 기준으로 삼는다.
  - 추후 기능 확장(예: 세금, 인플레이션, 시나리오 비교 등)을 고려해 **기능(Feature) 단위 폴더 구조**로 설계한다.

- **핵심 UX 원칙**
  - **한 화면 내에서 요약**: 모바일에서도 입력(슬라이더+숫자)와 결과(Big Number + 차트)가 한 눈에 들어오도록 구성한다.
  - **즉각적인 피드백**: 슬라이더/입력값 변경 시, 결과 수치와 차트가 지연 없이 업데이트된다.
  - **한국식 금액 표현**: 큰 숫자는 100만 원, 1억 2천만 원 등으로 자연스럽게 읽히도록 한글 단위를 병기한다.
  - **초보자 친화 Copywriting**: “지금처럼만 투자하면”, “몇 년 뒤 내 자산은” 등의 문구로 재테크 입문자에게 직관적 이해를 돕는다.

---

## feature-requirements (기능 요구사항)

### 1. 계산 모드 & 상단 레이아웃

- **모드 탭**
  - 탭: **자산 예측 / 목표 달성**
  - 탭 전환 시, 입력 폼과 결과 영역이 해당 모드에 맞게 전환되며, URL 쿼리 또는 상태로 모드를 관리할지 결정 (초기에는 상태만 사용).
  - 선택된 탭은 시각적으로 명확히 구분(굵기, 색, 배경)하여 사용자가 현재 모드를 헷갈리지 않도록 한다.

- **상단 헤더**
  - 서비스 로고/텍스트(예: “복리 시뮬레이터”) + 간단한 서브 카피.
  - 다크모드는 1차 버전에서는 필수가 아니지만, Tailwind 기반으로 쉽게 확장 가능하도록 색상 토큰 구성.

### 2. 입력 영역 (Middle - Input)

- **공통 요소**
  - 모든 숫자 입력은 **슬라이더 + 숫자 인풋 박스** 세트로 구성.
  - 슬라이더 조작 시 인풋 값 동기화, 인풋 직접 입력 시 슬라이더 값 동기화.
  - 값 변경 시 `debounce`를 걸어 차트 리렌더링 부담을 줄이되, 체감 상 “즉각적”이라고 느끼는 수준(150~250ms)으로 설정.
  - 단위/설명을 라벨 옆이나 하단에 배치: “원”, “년”, “% (연 수익률)” 등을 명시.

- **자산 예측 모드 입력 항목**
  - 원금
  - 적립금 (주기 선택)
  - 기간(년 단위, 필요 시 월 단위까지 확장 고려)
  - 연 수익률(%)

- **목표 달성 모드 입력 항목**
  - 목표 금액
  - 원금
  - 적립금 (주기 선택)
  - 연 수익률(%)

- **적립 주기 드롭다운**
  - 옵션: 매일 / 매주 / 매월 / 매년
  - 선택에 따라 내부 계산 로직에서 `n` 및 `PMT` 주기가 달라지도록 연동.

### 3. 출력 영역 (Bottom - Output)

- **Big Number 영역**
  - 자산 예측 모드:
    - 예: “**25년 뒤 당신의 자산은 10억 5천만 원입니다.**”
    - 원금 / 총 적립금 / 복리로 인한 수익을 서브 텍스트로 요약 제공.
  - 목표 달성 모드:
    - 예: “**연 X% 수익률 기준, 약 18년 후 10억 원에 도달합니다.**”
    - 달성 시점의 총 투자액(원금+적립금)을 함께 표시.

- **차트 영역**
  - 시간 축(년/월)에 따른 **자산 성장 곡선**을 시각화.
  - 원금+적립금 누적 vs 수익(이자) 부분을 시각적으로 구분(예: 누적 투자액은 막대, 수익은 라인 또는 stack 영역).
  - 호버 시 해당 시점의:
    - 총 자산
    - 누적 투자액
    - 수익액
    - 달성 여부(목표 모드일 경우)
    를 툴팁으로 제공.

### 4. 한국형 숫자 포맷 & 복리 계산

- **숫자 포맷**
  - 1,000,000 → “**100만 원 (1,000,000원)**” 형태로 병기.
  - 억 단위 이상은 “X억 Y천만 원” 형태를 우선 제공하고, 숫자 그대로도 함께 표기.

- **복리 계산**
  - PRD의 공식 사용:
    - \\( A = P(1 + r/n)^{nt} + PMT \times \frac{(1 + r/n)^{nt} - 1}{r/n} \\)
  - 프론트에서는 **입력 검증 및 로직 래핑**만 담당하고, 실제 수식 계산은 `utils/compoundInterest.ts`에서 수행.
  - 목표 달성 모드는 반복 계산(while 루프 또는 이분 탐색 등)으로 목표 금액에 도달하는 시점을 찾아낸다.

### 5. 반응형 & 접근성

- **반응형**
  - 모바일 우선 레이아웃:
    - 상단: 타이틀 + 탭
    - 중단: 입력 폼(아코디언/섹션 구분으로 스크롤 최소화)
    - 하단: 결과 요약 + 차트 (차트는 세로 공간을 적당히 줄이고, 스크롤 시 고정 가능한 옵션 추후 고려)
  - 데스크톱:
    - 좌: 입력(폼)
    - 우: 결과(Big Number + 차트) 2열 레이아웃 구성.

- **접근성**
  - 색 대비(Contrast) 준수, 키보드로 입력/탭 전환 가능.
  - 슬라이더는 숫자 입력과 항상 쌍으로 존재하여, 정밀한 값 조정이 가능하도록 한다.

---

## relevant-codes (관련 코드)

> 이 섹션은 실제 구현을 진행하면서, **핵심 컴포넌트/훅/유틸의 경로와 역할**을 정리하는 용도로 사용한다.

- **페이지 & 레이아웃**
  - `src/app/layout.tsx`  
    - 글로벌 레이아웃, 폰트, 메타태그, Tailwind 초기화.
  - `src/app/page.tsx`  
    - 메인 복리 계산기 화면, 모드 탭 + 입력 섹션 + 결과 섹션을 조합.

- **도메인 기능 (Calculator Feature)**
  - `src/features/calculator/components/PredictModeForm.tsx`
  - `src/features/calculator/components/GoalModeForm.tsx`
  - `src/features/calculator/components/ResultSection.tsx`
  - `src/features/calculator/hooks/usePredictModeCalculator.ts`
  - `src/features/calculator/hooks/useGoalModeCalculator.ts`
  - `src/features/calculator/utils/compoundInterest.ts`
  - `src/features/calculator/utils/formatKoreanCurrency.ts`
  - `src/features/calculator/utils/timeToGoal.ts`
  - `src/features/calculator/types/calculator.ts`

- **공통 컴포넌트**
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Container.tsx`
  - `src/components/inputs/SliderWithInput.tsx`
  - `src/components/inputs/NumberInputWithLabel.tsx`
  - `src/components/inputs/Select.tsx`
  - `src/components/display/BigNumberDisplay.tsx`
  - `src/components/display/StatRow.tsx`
  - `src/components/charts/AssetGrowthChart.tsx`
  - `src/components/common/Tabs.tsx`
  - `src/components/common/Card.tsx`

- **공용 훅 & 유틸**
  - `src/hooks/useResponsiveLayout.ts`
  - `src/hooks/useDebouncedValue.ts`
  - `src/lib/chartConfig.ts`
  - `src/lib/constants.ts`
  - `src/lib/koreanNumberUtil.ts`

---

## Current-file-instruction (현재 파일 구조)

> 실제 코드베이스의 구조와, 이 문서에서 사용하는 섹션의 역할을 설명한다.  
> 코드 구조는 `require/prd.md`의 7. 파일 구조 섹션을 기준으로 한다.

- **이 문서의 역할**
  - 프론트엔드 개발을 위한 **작업 계획 & 기준 문서**.
  - 기능 요구사항(UX 관점)과 실제 구현 단위를 연결해 주는 “브리지” 역할.
  - 구현 진행 상황에 따라 **TODO, 개선 아이디어, 리팩터링 포인트** 등을 추가로 기록한다.

- **연결되는 PRD 섹션**
  - `1. Project Overview` → 이 문서의 `Project-Overview`
  - `3. Core Functionalities` → 이 문서의 `feature-requirements`
  - `4. Tech Stack & Tools` → 이 문서의 기술 선택 근거
  - `5. UI/UX Design Requirements` → 레이아웃 및 상호작용 설계 기준
  - `7. 파일 구조` → 이 문서의 `relevant-codes` 및 실제 폴더 구조와 매핑

---

## rules (규칙)

> 프론트엔드 구현 시 항상 지켜야 할 공통 규칙과 품질 기준을 정의한다.

- **UX / UI 규칙**
  - **숫자 입력은 모두 슬라이더 + 인풋 세트**로 제공한다.
  - 중요한 금액/기간 결과는 항상 **한글 단위**와 **숫자 그대로**를 함께 표기한다.
  - 결과 문구는 사용자가 “어느 정도 감이 오는지”에 집중하여, 가능한 한 **자연어 문장**으로 표현한다.

- **코드 구조 규칙**
  - 비즈니스 로직(복리 계산, 목표 도달 시점 계산)은 **컴포넌트 밖 유틸 함수**로 분리한다.
  - 모드별 상태/계산 로직은 `hooks`에서 관리하고, 컴포넌트는 **표현(UI)과 이벤트 바인딩**에 집중한다.
  - 공통으로 재사용 가능한 UI는 반드시 `src/components` 하위로 분리하여, `features`에서 직접 구현하지 않는다.

- **스타일 & 컴포넌트 규칙**
  - Tailwind 클래스는 가능한 한 **일관된 디자인 토큰(색상, 간격, 폰트 크기)**에 맞춰 사용한다.
  - 임시 스타일이 필요하면, 추후 정리할 수 있도록 주석 또는 TODO를 남긴다.

- **작업 프로세스**
  - 1차: `Project-Overview`, `feature-requirements` 기준으로 **핵심 플로우(입력 → 결과)**를 먼저 완성한다.
  - 2차: 숫자 포맷, 차트 디테일, 애니메이션 등 **UX 디테일 보강**.
  - 3차: 코드 구조 정리, 타입 보강, 공통 컴포넌트 추출 등 **리팩터링 단계**를 거친다.
  - 변경 또는 개선이 있을 때마다 이 문서의 각 섹션에 **간단한 메모/업데이트**를 반영한다.
