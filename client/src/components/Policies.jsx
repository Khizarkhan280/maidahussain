const POLICIES = [
  {
    title: "Terms & Conditions",
    text: "The legal rules and responsibilities governing your use of our website and services.",
    link: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    title: "Privacy Policy",
    text: "How we collect, store, and protect your personal data and privacy.",
    link: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Refund Policy",
    text: "Our rules and timeframes for handling order returns, exchanges, and money-back requests.",
    link: "Refund Policy",
    href: "/refund-policy",
  },
];

export default function Policies() {
  return (
    <section className="policies">
      <div className="policies-grid">
        {POLICIES.map((p) => (
          <article className="policy-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <a className="policy-link" href={p.href}>
              {p.link} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}