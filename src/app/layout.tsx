import Navbar from "@/components/Navbar";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinterest",
  description:
    "Pinterest helps you find ideas to try. How it works. Log in. Sign up. Discover recipes, home ideas, style inspiration and other ideas to try.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
