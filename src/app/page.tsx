// FILE: app/page.tsx (Cleaned Up)

import 'server-only'
import { projects } from '@/lib/projects'
import fs from 'fs'
import path from 'path'
import HomePageClient from '@/components/HomePageClient'
// --- REMOVE THIS LINE ---
// import NavBar from "@/components/NavBar";

export default async function Home() {
  const mostRecentProject = projects[0]

  let recentProjectImages: string[] = []
  try {
    const imageDir = path.join(process.cwd(), 'public', 'images', mostRecentProject.slug)

    const imageFilenames = fs
      .readdirSync(imageDir)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort()

    recentProjectImages = imageFilenames.map(
      (file) => `/images/${mostRecentProject.slug}/${file}`
    )
  } catch (error) {
    console.warn(
      `Warning: No image directory found for slug "${mostRecentProject.slug}" for the home page.`
    )
  }

  // --- REVERT THIS PART ---
  // Return only the HomePageClient component
  return (
    <HomePageClient
      mostRecentProject={mostRecentProject}
      recentProjectImages={recentProjectImages}
    />
  )
}