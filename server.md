## Project-Overview (프로젝트 개요)

- **역할 정의**
  - 본 서비스는 계산식 자체가 상대적으로 가볍기 때문에, 1차 버전은 **완전 서버리스/무상태(stateless) 구조**를 지향한다.
  - 복리 계산, 목표 달성 시점 계산은 클라이언트에서 수행 가능하지만,
    - 향후 **고급 기능(세금, 인플레이션, 시나리오 저장/공유 등)** 확장을 고려해,
    - 서버 레이어(또는 서버리스 함수)를 통해 **검증/로깅/집계/추가 비즈니스 로직**을 처리할 수 있도록 설계한다.
  - 동시 접속자가 많아질 경우를 대비해, **수평 확장이 쉬운 구조**(Serverless Function + CDN 캐싱)를 기본으로 한다.

- **기본 아키텍처 방향**
  - **Next.js + Netlify Functions(또는 Vercel Functions 유사 구조)** 를 전제.
  - 서버는 다음을 담당:
    - (옵션) 계산 API: 동일 로직을 서버에서 수행해 클라이언트 코드 단순화.
    - (미래) 사용자별 시나리오 저장/조회 API.
    - (미래) 통계/분석용 이벤트 수집/집계.
  - 데이터베이스는 1차 버전에서는 **없음**(stateless), 이후 필요 시:
    - Supabase / PlanetScale / Neon 등 **managed DB**를 도입.

---

## feature-requirements (기능 요구사항)

### 1. 계산 관련 API (옵션, 확장 가능)

> 1차 버전에서는 계산 로직을 프론트에서 처리하고, 서버 API는 **선택적**으로 도입 가능하도록 설계한다.  
> 아래는 서버로 옮길 경우를 대비한 설계이다.

- **1.1 자산 예측 계산 API**
  - 엔드포인트: `POST /api/calc/predict`
  - 요청 바디:
    - `principal` (number): 초기 원금
    - `recurringAmount` (number): 주기적 적립금
    - `periodYears` (number): 투자 기간(년)
    - `rate` (number): 연 이율 (예: 0.07)
    - `frequency` (string): "daily" | "weekly" | "monthly" | "yearly"
  - 응답:
    - `finalAmount` (number): 최종 금액 A
    - `totalPrincipal` (number): 원금 + 누적 적립금
    - `interestGained` (number): 수익(이자) 금액
    - `timeline` (Array<{ time: number; total: number; principal: number; interest: number }>): 차트용 시계열 데이터

- **1.2 목표 달성 시점 계산 API**
  - 엔드포인트: `POST /api/calc/goal`
  - 요청 바디:
    - `goalAmount` (number)
    - `principal` (number)
    - `recurringAmount` (number)
    - `rate` (number)
    - `frequency` (string)
    - (옵션) `maxYears` (number): 계산 상한(예: 100년)
  - 응답:
    - `reached` (boolean): 목표 달성 가능 여부
    - `years` (number | null): 달성까지 걸리는 년수
    - `months` (number | null): 추가 개월 수
    - `finalAmount` (number): 목표 도달 시점(or 상한 시점)의 자산
    - `totalPrincipal` (number): 그 시점까지의 누적 투자액
    - `timeline` (Array<...>): 시계열 데이터

- **1.3 공통 요구사항**
  - 입력 값 검증:
    - 음수/비정상 값 차단 (원금 < 0, 기간 0년 등).
    - 지나치게 큰 값(예: 10^12 이상)은 에러 또는 경고 처리.
  - **성능**
    - 계산은 O(n) (기간 x 주기수) 정도로 충분히 빠르며,
    - timeline 샘플링(예: 매월/매년 단위로 축약)을 통해 응답 크기와 서버 부하 최소화.

### 2. 이벤트 로깅 & 분석 (향후 기능)

- **2.1 사용 패턴 로깅**
  - 어떤 입력 범위가 많이 사용되는지, 어떤 모드(자산 예측/목표 달성)가 더 많이 쓰이는지 추후 분석할 수 있도록 이벤트 기반 로깅 설계.
  - 엔드포인트 예: `POST /api/events/usage`
    - `mode`, `principalRange`, `goalRange`, `frequency`, `deviceType` 등 최소 정보만 수집.

- **2.2 개인정보 비수집**
  - 본 서비스는 계산기 특성상 **개인식별 정보(PII)를 저장하지 않는 방향**으로 설계.
  - 쿠키/세션 기반 사용자 추적은 최소화하고, 가능한 경우 **익명/집계 데이터**만 사용.

### 3. 성능/확장성 요구사항

- **고동시성 대응 전략**
  - 서버 인스턴스에 상태를 두지 않고, 모든 요청은 **무상태(stateless)** 로 설계.
  - Netlify/Vercel Functions 등 서버리스 인프라를 활용하여 자동 스케일링.
  - 계산 로직은 CPU 부담이 크지 않으므로, I/O 지연(외부 DB, 외부 API 호출)을 최소화하여 딜레이를 줄인다.

