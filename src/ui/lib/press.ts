import { useEffect } from "react";
import { SpringValue } from "@react-spring/web";

// Buttons with `.press` get a raised "ledge"
// that drops when pressed (--press-y); `.press-flat` items just scale (--press-scale).
// Both are driven by react-spring values written straight to CSS variables.

type Kind = "ledge" | "flat";
type State = "rest" | "hover" | "pressed";

const STATES: Record<Kind, Record<State, number>> = {
  ledge: { rest: 0, hover: -1, pressed: 4 },
  flat: { rest: 1, hover: 1, pressed: 0.96 },
};

const CSS_VAR: Record<Kind, string> = { ledge: "--press-y", flat: "--press-scale" };
const PRESSED_CONFIG = { tension: 900, friction: 40 };
const IDLE_CONFIG = { tension: 520, friction: 22 };

const cache = new WeakMap<Element, { kind: Kind; value: SpringValue<number> }>();

function resolve(node: EventTarget | null): { el: HTMLElement; kind: Kind } | null {
  if (!(node instanceof Element)) return null;
  const el = node.closest<HTMLElement>(".press, .press-flat");
  if (!el || el.matches(':disabled, [aria-disabled="true"]')) return null;
  return { el, kind: el.classList.contains("press") ? "ledge" : "flat" };
}

function spring(el: HTMLElement, kind: Kind) {
  const existing = cache.get(el);
  if (existing?.kind === kind) return existing;
  const value = new SpringValue<number>(STATES[kind].rest, {
    onChange: ({ value: next }) => el.style.setProperty(CSS_VAR[kind], String(next)),
  });
  const entry = { kind, value };
  cache.set(el, entry);
  return entry;
}

function run(el: HTMLElement, kind: Kind, state: State) {
  spring(el, kind).value.start(STATES[kind][state], {
    config: state === "pressed" ? PRESSED_CONFIG : IDLE_CONFIG,
    immediate: matchMedia("(prefers-reduced-motion: reduce)").matches,
  });
}

/** Mount once near the app root: drives every .press / .press-flat element. */
export function usePressEffect() {
  useEffect(() => {
    let active: { el: HTMLElement; kind: Kind } | null = null;

    const press = (hit: { el: HTMLElement; kind: Kind }) => {
      active = hit;
      run(hit.el, hit.kind, "pressed");
    };

    const release = () => {
      if (!active) return;
      const { el, kind } = active;
      active = null;
      run(el, kind, el.matches(":hover") ? "hover" : "rest");
    };
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const hit = resolve(e.target);
      if (hit) press(hit);
    };
    const over = (e: PointerEvent) => {
      const hit = resolve(e.target);
      if (hit && e.pointerType === "mouse" && hit.el !== active?.el && !hit.el.contains(e.relatedTarget as Node)) {
        run(hit.el, hit.kind, "hover");
      }
    };
    const out = (e: PointerEvent) => {
      const hit = resolve(e.target);
      if (hit && hit.el !== active?.el && !hit.el.contains(e.relatedTarget as Node)) run(hit.el, hit.kind, "rest");
    };
    const keydown = (e: KeyboardEvent) => {
      if ((e.key !== " " && e.key !== "Enter") || e.repeat) return;
      const hit = resolve(e.target);
      if (hit) press(hit);
    };

    const listeners: Array<[string, EventListener]> = [
      ["pointerdown", down as EventListener],
      ["pointerup", release],
      ["pointercancel", release],
      ["pointerover", over as EventListener],
      ["pointerout", out as EventListener],
      ["keydown", keydown as EventListener],
      ["keyup", release],
    ];
    for (const [type, fn] of listeners) document.addEventListener(type, fn, { capture: true, passive: true });
    return () => {
      for (const [type, fn] of listeners) document.removeEventListener(type, fn, { capture: true });
    };
  }, []);
}
