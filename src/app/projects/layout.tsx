// FILE: app/projects/[slug]/layout.tsx

import ProjectSidebar from "@/components/ProjectSidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // UPDATED: Removed "bg-gray-900" and "text-gray-100".
    // This div no longer has a background, allowing it to inherit the theme from the root layout.
    <div>
      <ProjectSidebar />
      {/* Add margin to the left to make space for the fixed sidebar */}
      <main className="ml-64 pt-20">
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}