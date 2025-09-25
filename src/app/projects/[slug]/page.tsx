// FILE: app/projects/[slug]/page.tsx

import 'server-only'
export const runtime = 'nodejs'

import { projects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { promises as fs } from 'fs'
import path from 'path'
import ProjectGallery from '@/components/ProjectGallery'
import ProjectDocuments from '@/components/ProjectDocuments' // NEW: Import the documents component

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

  // --- Image Loading Logic (No Changes Here) ---
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
    <section>
      {/* Project Header (No Changes) */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-4">
          {project.name}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-300">
          {project.module}
        </h2>
        <p className="text-lg text-gray-400 mt-1">{project.date}</p>
      </div>

      {/* Project Description (No Changes) */}
      <p className="max-w-3xl text-gray-400 leading-relaxed mb-8">
        {project.description}
      </p>

      {/* Skills Section (No Changes) */}
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

      {/* UPDATED: Image Gallery */}
      <ProjectGallery images={projectImages} projectName={project.name} />

      <ProjectDocuments documents={project.documents} />

    </section>
  )
}