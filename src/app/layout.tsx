import type { Metadata } from "next";
import { Geist_Mono, Outfit, Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ProjectNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/context/SidebarContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} 
                   antialiased bg-white text-zinc-900 
                   dark:bg-zinc-900 dark:text-zinc-100
                   transition-colors duration-300 ease-in-out`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <SidebarProvider>
            <NavBar />
            <main className="pt-12 px-4 sm:px-6 md:px-12 lg:px-24">{children}</main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}