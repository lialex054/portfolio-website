import HomeGrid from "@/components/home/HomeGrid";
import Archive from "@/components/home/Archive";
import About from "@/components/home/About";
import { getProjects, mediaSize, toMeta } from "@/lib/content";
import { about } from "@/lib/site";

export default function Home() {
  const projects = getProjects().map(toMeta);

  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-8 pt-4 md:px-6 md:pt-6 lg:px-8">
      <HomeGrid projects={projects} />
      <Archive />
      <About portraitSize={mediaSize(about.portrait)} />
    </main>
  );
}
