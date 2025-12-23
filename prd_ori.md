[PRD] 한국형 사용자 친화적 복리계산기 (Compound Interest Visualizer)

1. Project Overview
본 프로젝트는 사용자가 투자 원금, 주기적 추가 적립금, 수익률 등을 설정하여 미래 자산 가치를 시각화하거나, 목표 금액 달성 시점을 예측하는 웹 기반 복리계산기입니다. 한국 사용자의 정서에 맞는 숫자 표기 방식(만 단위)과 직관적인 UI/UX를 제공하며, Netlify를 통해 배포합니다.

2. User Personas
- 재테크 입문자: 소액으로 투자를 시작했을 때 미래의 가치를 시각적으로 보고 동기부여를 얻고 싶은 사용자.
- 파이어족(FIRE): 특정 목표 금액(예: 10억)을 달성하기 위해 매달 얼마를 더 투자해야 하는지, 혹은 얼마나 더 시간이 걸리는지 계산하고 싶은 사용자.

3. Core Functionalities (상세 기능)
3.1. 계산 모드 (Two-Way Mode)
3.1.1. 자산 예측 모드: "이대로 투자하면 얼마가 될까?"
- 입력: 원금, 추가 적립금(주기 설정), 기간, 수익률
- 출력: 최종 예상 금액, 원금 대비 수익 비중(차트)
3.1.2. 목표 달성 모드: "언제쯤 목표 금액에 도달할까?"
- 입력: 목표 금액, 원금, 추가 적립금(주기 설정), 수익률
- 출력: 소요 기간(년/월), 달성 시점의 총 투자액
3.2. 한국 친화적 UI/UX숫자 
- 가독성: 1,000,000원을 100만 원과 같이 한글 단위를 병기하여 큰 숫자를 쉽게 읽도록 구현.
- 입력 방식: 키보드 입력 외에도 **슬라이더(Slider)**를 배치하여 마우스나 손가락 스크롤만으로 수치를 빠르게 변경하고 결과를 실시간 반영.
- 반응형 디자인: 모바일 환경에서 모든 입력창과 결과 차트가 한 화면에 들어오도록 설계.
3.3. 수식 및 알고리즘복리 공식 
(Compound Interest):$$A = P(1 + r/n)^{nt} + PMT \times \frac{(1 + r/n)^{nt} - 1}{r/n}$$
$A$: 최종 금액
$P$: 초기 원금
$r$: 연이율
$n$: 복리 횟수 (연 단위 계산 시 1)$t$: 기간 (년)
$PMT$: 주기적 적립금

4. Tech Stack & Tools (Doc)
Frontend
- Framework: React.js 또는 Next.js (Cursor AI와 협업 시 가장 효율적)
- Styling: Tailwind CSS (빠른 UI 구현 및 반응형 최적화)
- State Management: React Hooks (useState, useEffect)
- Chart Library: Chart.js 또는 Recharts (자산 증가 곡선 시각화)
- Icons: Lucide-react (심플한 아이콘)
Infrastructure
- Deployment: Netlify (GitHub 연동을 통한 자동 배포)
- Domain: Netlify 기본 도메인 또는 외부 구매 도메인 연결
자료 및 참조
- 금융 공식: 매월 적립식 복리 계산 로직 (기말불/기초불 선택 옵션 고려)
- UI Reference: 토스(Toss)나 뱅크샐러드와 같은 깔끔한 금융 UI 스타일 가이드

5. UI/UX Design Requirements
Layout 구조
- Top: 서비스 타이틀 및 계산 모드 탭 (자산 예측 vs 목표 달성)
- Middle (Input): * 슬라이더 + 숫자 입력창 세트 (원금, 적립금, 수익률, 기간)
  적립 주기 선택 (매일/매주/매월/매년) 드롭다운
- Bottom (Output):
  Big Number: 최종 결과 금액 (예: "25년 뒤 당신의 자산은 10억 5천만 원입니다.")
  Visual Chart: 시간 흐름에 따른 자산 성장 곡선 (원금은 막대, 수익은 라인 등으로 구분)
  
6. Deployment Workflow (Netlify)
6.1. GitHub Repo 생성: Cursor AI에서 작성한 코드를 푸시합니다.
6.2. Netlify 연결: Netlify 대시보드에서 Import from git을 선택합니다.
6.3. Build Settings: * Build Command: npm run build
  Publish directory: out (Next.js) 또는 dist (Vite/React)
6.4. Custom Domain: Domain settings에서 보유한 도메인을 연결하고 SSL(HTTPS)을 활성화합니다.


File Structure (파일 구조)
