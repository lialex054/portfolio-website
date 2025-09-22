import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import { Linkedin, Mail } from "lucide-react";

export default function ProjectNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div className="flex items-center justify-between py-6 px-12">
        {/* Logo Link */}
        <Link href="/">
          {/* Black logo (for light mode) */}
          <Image
            src="/logo-black.svg"
            alt="Logo"
            width={50} // Adjust size as needed
            height={50}
            className="block dark:hidden" // This is visible by default, but hidden in dark mode
          />
          {/* White logo (for dark mode) */}
          <Image
            src="/logo-white.svg"
            alt="Logo"
            width={50} // Adjust size as needed
            height={50}
            className="hidden dark:block" // This is hidden by default, but visible in dark mode
          />
        </Link>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/alexli429" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
          </a>
          <a href="mailto:lialex054@gmail.com">
            <Mail className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </nav>
  );
}