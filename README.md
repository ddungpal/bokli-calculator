This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 배포 (Deployment)

### Netlify 배포

이 프로젝트는 Netlify에 배포하도록 설정되어 있습니다.

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

**빠른 배포:**
1. GitHub에 코드 푸시
2. [Netlify](https://www.netlify.com/)에 로그인
3. "Add new site" → "Import an existing project" → GitHub 저장소 선택
4. 빌드 설정은 `netlify.toml` 파일이 자동으로 적용됩니다
5. "Deploy site" 클릭

### Vercel 배포 (대안)

Next.js를 만든 Vercel에서도 배포할 수 있습니다:
- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
