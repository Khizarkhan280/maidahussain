const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
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
              Start a Strategic Conversation <ArrowIcon />
            </a>
            <a href="#" className="btn-ghost">
              See Enterprise Work
            </a>
          </div>
        </div>

        {/* ---------- RIGHT: image card + floating glass cards ---------- */}
        <div className="hero-visual">
          <div className="hv-photo"></div>

          <div className="hv-badges">
            <span className="pill">
              <ShieldIcon /> ISO 9001
            </span>
            <span className="pill">
              <ShieldIcon /> ISO 27001
            </span>
          </div>

          <div className="hv-card">
            <a href="#" className="rating">
              <strong>4.8</strong>
              <span>
                <b>Google</b>
                <span className="stars">★★★★★</span>
              </span>
            </a>
            <span className="hv-divider"></span>
            <a href="#" className="rating">
              <strong>4.7</strong>
              <span>
                <b>Clutch</b>
                <span className="stars">★★★★★</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}