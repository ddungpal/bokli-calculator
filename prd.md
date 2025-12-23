## [PRD] 한국형 사용자 친화적 복리계산기 – 실행 체크리스트 & 파일 구조

---

## 1. 실행 체크리스트 (End-to-End)

### 1.1 기획·설정 단계

- [x] **요구사항 정리 재확인**
  - [x] `require/prd.md`의 Project Overview, Core Functionalities, UI/UX 요구사항 최종 확정
  - [x] 타겟 사용자(재테크 입문자, FIRE 지향 사용자) 페르소나 정리
- [x] **기술 스택 확정**
  - [x] Frontend: Next.js(App Router) + TypeScript + Tailwind CSS + Recharts
  - [x] Server: Next.js API Route + Netlify Functions(서버리스, 무상태 구조)
  - [x] Infra: Netlify (GitHub 연동 자동 배포)

### 1.2 초기 프로젝트 셋업

- [x] **Next.js + TypeScript 프로젝트 생성**
  - [x] `create-next-app` 또는 유사 템플릿으로 초기 세팅
  - [x] `tsconfig.json`, `next.config` 기본 옵션 확인
- [x] **Tailwind CSS 통합**
  - [x] `tailwind.config` 및 `postcss.config` 설정
  - [x] `src/app/globals.css`에 Tailwind base/style/components 연결
- [x] **차트/아이콘 라이브러리 설치**
  - [x] Recharts 또는 Chart.js 설치 및 테스트 페이지에서 렌더 테스트
  - [x] lucide-react 설치 및 기본 아이콘 렌더 테스트

### 1.3 프론트엔드 구현 체크리스트 (`require/frontend.md` 기반)

- [x] **레이아웃 & 기본 페이지**
  - [x] `src/app/layout.tsx`에 공통 레이아웃, 폰트, 메타데이터 정의
  - [x] `src/app/page.tsx`에 메인 복리 계산기 페이지 골격 구현
  - [x] 모바일/데스크톱 반응형 그리드 구조 (좌: 입력, 우: 결과) 설계

- [x] **상단 헤더 & 모드 탭**
  - [x] `Header` 컴포넌트: 서비스 타이틀, 서브 카피 표시
  - [x] `Tabs` 컴포넌트: 자산 예측 / 목표 달성 모드 전환 구현
  - [x] 탭 전환 시 상태 관리 (URL 쿼리 사용 여부 결정)

- [x] **입력 영역 구현**
  - [x] 공통 입력 컴포넌트 세트:
    - [x] `SliderWithInput` (슬라이더 + 숫자 입력 동기화)
    - [x] `NumberInputWithLabel`
    - [x] `Select` (적립 주기: 매일/매주/매월/매년)
  - [x] 자산 예측 모드 폼:
    - [x] 원금, 적립금, 기간, 수익률 입력 필드 구현
  - [x] 목표 달성 모드 폼:
    - [x] 목표 금액, 원금, 적립금, 수익률 입력 필드 구현
  - [x] 입력 변경 시 `debounce` 적용으로 차트 리렌더 최적화

- [x] **출력 영역 구현**
  - [x] `BigNumberDisplay` 컴포넌트:
    - [x] 자산 예측 모드 문구: “N년 뒤 당신의 자산은 …입니다.”
    - [x] 목표 달성 모드 문구: “연 X% 기준, 약 N년 후 …에 도달합니다.”
  - [x] 시계열 차트(`AssetGrowthChart`):
    - [x] 시간에 따른 총 자산, 누적 투자액, 수익액 시각화
    - [x] 툴팁에 해당 시점의 세부 값 표시

- [x] **한국형 숫자 포맷 & UX 디테일**
  - [x] `formatKoreanCurrency` 유틸 구현 (만/억 단위 병기)
  - [x] 중요 금액은 “한글 단위 + 원래 숫자”를 함께 표시
  - [x] 초보자 친화 문구(Copywriting) 적용

- [x] **반응형 & 접근성**
  - [x] 모바일/데스크톱 레이아웃 검증 (실기기/브라우저 DevTools)
  - [x] 키보드 포커스 이동, 탭 전환, 슬라이더 조작 등 A11y 확인
  - [x] 색상 대비 및 폰트 크기 점검 (밝은 배경에 어두운 텍스트 적용)

### 1.4 서버/서버리스 구현 체크리스트 (`require/server.md` 기반)

- [x] **계산 서비스 로직**
  - [x] `compoundCalculator` 구현:
    - [x] PRD 수식 \( A = P(1 + r/n)^{nt} + PMT \times \frac{(1 + r/n)^{nt} - 1}{r/n} \) 적용
    - [x] 적립 주기별(n: daily/weekly/monthly/yearly) 계산 분기
  - [x] `goalCalculator` 구현:
    - [x] 목표 금액 도달 시점(년/월) 계산 알고리즘 구현
    - [x] 상한 기간 초과 시 graceful 실패 처리

