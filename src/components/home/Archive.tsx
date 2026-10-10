import { archive } from "@/lib/site";

export default function Archive() {
  return (
    <section id="archive" aria-labelledby="archive-title" className="mt-12 md:mt-20">
      <div className="flex items-baseline justify-between gap-4 pb-3.5">
        <h2 id="archive-title" className="text-xl font-semibold tracking-[-0.02em]">
          Archive
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Engineering work</span>
      </div>
      <ul className="border-b border-line">
        {archive.map((item) => (
          <li key={item.name}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line py-4 transition-colors hover:text-accent"
            >
              <span className="flex-[1_1_220px] text-base font-medium">{item.name} ↗</span>
              <span className="flex-[1_1_220px] text-sm text-muted">{item.kind}</span>
              <span className="font-mono text-[13px] text-muted">{item.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
