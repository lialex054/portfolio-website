// FILE: src/app/projects/page.tsx

import 'server-only'
import { promises as fs } from 'fs';
import path from 'path';
import PageWrapper from "@/components/PageWrapper";
import ProjectGrid from "@/components/ProjectGrid";
import Underline from "@/components/Underline";
import { getProjectsWithSizes } from "@/lib/project-utils";

async function getFirstImageForProject(slug: string): Promise<string | null> {
  try {
    const imageDir = path.join(process.cwd(), 'public', 'images', slug);
    const imageFilenames = await fs.readdir(imageDir);
    const firstImage = imageFilenames
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort()[0];
    
    return firstImage ? `/images/${slug}/${firstImage}` : null;
  } catch {
    return null;
  }
}

export default async function ProjectsPage() {
  const projectsWithSize = getProjectsWithSizes();

  const projectsWithImages = await Promise.all(
    projectsWithSize.map(async (project) => ({
      ...project,
      firstImage: await getFirstImageForProject(project.slug),
    }))
  );

  return (
    <PageWrapper>
      <section className="pb-12">
        <div className="inline-block mb-8">
          <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-2">
            All Projects
          </h1>
          <Underline />
        </div>
        
        <ProjectGrid projects={projectsWithImages} />
      </section>
    </PageWrapper>
  );
}