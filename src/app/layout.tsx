// FILE: app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ProjectNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my work and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // UPDATED: Removed the hard-coded "dark" class. next-themes will handle this.
    // Added suppressHydrationWarning as recommended by next-themes.
    <html lang="en" suppressHydrationWarning>
      <body
        // UPDATED: Replaced hard-coded dark styles with theme-aware classes and a smooth transition.
        className={`${geistSans.variable} ${geistMono.variable} 
                   antialiased bg-white text-gray-900 
                   dark:bg-gray-900 dark:text-gray-100
                   transition-colors duration-300 ease-in-out`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <NavBar />
          {/* UPDATED: Removed the <main> tag from here to prevent nesting issues.
              Page-specific layouts (like your ProjectsLayout) can define their own <main> tag. */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}