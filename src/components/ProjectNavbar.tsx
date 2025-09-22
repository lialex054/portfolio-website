import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export default function ProjectNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-20 px-8">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold bg-gray-300 text-gray-900 px-3 py-1 rounded-md">
          logo
        </Link>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
          </a>
          <a href="mailto:your-email@example.com">
            <Mail className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </nav>
  );
}