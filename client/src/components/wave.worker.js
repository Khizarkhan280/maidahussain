import { createWave } from "./waveEngine";

let wave = null;

self.onmessage = (e) => {
  const m = e.data;
  switch (m.type) {
    case "init":
      wave = createWave(m.canvas, m.options);
      wave.resize(m.w, m.h, m.dpr);
      m.still ? wave.renderOnce() : wave.start();
      break;
    case "resize":
      wave?.resize(m.w, m.h, m.dpr);
      if (m.still) wave?.renderOnce();
      break;
    case "mouse":
      wave?.setMouse(m.x, m.y);
      break;
    case "visible":
      wave?.setVisible(m.v);
      break;
    case "stop":
      wave?.stop();
      break;
  }
};