import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectSidebar() {
  return (
    <aside className="w-64 py-8 pr-8">
      <nav className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="text-lg text-gray-400 hover:text-white transition-colors"
          >
            {project.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}