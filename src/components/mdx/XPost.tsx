"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (el?: HTMLElement) => void } };
  }
}

/**
 * Embeds a post from X. Temporary home for the KAIKAKU trailer until the
 * original file is uploaded to YouTube.
 */
export function XPost({ url }: { url: string }) {
  const box = useRef<HTMLDivElement>(null);
  const tweetUrl = url.replace("://x.com/", "://twitter.com/");

  useEffect(() => {
    const load = () => window.twttr?.widgets?.load(box.current ?? undefined);
    if (window.twttr?.widgets) {
      load();
      return;
    }
    const existing = document.getElementById("x-widgets");
    if (existing) {
      existing.addEventListener("load", load);
      return () => existing.removeEventListener("load", load);
    }
    const s = document.createElement("script");
    s.id = "x-widgets";
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.addEventListener("load", load);
    document.body.appendChild(s);
  }, [tweetUrl]);

  return (
    <div ref={box} className="my-10 flex justify-center [&_.twitter-tweet]:!mx-auto">
      <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark">
        <a href={tweetUrl} className="text-accent underline">
          Watch the trailer on X
        </a>
      </blockquote>
    </div>
  );
}