- **캐싱 전략**
  - GET 요청이 아닌 POST 중심이지만, 동일 파라미터에 대한 계산 결과는 **메모리 또는 edge 캐시**로 재사용 가능.
  - 단, 1차 버전에서는 캐싱 구현보다 **로직 단순화 및 서버리스 구조**를 우선.

---

## relevant-codes (관련 코드)

> 실제 서버/서버리스 코드 구현 시, 주요 파일 위치와 역할을 정리하는 섹션이다.  
> Next.js App Router + Netlify Functions 기준으로 작성한다.

- **API 라우트**
  - `src/app/api/calc/predict/route.ts`
    - 자산 예측 계산 API 핸들러.
  - `src/app/api/calc/goal/route.ts`
    - 목표 달성 시점 계산 API 핸들러.
  - (옵션) `src/app/api/events/usage/route.ts`
    - 사용 패턴 로깅용 엔드포인트.

- **도메인 로직**
  - `src/server/services/compoundCalculator.ts`
    - PRD의 복리 공식 구현, 적립 주기별 계산 로직.
  - `src/server/services/goalCalculator.ts`
    - 목표 금액 달성 시점 계산, 반복/이분 탐색 등 알고리즘 캡슐화.

- **유틸리티 / 공통**
  - `src/server/utils/validation.ts`
    - 요청 파라미터 검증 스키마(Zod 또는 자체 검증).
  - `src/server/utils/error.ts`
    - 에러 타입 정의, 공통 에러 응답 포맷.
  - `src/server/config/env.ts`
    - 환경 변수 로딩/검증 (추후 DB나 외부 서비스 도입 시 사용).

- **타입 정의**
  - `src/server/types/api.ts`
    - 요청/응답 타입, 공통 DTO 정의.
  - `src/server/types/calculation.ts`
    - 내부 계산 결과, 타임라인 포맷 등 타입 정의.

---

## Current-file-instruction (현재 파일 구조)

> 이 문서는 서버(또는 서버리스) 레이어에 대한 **설계 및 작업 계획**을 정리하는 문서이다.

- **이 문서의 역할**
  - 서버가 담당할 **책임 범위**(무상태 계산, 향후 시나리오 저장, 이벤트 로깅 등)를 명확히 한다.
  - API 설계, 디렉토리 구조, 성능/확장성 전략을 한눈에 파악할 수 있게 한다.
  - 실제 구현이 진행되면, 엔드포인트 추가/변경 사항과 함께 **이 문서를 지속적으로 업데이트**한다.

- **PRD와의 연결**
  - `3. Core Functionalities`의 계산/목표 달성 로직을 서버 측으로 옮길 수 있는 구조를 잡는다.
  - `4. Tech Stack & Tools` 중 인프라(Netlify)에 맞춰 서버 구성을 설계한다.
  - `5. UI/UX Design Requirements`의 사용자 경험을 **지연 없이 지원**할 수 있도록 성능을 고려한다.
  - `7. 파일 구조`와 연계해, `src/server` 및 `src/app/api` 구조를 정리한다.

---

## rules (규칙)

> 서버 구현 시 항상 지켜야 할 공통 규칙과 품질 기준을 정의한다.

- **성능/확장성 규칙**
  - 서버는 **무상태(stateless)** 를 원칙으로 하고, 필요한 상태는 클라이언트 또는 외부 스토리지에 둔다.
  - 외부 네트워크 호출(DB, 서드파티 API)은 최소화하고, 반드시 **타임아웃 및 재시도 정책**을 둔다.
  - 계산 연산은 가능한 한 **단순/직관적인 알고리즘**을 사용하여 딜레이를 줄인다.

- **API 설계 규칙**
  - 모든 API는 **명확한 스키마**(요청/응답 타입)를 가진다.
  - 에러 응답은 일관된 포맷(예: `{ error: { code, message } }`)을 사용한다.
  - 입력값 검증은 핸들러 진입 초기에 수행하고, 검증 실패 시 즉시 4xx를 반환한다.

- **코드 구조 규칙**
  - 비즈니스 로직(복리 계산, 목표 도달 시점 계산)은 `services` 또는 `domain` 레이어에 위치시키고, API 핸들러는 **입출력 바인딩**에 집중한다.
  - 공통 유틸(검증, 에러, env)은 `src/server/utils`, `src/server/config` 등으로 분리한다.

- **운영/보안 규칙**
  - 현재 단계에서는 민감 정보/계정 기능이 없으나, 추후 사용자 저장 기능이 추가될 경우:
    - 모든 민감 정보는 암호화/해싱 처리.
    - HTTPS(SSL)는 Netlify 레벨에서 항상 활성화.
  - 로깅 시 개인 식별 정보는 저장하지 않고, **집계 가능한 데이터**만 수집한다.

- **작업 프로세스**
  - 1단계: API 스펙과 타입 정의 (`types/api.ts`, `types/calculation.ts`).
  - 2단계: 계산 서비스 구현 (`compoundCalculator`, `goalCalculator`) 및 유닛 테스트.
  - 3단계: API 라우트 구현 및 간단한 부하 테스트(동시 요청 시 지연 여부 확인).
  - 4단계: 필요 시 캐싱/로깅/모니터링 기능을 단계적으로 추가.
