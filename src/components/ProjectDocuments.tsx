// FILE: src/components/ProjectDocuments.tsx

import { Button } from './ui/button';
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
      <h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300">RELATED LINKS</h2>
      <div className="flex flex-wrap items-center gap-3">
        {documents.map((doc) => (
          <Button key={doc.url} variant="secondary" asChild>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer" // Security best practice for external links
            >
              <LinkIcon />
              {doc.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}