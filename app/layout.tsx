import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jotion  ",
  description: "The conceted worksapce where better fater work happens",
  icons: [
    {
      media: "(prefers-color-scheme :light",
      url: "/logo.svg",
      href: "/logo.svg"
    },
    {
      media: "(prefers-color-scheme :light",
      url: "/logo-dark.svg",
      href: "/logo-dark.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      // className={inter.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="jotion-theme-2"

        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
