import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { mediaSize } from "@/lib/content";
import { GalleryGrid, YouTube, ZoomableFigure } from "./MediaClient";
import { XPost } from "./XPost";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <ZoomableFigure image={{ src, alt, caption, ...mediaSize(src) }} />;
}

type FigureProps = { src: string; alt: string; caption?: string };

/**
 * A grid of images that open in a lightbox. List each image as a <Figure>:
 *
 *   <Gallery>
 *     <Figure src="/work/x/a.webp" alt="…" />
 *     <Figure src="/work/x/b.webp" alt="…" />
 *   </Gallery>
 *
 * Plain tags only: next-mdx-remote strips {…} expressions from MDX.
 */
function Gallery({ children }: { children?: ReactNode }) {
  const images = Children.toArray(children)
    .filter((child) => isValidElement<FigureProps>(child) && typeof child.props.src === "string")
    .map((child) => {
      const { src, alt, caption } = (child as ReactElement<FigureProps>).props;
      return { src, alt: alt ?? "", caption, ...mediaSize(src) };
    });
  return <GalleryGrid images={images} />;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="my-10 flex flex-col gap-1 border-l-2 border-accent pl-5">
      <span className="text-[44px] font-semibold leading-none tracking-[-0.035em] text-accent md:text-[56px]">{value}</span>
      <span className="text-base text-muted">{label}</span>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return <div className="my-10 rounded-[20px] border border-line bg-tile p-6 text-[17px] [&>p]:m-0">{children}</div>;
}

export const mdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  Figure,
  Gallery,
  Stat,
  Callout,
  YouTube,
  XPost,
};
