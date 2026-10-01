const LOCATIONS = [
  {
    country: "Canada",
    city: "Toronto, Ontario",
    lines: ["600 – 170 University Ave,", "Toronto, Ontario M5H 3B3"],
  },
  {
    country: "Canada",
    city: "Richmond Hill, Ontario",
    lines: ["95 Mural St.,", "Richmond Hill, Ontario L4B 3G2"],
  },
  {
    country: "United States",
    city: "The Woodlands, Texas",
    lines: ["8708 Technology Forest Pl,", "The Woodlands, TX 77381"],
  },
  {
    country: "United States",
    city: "Raleigh, North Carolina",
    lines: ["4801 Glenwood Ave,", "Raleigh, NC 27612"],
  },
];

export default function Locations() {
  return (
    <section className="locations">
      <div className="wrap">
        <div className="locations-head">
          <div className="sec-eyebrow">Our locations</div>
          <h2>Where to find us</h2>
          <p>
            We're happy to answer any questions you may have and help you determine which of our services best fits
            your needs.
          </p>
        </div>

        <div className="locations-grid">
          {LOCATIONS.map((loc) => (
            <article className="loc-card" key={loc.city}>
              <span className="loc-tag">{loc.country}</span>
              <h3>{loc.city}</h3>
              <address>
                {loc.lines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}