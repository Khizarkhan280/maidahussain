const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        {/* ---------- LEFT: copy ---------- */}
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="dot"></span>
            Your trusted Pakistani partner for
          </div>
          <h1>
            Custom software, AI, and <span className="hl">digital transformation</span> built for enterprises and
            regulated industries.
          </h1>
          <p>
            247 Labs engineers the software, AI systems, and digital platforms that large organizations depend on to
            modernize operations, unlock data, and move faster with control.
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">
              <span>Start a Strategic Conversation</span> <ArrowIcon />
            </a>
            <a href="#" className="btn-ghost">
              See Enterprise Work
            </a>
          </div>

          {/* ---------- TRUST ROW (under the buttons) ---------- */}
          {/* <div className="hero-trust">
            <div className="hero-trust-inner">
              <span className="trust-item">ISO 9001</span>
              <span className="trust-item">ISO 27001</span>
              <a href="#" className="trust-item trust-link">
                Google 4.8 <span className="stars">★★★★★</span>
              </a>
              <a href="#" className="trust-item trust-link">
                Clutch 4.7 <span className="stars">★★★★★</span>
              </a>
            </div>
          </div> */}
        </div>

        {/* ---------- RIGHT: clean image, no overlays ---------- */}
        <div className="hero-visual">
          <div className="hv-photo"></div>
        </div>
      </div>
    </section>
  );
}