import type { Metadata } from "next";
import { notoSans, notoSansJP } from "./fonts";
import "./globals.css";
import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { SessionProvider } from "next-auth/react";

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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <SessionProvider>
              <AppSidebar />
              <main className="w-dvw h-dvh">
                <div className="w-full justify-between flex items-center h-12 px-3 border-b">
                  <SidebarTrigger />
                  <ThemeModeToggle />
                </div>
                {children}
              </main>
            </SessionProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
