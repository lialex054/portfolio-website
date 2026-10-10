export const OPEN_ABOUT_EVENT = "portfolio:open-about";

function behavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/** Smooth-scrolls to an element by id (instant with reduced motion). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: behavior(), block: "start" });
  return true;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: behavior() });
}

/** Opens the About panel, then scrolls to it. */
export function openAbout() {
  window.dispatchEvent(new Event(OPEN_ABOUT_EVENT));
  window.setTimeout(() => scrollToId("about"), 60);
}
