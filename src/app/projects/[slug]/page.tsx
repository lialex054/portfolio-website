// FILE: app/projects/[slug]/page.tsx

import 'server-only'
export const runtime = 'nodejs'

import { projects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { promises as fs } from 'fs'
import path from 'path'
import ProjectGallery from '@/components/ProjectGallery'
import ProjectDocuments from '@/components/ProjectDocuments'
import PageWrapper from '@/components/PageWrapper'
import Underline from '@/components/Underline'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) {
    notFound()
  }

  let projectImages: string[] = []
  try {
    const imageDir = path.join(process.cwd(), 'public', 'images', slug)
    const imageFilenames = await fs.readdir(imageDir)
    const filtered = imageFilenames
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort()
    projectImages = filtered.map((file) => `/images/${slug}/${file}`)
  } catch (error) {
    console.warn(
      `Warning: Image directory not found for project slug: "${slug}".`
    )
  }

  return (
    <PageWrapper>
      <section>
        {/* Project Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-2">
              {project.name}
            </h1>
            <Underline />
          </div>
          {/* UPDATED: Text color is now theme-aware */}
          <h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300">
            {project.module}
          </h2>
          {/* UPDATED: Text color is now theme-aware */}
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-1">{project.date}</p>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col gap-4 mb-12">
          {/* UPDATED: Text color is now theme-aware */}
          <h3 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300">SKILLS</h3>
          <div className="flex flex-wrap items-center gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Description */}
        {/* UPDATED: Text color is now theme-aware */}
        <p className="max-w-3xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
          {project.description}
        </p>

        <ProjectGallery images={projectImages} projectName={project.name} />

        <ProjectDocuments documents={project.documents} />
      </section>
    </PageWrapper>
  )
}