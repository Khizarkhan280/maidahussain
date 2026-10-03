import { useEffect, useRef } from "react";
import { createWave } from "./waveEngine";

export default function WaveField({ rows = 0, intensity = 0.4, opacity = 1.3, dots = 3 }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const options = { rows, intensity, opacity, dots };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    // a fresh canvas per effect run (a canvas can only be transferred once)
    const canvas = document.createElement("canvas");
    box.appendChild(canvas);

    const size = () => {
      const r = box.getBoundingClientRect();
      return { w: r.width, h: r.height, dpr };
    };

    let worker = null;
    let wave = null;

    if ("OffscreenCanvas" in window && canvas.transferControlToOffscreen) {
      // ---- worker path: drawing happens off the main thread ----
      worker = new Worker(new URL("./wave.worker.js", import.meta.url), { type: "module" });
      const off = canvas.transferControlToOffscreen();
      worker.postMessage({ type: "init", canvas: off, options, still, ...size() }, [off]);
    } else {
      // ---- fallback: draw on the main thread ----
      wave = createWave(canvas, options);
      const s = size();
      wave.resize(s.w, s.h, s.dpr);
      still ? wave.renderOnce() : wave.start();
    }

    const send = (msg) => (worker ? worker.postMessage(msg) : null);

    const ro = new ResizeObserver(() => {
      const s = size();
      if (worker) send({ type: "resize", still, ...s });
      else {
        wave.resize(s.w, s.h, s.dpr);
        if (still) wave.renderOnce();
      }
    });
    ro.observe(box);

    const io = new IntersectionObserver(([en]) => {
      worker ? send({ type: "visible", v: en.isIntersecting }) : wave.setVisible(en.isIntersecting);
    });
    io.observe(box);

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      worker ? send({ type: "mouse", x, y }) : wave.setMouse(x, y);
    };
    if (!still) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      if (worker) {
        worker.postMessage({ type: "stop" });
        worker.terminate();
      } else {
        wave.stop();
      }
      canvas.remove();
    };
  }, [rows, intensity, opacity, dots]);

  return <div ref={boxRef} className="wave-canvas" aria-hidden="true" />;
}