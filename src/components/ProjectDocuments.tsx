// FILE: src/components/ProjectDocuments.tsx

import { Link as LinkIcon } from 'lucide-react';

// Define the shape of the data this component expects
interface Document {
  label: string;
  url: string;
}

interface ProjectDocumentsProps {
  documents?: Document[];
}

export default function ProjectDocuments({ documents }: ProjectDocumentsProps) {
  // If there are no documents for this project, render nothing.
  if (!documents || documents.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mt-12">
      {/* UPDATED: Heading color is now theme-aware */}
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">RELATED DOCUMENTS</h2>
      <div className="flex flex-wrap items-center gap-3">
        {documents.map((doc) => (
          <a
            key={doc.url}
            href={doc.url}
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Security best practice for external links
            // UPDATED: Button styles are now theme-aware
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
          >
            <LinkIcon size={16} />
            {doc.label}
          </a>
        ))}
      </div>
    </div>
  );
}