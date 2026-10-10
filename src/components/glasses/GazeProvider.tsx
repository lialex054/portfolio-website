"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/*
 * One animation loop drives every pair of interactive glasses on the page.
 *
 * Gaze target
 *   desktop (hover pointer): the hovered tile's centre, else the cursor
 *   touch:                   a tapped point for 1.4s, else the tile nearest the screen centre
 *   neither:                 along the scroll direction
 * Reactions: blink, wink on click, sleep when idle, dizzy on a fast fling or three pokes.
 */

const SLEEP_AFTER_MS = 8000;
const LENS = { L: 75, R: 267, Y: 80 }; // lens centres in the SVG's 342×187 viewBox
const MAX_OFFSET = 30;

type Pupils = { svg: SVGSVGElement; left: SVGGElement; right: SVGGElement };

type GazeState = {
  touch: boolean;
  /** Tile the glasses are looking at: hovered on desktop, centred on touch. */
  active: string | null;
  sleeping: boolean;
};

type GazeApi = GazeState & {
  registerGlasses: (id: string, pupils: Pupils | null) => void;
  registerTile: (slug: string, el: HTMLElement | null) => void;
  setHovered: (slug: string | null) => void;
  wink: (id: string) => void;
  poke: (id: string) => void;
};

const GazeContext = createContext<GazeApi | null>(null);

export function useGaze() {
  const ctx = useContext(GazeContext);
  if (!ctx) throw new Error("useGaze must be used inside <GazeProvider>");
  return ctx;
}

