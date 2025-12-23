# Netlify 배포 가이드

이 문서는 복리 계산기를 Netlify에 배포하는 방법을 단계별로 안내합니다.

## 사전 준비사항

1. **GitHub 계정 및 저장소**
   - 프로젝트가 GitHub 저장소에 푸시되어 있어야 합니다.
   - 저장소는 Public 또는 Private 모두 가능합니다.

2. **Netlify 계정**
   - [Netlify](https://www.netlify.com/)에 가입되어 있어야 합니다.
   - GitHub 계정으로 연동하는 것을 권장합니다.

## 배포 단계

### 1단계: GitHub에 코드 푸시

```bash
# 현재 디렉토리에서
git init  # 아직 git 저장소가 아닌 경우
git add .
git commit -m "Initial commit: 복리 계산기 프로젝트"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 2단계: Netlify에 사이트 생성

1. [Netlify 대시보드](https://app.netlify.com/)에 로그인합니다.

2. **"Add new site"** → **"Import an existing project"** 클릭

3. **"Deploy with GitHub"** 선택 (또는 GitLab, Bitbucket 등 사용 중인 Git 서비스 선택)

4. GitHub 인증 후 저장소 선택

5. **빌드 설정 구성:**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `20` (또는 `18` 이상)

   > 참고: `netlify.toml` 파일이 있으면 자동으로 설정이 적용됩니다.

6. **"Deploy site"** 클릭

### 3단계: 배포 확인

1. 배포가 완료되면 Netlify가 자동으로 생성한 URL을 확인할 수 있습니다.
   - 예: `https://random-name-123456.netlify.app`

2. 배포된 사이트에서 다음을 확인:
   - ✅ 페이지가 정상적으로 로드되는지
   - ✅ 입력 필드가 정상 작동하는지
   - ✅ 계산 결과가 올바르게 표시되는지
   - ✅ 그래프가 정상적으로 렌더링되는지
   - ✅ 모바일 반응형이 제대로 작동하는지

### 4단계: 커스텀 도메인 설정 (선택사항)

1. Netlify 대시보드에서 **"Domain settings"** 클릭

2. **"Add custom domain"** 클릭

3. 도메인 이름 입력 (예: `bokli-calculator.com`)

4. DNS 설정 안내에 따라 도메인 제공업체에서 DNS 레코드 추가:
   - **A 레코드**: Netlify가 제공하는 IP 주소
   - **CNAME 레코드**: Netlify가 제공하는 호스트 이름

5. SSL 인증서는 Netlify가 자동으로 발급합니다.

## 자동 배포 설정

Netlify는 기본적으로 GitHub에 푸시할 때마다 자동으로 재배포합니다.

### 배포 브랜치 설정

- **Production branch**: `main` (또는 `master`)
- **Branch deploys**: 모든 브랜치에 대해 자동 배포할지 선택

### 배포 알림 설정

1. **Site settings** → **Build & deploy** → **Deploy notifications**
2. Slack, Email, GitHub 등으로 배포 알림을 받을 수 있습니다.

## 문제 해결

### 빌드 실패 시

1. **Netlify 빌드 로그 확인**
   - 대시보드에서 **"Deploys"** 탭 클릭
   - 실패한 배포의 **"Deploy log"** 확인

2. **일반적인 문제들:**
   - Node 버전 불일치 → `netlify.toml`에서 `NODE_VERSION` 확인
   - 의존성 설치 실패 → `package.json`의 `dependencies` 확인
   - 빌드 명령어 오류 → `package.json`의 `build` 스크립트 확인

### 로컬에서 빌드 테스트

배포 전에 로컬에서 빌드가 성공하는지 확인:

```bash
npm install
npm run build
npm run start  # 프로덕션 빌드 테스트
```

## 환경 변수 설정 (필요한 경우)

현재 프로젝트는 환경 변수가 필요하지 않지만, 향후 추가할 경우:

1. Netlify 대시보드 → **Site settings** → **Environment variables**
2. 변수 추가: `KEY=value`
3. 빌드 시 자동으로 주입됩니다.

## 성능 최적화

Netlify는 Next.js를 자동으로 최적화합니다:
- ✅ 자동 이미지 최적화
- ✅ 자동 코드 스플리팅
- ✅ CDN 캐싱
- ✅ Edge Functions 지원

## 추가 리소스

- [Netlify 공식 문서](https://docs.netlify.com/)
- [Next.js on Netlify 가이드](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify 지원 포럼](https://answers.netlify.com/)

