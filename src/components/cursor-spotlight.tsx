import { useEffect, useRef } from "react";

/**
 * Premium cursor-following spotlight. Wrap it inside a `relative` container.
 * On touch devices it fades out; on desktop it tracks the pointer with a
 * soft purple radial glow using mix-blend for a glossy look.
 */
export function CursorSpotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate3d(${cx - 220}px, ${cy - 220}px, 0)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute left-0 top-0 z-20 h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-300 ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, oklch(0.65 0.28 300 / 0.35), oklch(0.78 0.16 85 / 0.15) 45%, transparent 70%)",
        mixBlendMode: "screen",
        filter: "blur(20px)",
      }}
    />
  );
}
