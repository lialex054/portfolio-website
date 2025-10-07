// FILE: src/lib/project-utils.ts

import { projects, type Project } from './projects';

// Helper array to convert month names to a number (0-indexed)
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Parses the project date string to get the end date in a timezone-safe way.
 * Handles formats like "October 2024 - March 2025" or "January 2024".
 * @param dateStr The date string from the project data.
 * @returns A Date object representing the project's end date in UTC.
 */
function getEndDate(dateStr: string): Date {
  const dateParts = dateStr.split(' - ');
  const endDateStr = dateParts[dateParts.length - 1];

  // UPDATED: Manually parse the "Month Year" string
  const [monthStr, yearStr] = endDateStr.split(' ');
  const monthIndex = MONTHS.indexOf(monthStr);
  const year = parseInt(yearStr, 10);

  // Use Date.UTC to create a timezone-agnostic timestamp
  if (!isNaN(year) && monthIndex > -1) {
    return new Date(Date.UTC(year, monthIndex));
  }
  
  // Fallback for any unexpected date format
  return new Date(0);
}

/**
 * Fetches and sorts all projects by their end date in descending order (newest first).
 * @returns A sorted array of Project objects.
 */
export function getSortedProjects(): Project[] {
  const sorted = [...projects].sort((a, b) => {
    const dateA = getEndDate(a.date);
    const dateB = getEndDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  return sorted;
}

// NEW: Function to assign grid sizes to projects
export type ProjectGridItem = Project & {
  size: '2x2' | '1x2' | '2x1' | '1x1';
};

/**
 * Assigns sizes to projects to fit them into a perfect rectangular grid.
 * The first 7 projects have specific sizes to create a 3x4 grid.
 * After that, all projects are 1x1 to continue the pattern.
 * This overrides the "size by description" logic to guarantee a clean layout.
 */
export function getProjectsWithSizes(): ProjectGridItem[] {
  const sortedProjects = getSortedProjects();

  const sizeSequence: ProjectGridItem['size'][] = [
    '2x2', // Project 1
    '1x2', // Project 2
    '2x1', // Project 3
    '1x1', // Project 4
    '1x1', // Project 5
    '2x1', // Project 6
    '1x2', // Project 7
    '1x1', // Project 8
    '1x1', // Project 9
    '2x1', // Project 10
  ];

  return sortedProjects.map((project, index) => {
    const size = sizeSequence[index] || '1x1'; // Default to 1x1 for projects beyond the initial sequence
    return { ...project, size };
  });
}