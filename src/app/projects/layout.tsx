import ProjectSidebar from "@/components/ProjectSidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
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