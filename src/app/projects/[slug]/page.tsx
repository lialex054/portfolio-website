import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  // Find the project data based on the slug from the URL
  const project = projects.find((p) => p.slug === params.slug);

  // If no project is found, show a 404 page
  if (!project) {
    notFound();
  }

  return (
    <section>
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-4">{project.name}</h1>
        <h2 className="text-2xl font-semibold text-gray-300">{project.module}</h2>
        <p className="text-lg text-gray-400 mt-1">{project.date}</p>
      </div>

      {/* Project Description */}
      <p className="max-w-3xl text-gray-400 leading-relaxed mb-12">
        {project.description}
      </p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Large Image */}
        <div className="md:row-span-2 bg-gray-300 rounded-md min-h-[400px]"></div>
        
        {/* Small Images */}
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
      </div>
    </section>
  );
}