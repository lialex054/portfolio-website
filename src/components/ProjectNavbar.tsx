// FILE: src/components/ProjectNavbar.tsx

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function ProjectNavbar() {
  return (
    // UPDATED: Added transition-colors and duration-300 here
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300 ease-in-out">
      <div className="flex items-center justify-between py-6 px-12">
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

        <div className="flex items-center gap-6">
          <ThemeToggleButton />
          <a href="https://www.linkedin.com/in/alexli429" target="_blank" rel="noopener noreferrer">
            {/* UPDATED: Removed the individual transition-colors from the icon */}
            <Linkedin className="w-6 h-6 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white" />
          </a>
          <a href="mailto:lialex054@gmail.com">
            {/* UPDATED: Removed the individual transition-colors from the icon */}
            <Mail className="w-6 h-6 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white" />
          </a>
        </div>
      </div>
    </nav>
  );
}