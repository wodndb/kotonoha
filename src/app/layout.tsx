import type { Metadata } from "next";
import { notoSans, notoSansJP } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "kotonoha",
  description: "Web service to study Japanese words for personal purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
