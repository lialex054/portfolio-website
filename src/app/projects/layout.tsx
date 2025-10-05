// FILE: app/projects/layout.tsx

import ProjectSidebar from "@/components/ProjectSidebar";

// This can now be a simple Server Component again
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProjectSidebar />
      <main className="lg:ml-64 pt-20">
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}