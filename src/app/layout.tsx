import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ProjectNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // Add this line
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], // And this line
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
          <SidebarProvider>
            <NavBar />
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}