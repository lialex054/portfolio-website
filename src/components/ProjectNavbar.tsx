"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Linkedin, Mail, Menu } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSidebar } from "@/context/SidebarContext";

export default function ProjectNavbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const isProjectPage = pathname.startsWith('/projects');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-colors duration-300 ease-in-out">
      <div className="flex items-center justify-between py-6 px-4 sm:px-12">
        {/* Left side of the Navbar */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo-black.svg"
              alt="Logo"
              width={50}
              height={50}
              className="block dark:hidden"
            />
            <Image
              src="/logo-white.svg"
              alt="Logo"
              width={50}
              height={50}
              className="hidden dark:block"
            />
          </Link>

          {/* UPDATED: The Hamburger Menu Button is now here */}
          {isProjectPage && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full lg:hidden" // Only visible on screens smaller than 'lg'
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Right side of the Navbar */}
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <a href="https://www.linkedin.com/in/alexli429" target="_blank" rel="noopener noreferrer" aria-label="View my LinkedIn profile" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Linkedin className="w-6 h-6 text-zinc-500 dark:text-zinc-300" />
          </a>
          <a href="mailto:lialex054@gmail.com" aria-label="Send me an email" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Mail className="w-6 h-6 text-zinc-500 dark:text-zinc-300" />
          </a>
        </div>
      </div>
    </nav>
  );
}