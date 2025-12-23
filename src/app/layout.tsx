import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "한국형 복리 계산기",
  description: "재테크 입문자와 FIRE 지향 사용자를 위한 직관적인 복리 계산기",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} min-h-screen bg-slate-50 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
