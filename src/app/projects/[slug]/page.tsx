import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge"; // Updated import path to match shadcn structure

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

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
      <p className="max-w-3xl text-gray-400 leading-relaxed mb-8">
        {project.description}
      </p>

      {/* --- NEW SKILLS SECTION --- */}
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-300">SKILLS</h2>
        <div className="flex flex-wrap items-center gap-2">
          {project.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      {/* --- END NEW SECTION --- */}

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:row-span-2 bg-gray-300 rounded-md min-h-[400px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
        <div className="bg-gray-300 rounded-md min-h-[192px]"></div>
      </div>
    </section>
  );
}