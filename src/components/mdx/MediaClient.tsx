"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { useLightbox, type LightboxImage } from "./Lightbox";
import { cn } from "@/lib/utils";

export function ZoomableFigure({ image }: { image: LightboxImage }) {
  const { open, viewer } = useLightbox([image]);
  return (
    <figure className="my-10">
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={`Expand image: ${image.alt}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-line bg-tile-2"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-auto w-full"
        />
      </button>
      {image.caption && <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>}
      {viewer}
    </figure>
  );
}

export function GalleryGrid({ images }: { images: LightboxImage[] }) {
  const { open, viewer } = useLightbox(images);
  const cols = images.length === 2 ? "sm:grid-cols-2" : images.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={cn("my-10 grid grid-cols-1 gap-3", cols)}>
      {images.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => open(i)}
          aria-label={`Expand image: ${img.alt}`}
          className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[20px] border border-line bg-tile-2"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </button>
      ))}
      {viewer}
    </div>
  );
}

/** YouTube embed that loads only when clicked (a thumbnail until then). */
export function YouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative my-10 aspect-video overflow-hidden rounded-[20px] border border-line bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover opacity-80" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-on-accent transition-transform group-hover:scale-110">
            <Play className="size-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