export function GazeProvider({ children }: { children: ReactNode }) {
  const [touch, setTouch] = useState(false);
  const [hovered, setHoveredState] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [sleeping, setSleeping] = useState(false);

  const glasses = useRef(new Map<string, Pupils>());
  const tiles = useRef(new Map<string, HTMLElement>());
  const live = useRef({
    touch: false,
    hovered: null as string | null,
    focused: null as string | null,
    sleeping: false,
    reduced: false,
    pointer: null as { x: number; y: number } | null,
    tap: null as { x: number; y: number } | null,
    tapUntil: 0,
    dirY: 0.3,
    lastInput: 0,
    blinkUntil: 0,
    nextBlink: 0,
    winkId: null as string | null,
    winkUntil: 0,
    dizzyUntil: 0,
    pokes: [] as number[],
    lastY: 0,
    lastT: 0,
    fast: 0,
    current: new Map<string, { x: number; y: number; s: number }>(),
  });

  const wake = useCallback(() => {
    const s = live.current;
    s.lastInput = performance.now();
    if (s.sleeping) {
      s.sleeping = false;
      setSleeping(false);
    }
  }, []);

  const dizzy = useCallback(() => {
    const s = live.current;
    if (s.reduced) return;
    const now = performance.now();
    if (s.dizzyUntil < now) s.dizzyUntil = now + 1200;
  }, []);

  const updateFocus = useCallback(() => {
    const mid = window.innerHeight / 2 + 40;
    let best: string | null = null;
    let bestD = Infinity;
    tiles.current.forEach((el, slug) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = slug;
      }
    });
    if (bestD > window.innerHeight * 0.42) best = null;
    if (best !== live.current.focused) {
      live.current.focused = best;
      setFocused(best);
    }
  }, []);

  useEffect(() => {
    const s = live.current;
    s.touch = window.matchMedia("(hover: none)").matches;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.lastInput = performance.now();
    s.nextBlink = s.lastInput + 2200;
    s.lastY = window.scrollY;
    s.lastT = s.lastInput;
    setTouch(s.touch);

    const onMove = (e: MouseEvent) => {
      if (!s.touch) s.pointer = { x: e.clientX, y: e.clientY };
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (s.touch) {
        s.tap = { x: e.clientX, y: e.clientY };
        s.tapUntil = performance.now() + 1400;
      }
      wake();
    };
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dy = y - s.lastY;
      const dt = Math.max(1, now - s.lastT);
      s.lastY = y;
      s.lastT = now;
      s.fast = dt < 100 && Math.abs(dy) / dt > 3.5 ? s.fast + 1 : 0;
      if (s.fast >= 4) {
        s.fast = 0;
        dizzy();
      }
      if (dy !== 0) s.dirY = Math.max(-1, Math.min(1, dy / 25));
      wake();
      if (s.touch) updateFocus();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const focusTimer = window.setTimeout(() => s.touch && updateFocus(), 300);

    let raf = 0;
    const tick = () => {
      const now = performance.now();
      if (!s.sleeping && now - s.lastInput > SLEEP_AFTER_MS) {
        s.sleeping = true;
        setSleeping(true);
      }
      if (now > s.nextBlink) {
        s.blinkUntil = now + 140;
        s.nextBlink = now + 2400 + Math.random() * 3600;
      }
      const isDizzy = now < s.dizzyUntil;
      const blinking = now < s.blinkUntil;

      let target: { x: number; y: number } | null = null;
      const lockOn = s.touch ? s.focused : s.hovered;
      if (s.touch && now < s.tapUntil && s.tap) target = s.tap;
      else if (lockOn) {
        const el = tiles.current.get(lockOn);
        if (el) {
          const r = el.getBoundingClientRect();
          target = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
      }
      if (!target && !s.touch && s.pointer) target = s.pointer;
      s.dirY *= 0.985;

      glasses.current.forEach((p, id) => {
        const rect = p.svg.getBoundingClientRect();
        if (!rect.width || rect.bottom < 0 || rect.top > window.innerHeight) return;
        const scale = rect.width / 342;
        (
          [
            ["L", LENS.L, p.left],
            ["R", LENS.R, p.right],
          ] as const
        ).forEach(([side, cx, g]) => {
          let tx = 0;
          let ty = 0;
          let sy = 1;
          if (s.sleeping) {
            ty = 18;
            sy = 0.16;
          } else if (isDizzy) {
            const a = now / 110 + (side === "L" ? 0 : Math.PI);
            tx = Math.cos(a) * 24;
            ty = Math.sin(a) * 24;
          } else if (target) {
            const dx = target.x - (rect.left + cx * scale);
            const dy = target.y - (rect.top + LENS.Y * scale);
            const d = Math.hypot(dx, dy);
            if (d > 0.5) {
              const m = MAX_OFFSET * Math.min(1, d / 240);
              tx = (dx / d) * m;
              ty = (dy / d) * m;
            }
          } else {
            ty = MAX_OFFSET * 0.75 * s.dirY;
          }
          if (!s.sleeping && blinking) sy = 0.1;
          if (!s.sleeping && now < s.winkUntil && s.winkId === id && side === "R") sy = 0.1;

          const key = id + side;
          let c = s.current.get(key);
          if (!c) {
            c = { x: tx, y: ty, s: 1 };
            s.current.set(key, c);
          }
          const k = s.reduced ? 1 : isDizzy ? 0.4 : 0.16;
          c.x += (tx - c.x) * k;
          c.y += (ty - c.y) * k;
          c.s += (sy - c.s) * 0.45;
          g.setAttribute(
            "transform",
            `translate(${(cx + c.x).toFixed(2)} ${(LENS.Y + c.y).toFixed(2)}) scale(1 ${c.s.toFixed(3)}) translate(${-cx} ${-LENS.Y})`,
          );
        });
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(focusTimer);
      cancelAnimationFrame(raf);
    };
  }, [wake, dizzy, updateFocus]);

  const registerGlasses = useCallback((id: string, pupils: Pupils | null) => {
    if (pupils) glasses.current.set(id, pupils);
    else glasses.current.delete(id);
  }, []);

  const registerTile = useCallback(
    (slug: string, el: HTMLElement | null) => {
      if (el) tiles.current.set(slug, el);
      else tiles.current.delete(slug);
      if (live.current.touch) updateFocus();
    },
    [updateFocus],
  );

  const setHovered = useCallback((slug: string | null) => {
    if (live.current.touch) return;
    live.current.hovered = slug;
    setHoveredState(slug);
  }, []);

  const wink = useCallback(
    (id: string) => {
      const s = live.current;
      s.winkId = id;
      s.winkUntil = performance.now() + 280;
      wake();
    },
    [wake],
  );

  const poke = useCallback(
    (id: string) => {
      wink(id);
      const s = live.current;
      const now = performance.now();
      s.pokes = s.pokes.filter((t) => now - t < 1500).concat(now);
      if (s.pokes.length >= 3) {
        s.pokes = [];
        dizzy();
      }
    },
    [wink, dizzy],
  );

  const value = useMemo<GazeApi>(
    () => ({
      touch,
      active: touch ? focused : hovered,
      sleeping,
      registerGlasses,
      registerTile,
      setHovered,
      wink,
      poke,
    }),
    [touch, focused, hovered, sleeping, registerGlasses, registerTile, setHovered, wink, poke],
  );

  return <GazeContext.Provider value={value}>{children}</GazeContext.Provider>;
}
