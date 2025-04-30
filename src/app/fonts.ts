import { Noto_Sans, Noto_Sans_JP } from "next/font/google";

// 라틴 + 한글용
export const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

// 일본어용 (Noto Sans JP는 전체 일본어 커버 포함)
export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});
