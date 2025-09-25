import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// This function provides the list of slugs to Next.js for static generation.
export async function generateStaticParams() {
  // The projects array is mapped to return an array of objects,
  // where each object has a `slug` property.
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// The page component itself remains an async function.
export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await params before using its properties (Next.js 15+).
  const { slug } = await params;

  // The 'slug' is used here to find the correct project.
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section>
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-4">
          {project.name}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-300">
          {project.module}
        </h2>
        <p className="text-lg text-gray-400 mt-1">{project.date}</p>
      </div>

      {/* --- NEW SKILLS SECTION --- */}
      <div className="flex flex-col gap-2 mb-6">
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

      {/* Project Description */}
      <p className="max-w-3xl text-gray-400 leading-relaxed mb-8">
        {project.description}
      </p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:row-span-2 bg-gray-300 rounded-md min-h-[400px]" />
        <div className="bg-gray-300 rounded-md min-h-[192px]" />
        <div className="bg-gray-300 rounded-md min-h-[192px]" />
        <div className="bg-gray-300 rounded-md min-h-[192px]" />
        <div className="bg-gray-300 rounded-md min-h-[192px]" />
      </div>
    </section>
  );
}