- [x] **API 라우트 (옵션)**
  - [x] `/api/calc/predict`:
    - [x] 요청 파라미터 검증 (음수/비정상 값 차단)
    - [x] 최종 금액, 누적 원금, 이자, 타임라인 응답
  - [x] `/api/calc/goal`:
    - [x] 목표 달성 가능 여부, 소요 기간, 타임라인 응답
  - [ ] (향후) `/api/events/usage`:
    - [ ] 최소한의 익명 사용 패턴 로깅

- [ ] **성능/확장성**
  - [x] API를 완전 무상태(stateless)로 설계
  - [ ] 서버리스 환경(Netlify Functions)에서 타임아웃/에러 처리 확인
  - [ ] 간단한 부하 테스트(동시 요청 시 지연 유무 확인)

### 1.5 품질·배포 체크리스트

- [x] **테스트**
  - [x] 주요 유틸(복리 계산, 목표 계산, 숫자 포맷) 구현 완료 및 수동 검증
  - [x] 주요 화면 플로우(입력 → 결과)에 대한 수동 E2E 체크 완료
- [x] **빌드 & 배포**
  - [x] `netlify.toml` 파일 생성 및 배포 설정 완료
  - [x] `DEPLOYMENT.md` 배포 가이드 문서 작성
  - [ ] `npm run build` 빌드 성공 여부 확인 (로컬 테스트 권장)
  - [ ] Netlify 연결 및 빌드/배포 설정 검증
  - [ ] 실제 배포 URL에서 모바일/데스크톱 UX 최종 점검

---

## 2. 파일 구조 설계 (최종안)

### 2.1 루트 디렉토리

- `/`
  - `package.json`
  - `tsconfig.json`
  - `next.config.mjs` 또는 `next.config.js`
  - `postcss.config.mjs`
  - `tailwind.config.ts`
  - `netlify.toml` (Netlify 배포 설정)
  - `README.md`
  - `public/` (파비콘, OG 이미지 등 정적 리소스)
  - `src/` (애플리케이션 소스)

### 2.2 src 디렉토리 구조

- `src/`
  - `app/`
    - `layout.tsx` : 공통 레이아웃, 메타데이터, 폰트 및 Tailwind 초기화
    - `page.tsx` : 메인 복리 계산기 페이지 (모드 탭 + 입력 + 결과)
    - `globals.css` : Tailwind base + 글로벌 스타일
    - `api/` (Next.js App Router API)
      - `calc/`
        - `predict/route.ts` : 자산 예측 계산 API
        - `goal/route.ts` : 목표 달성 계산 API
      - `events/`
        - `usage/route.ts` : 사용 패턴 로깅 API (향후)
  - `components/` : 재사용 가능한 UI 컴포넌트
    - `layout/`
      - `Header.tsx` : 서비스 타이틀, 탭 포함 상단바
      - `Container.tsx` : 반응형 레이아웃 래퍼
    - `inputs/`
      - `NumberInputWithLabel.tsx`
      - `SliderWithInput.tsx`
      - `Select.tsx`
    - `display/`
      - `BigNumberDisplay.tsx`
      - `StatRow.tsx`
    - `charts/`
      - `AssetGrowthChart.tsx`
    - `common/`
      - `Tabs.tsx`
      - `Card.tsx`
      - `IconButton.tsx`
  - `features/` : 도메인(기능) 단위 모듈
    - `calculator/`
      - `components/`
        - `PredictModeForm.tsx`
        - `GoalModeForm.tsx`
        - `ResultSection.tsx`
      - `hooks/`
        - `usePredictModeCalculator.ts`
        - `useGoalModeCalculator.ts`
      - `utils/`
        - `compoundInterest.ts`
        - `formatKoreanCurrency.ts`
        - `timeToGoal.ts`
      - `types/`
        - `calculator.ts`
  - `server/` : 서버/서버리스 도메인 로직
    - `services/`
      - `compoundCalculator.ts` : 복리 계산 서비스
      - `goalCalculator.ts` : 목표 달성 시점 계산 서비스
    - `utils/`
      - `validation.ts` : API 요청 검증
      - `error.ts` : 에러 헬퍼 및 공통 응답 포맷
    - `config/`
      - `env.ts` : 환경 변수 로딩/검증
    - `types/`
      - `api.ts` : API 요청/응답 DTO 타입
      - `calculation.ts` : 서버 계산용 타입
  - `hooks/`
    - `useResponsiveLayout.ts`
    - `useDebouncedValue.ts`
  - `lib/`
    - `chartConfig.ts` : 차트 공통 옵션/색상
    - `constants.ts` : 슬라이더 min/max, 기본 이율/기간 등 상수
    - `koreanNumberUtil.ts` : 만/억 단위 변환 유틸
  - `styles/`
    - `theme.ts` 또는 `theme.css` : 디자인 토큰(색상, spacing, radius 등)
  - `types/`
    - `index.ts` : 공용 타입 모음
    - `chart.ts` : 차트 데이터 포인트 타입

---

## 3. 문서 및 관리

- `require/prd.md` : 원본 PRD (기획·비즈니스 관점)
- `require/frontend.md` : 프론트엔드 구현 계획 및 규칙
- `require/server.md` : 서버/서버리스 구현 계획 및 규칙
- `prd.md` (현재 문서) : **실행 체크리스트 + 최종 파일 구조 요약**


