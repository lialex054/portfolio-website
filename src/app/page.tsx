// FILE: app/page.tsx

import 'server-only';
import fs from 'fs';
import path from 'path';
import HomePageClient from '@/components/HomePageClient';
import { getSortedProjects } from '@/lib/project-utils'; // NEW: Import the sorting function

export default async function Home() {
  // UPDATED: Get the dynamically sorted list of projects
  const sortedProjects = getSortedProjects();
  const mostRecentProject = sortedProjects[0]; // The first project is now guaranteed to be the newest

  let recentProjectImages: string[] = [];
  try {
    const imageDir = path.join(process.cwd(), 'public', 'images', mostRecentProject.slug);

    const imageFilenames = fs
      .readdirSync(imageDir)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort();

    recentProjectImages = imageFilenames.map(
      (file) => `/images/${mostRecentProject.slug}/${file}`
    );
  } catch (error) {
    console.warn(
      `Warning: No image directory found for slug "${mostRecentProject.slug}" for the home page.`
    );
  }

  return (
    <HomePageClient
      mostRecentProject={mostRecentProject}
      recentProjectImages={recentProjectImages}
    />
  );
}