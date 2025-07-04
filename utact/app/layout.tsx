import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { AdminProvider } from "./contexts/admin-context";
import ClickSpark from "@/components/animations/click-spark";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UTACT - Developer Portfolio",
  description:
    "Full-stack developer portfolio showcasing modern web development skills and projects.",
  keywords: [
    "developer",
    "portfolio",
    "react",
    "nextjs",
    "typescript",
    "fullstack",
  ],
  authors: [{ name: "UTACT" }],
  openGraph: {
    title: "UTACT - Developer Portfolio",
    description: "Full-stack developer portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdminProvider>
            <ClickSpark
              sparkColor="#ffffff"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
              easing="ease-in-out"
              extraScale={1.1}
            >
              {children}
            </ClickSpark>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
