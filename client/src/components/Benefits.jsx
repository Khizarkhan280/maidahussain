const BENEFITS = [
  "Client oriented",
  "Independent",
  "Competent",
  "Result-driven",
  "Problem-solving",
  "Transparent",
];

const STEPS = [
  "We schedule a call at your convenience",
  "We do a discovery and consulting meeting",
  "We prepare a proposal aligned to your brief",
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="wrap benefits-grid">
        {/* ---------- left: benefits ---------- */}
        <div className="benefits-col">
          <div className="sec-eyebrow">Why teams choose us</div>
          <h2>Your benefits</h2>
          <ul className="benefit-list">
            {BENEFITS.map((b) => (
              <li key={b}>
                <span className="bcheck">
                  <CheckIcon />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- right: process ---------- */}
        <div className="process-col">
          <div className="sec-eyebrow">The process</div>
          <h2>What happens next?</h2>
          <ol className="process-list">
            {STEPS.map((step, i) => (
              <li key={step}>
                <span className="pnum">{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}