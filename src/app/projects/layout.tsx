import ProjectNavbar from "@/components/ProjectNavbar";
import ProjectSidebar from "@/components/ProjectSidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <ProjectNavbar />
      <main className="flex pt-20">
        <ProjectSidebar />
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}