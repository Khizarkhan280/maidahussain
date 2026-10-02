const CYAN = "#3ad7e8";
const MINT = "#35e4b6";

export function createWave(
  canvas,
  { rows = 0, intensity = 0.85, opacity = 0.55, dots = 2 }
) {
  const ctx = canvas.getContext("2d");
  const SEG = 48;
  const FRAME = 1000 / 30;

  // travelling dots
  const DOT_ROW_STEP = 3; // a dot row every 3rd line (smaller = more rows)

  let w = 0, h = 0, grad = null, fade = null;
  let visible = true, running = false;
  let raf = 0, last = 0, lastDraw = 0, time = 0;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  const resize = (width, height, dpr) => {
    w = width;
    h = height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // line color: cyan -> mint -> cyan, left to right
    grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, CYAN);
    grad.addColorStop(0.5, MINT);
    grad.addColorStop(1, CYAN);

    // soft fade at the top and bottom edges
    fade = ctx.createLinearGradient(0, 0, 0, h);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(0.1, "#000");
    fade.addColorStop(0.9, "#000");
    fade.addColorStop(1, "rgba(0,0,0,0)");
  };

  // d: 0 = far (top), 1 = near (bottom)
  const point = (u, d, t) => {
    const ph = d * 5.2;
    const wave =
      Math.sin(u * 2.2 + t * 0.55 + ph) * 0.6 +
      Math.sin(u * 4.1 - t * 0.8 + ph * 1.7) * 0.3 +
      Math.sin(u * 7.3 + t * 1.25 + ph * 2.3) * 0.1;

    const horizon = -h * 0.06 + mouse.y * 18; // starts above the top edge
    const base = horizon + (h * 1.14 - horizon) * Math.pow(d, 1.25); // ends below the bottom edge
    const amp = (14 + 78 * d) * intensity;
    const spread = 1.1 + d * 0.9;

    return [w / 2 + u * (w / 2) * spread + mouse.x * d * 40, base - amp * wave];
  };

  const render = (t) => {
    if (!w || !h) return;

    // auto row count: roughly one line per 46px of section height
    const n = rows || Math.max(12, Math.min(32, Math.round(h / 46)));

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.lineJoin = "round";
    ctx.strokeStyle = grad;

    // wave lines
    for (let r = 0; r < n; r++) {
      const d = r / (n - 1);
      const near = Math.pow(d, 1.4);

      ctx.beginPath();
      for (let i = 0; i <= SEG; i++) {
        const [x, y] = point((i / SEG) * 2 - 1, d, t);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.globalAlpha = (0.07 + 0.23 * near) * opacity;
      ctx.lineWidth = 0.6 + 0.9 * d;
      ctx.stroke();
    }

    // travelling dots
    for (let r = 2; r < n; r += DOT_ROW_STEP) {
      const d = r / (n - 1);
      const size = 4 + 10 * d;

      for (let k = 0; k < dots; k++) {
        // k / dots spreads the dots evenly along the line
        const u = (((t * 0.05 + r * 0.173 + k / dots) % 1) * 2) - 1;
        const [x, y] = point(u, d, t);

        const g = ctx.createRadialGradient(x, y, 0, x, y, size);
        g.addColorStop(0, "rgba(180,255,235,0.55)");
        g.addColorStop(0.4, "rgba(53,228,182,0.18)");
        g.addColorStop(1, "rgba(53,228,182,0)");
        ctx.globalAlpha = (0.25 + 0.5 * d) * opacity;
        ctx.fillStyle = g;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
      }
    }

    // apply the edge fade inside the canvas
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  };

  const schedule = (fn) =>
    typeof requestAnimationFrame === "function"
      ? requestAnimationFrame(fn)
      : setTimeout(() => fn(performance.now()), FRAME);

  const unschedule = (id) =>
    typeof cancelAnimationFrame === "function"
      ? cancelAnimationFrame(id)
      : clearTimeout(id);

  const loop = (now) => {
    if (!running) return;
    raf = schedule(loop);
    if (!visible) {
      last = now;
      return;
    }
    if (now - lastDraw < FRAME) return;
    lastDraw = now;

    time += Math.min((now - last) / 1000, 0.05);
    last = now;

    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    render(time);
  };

  return {
    resize,
    renderOnce: () => render(0),
    setMouse: (x, y) => {
      mouse.tx = x;
      mouse.ty = y;
    },
    setVisible: (v) => {
      visible = v;
    },
    start: () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = schedule(loop);
    },
    stop: () => {
      running = false;
      unschedule(raf);
    },
  };
}