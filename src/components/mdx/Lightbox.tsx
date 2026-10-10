"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxImage = { src: string; alt: string; width: number; height: number; caption?: string };

/** Renders its trigger(s) and a full-screen viewer for `images`. */
export function useLightbox(images: LightboxImage[]) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const viewer =
    index === null ? null : <Viewer images={images} index={index} setIndex={setIndex} onClose={close} />;
  return { open: setIndex, viewer };
}

function Viewer({
  images,
  index,
  setIndex,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const many = images.length > 1;
  const img = images[index];
  const go = (d: number) => setIndex((index + d + images.length) % images.length);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      aria-label={img.alt}
      className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
    >
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="100vw"
          loading="eager"
          className="max-h-[82dvh] w-auto max-w-full rounded-xl object-contain"
        />
        {(img.caption || many) && (
          <p className="text-center text-sm text-white/75">
            {img.caption}
            {many && <span className="ml-2 font-mono text-xs text-white/50">{index + 1} / {images.length}</span>}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => dialog.current?.close()}
        aria-label="Close"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
      {many && (
        <>
          <NavButton side="left" onClick={() => go(-1)}>
            <ChevronLeft className="size-6" />
          </NavButton>
          <NavButton side="right" onClick={() => go(1)}>
            <ChevronRight className="size-6" />
          </NavButton>
        </>
      )}
    </dialog>
  );
}

function NavButton({ side, onClick, children }: { side: "left" | "right"; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20",
        side === "left" ? "left-3 md:left-6" : "right-3 md:right-6",
      )}
    >
      {children}
    </button>
  );
}
