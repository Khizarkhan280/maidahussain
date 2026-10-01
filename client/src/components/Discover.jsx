export default function Discover() {
  return (
    <section className="discover">
      {/* ---------- dark blue top band: heading + search ---------- */}
      <div className="discover-top">
        <div className="wrap">
          <h2>Discover. Learn. Enjoy</h2>
          <p className="sub">platform for creatives around the world</p>
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input type="text" placeholder="Design, Code, Marketing, Finance ..." />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      {/* ---------- cards (overlap the band / mint area) ---------- */}
      <div className="wrap">
        <div className="topic-cards">
          {/* Web Design card */}
          <div className="tcard web">
            <span className="badge">14</span>
            <h3>Web Design</h3>
            <p>
              When you search for free CSS templates, you will notice that TemplateMo is one of the best
              websites.
            </p>

            <div className="web-art">
              <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* soft background blob */}
                <circle cx="150" cy="74" r="44" fill="#eef0f5" />

                {/* browser header: dots, line, menu */}
                <g fill="#23262f">
                  <circle cx="66" cy="9" r="2.4" />
                  <circle cx="74" cy="9" r="2.4" />
                  <circle cx="82" cy="9" r="2.4" />
                </g>
                <path d="M184 6h10M184 10h10" stroke="#23262f" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M58 17h138" stroke="#cfd4de" strokeWidth="1.2" />

                {/* laptop */}
                <rect x="40" y="48" width="84" height="48" rx="5" fill="#fff" stroke="#23262f" strokeWidth="1.6" />
                <path d="M52 104h64" stroke="#12a4ec" strokeWidth="4" strokeLinecap="round" />
                <circle cx="82" cy="74" r="7" fill="#12a4ec" />
                <path d="M68 96c1-9 7-13 14-13s13 4 14 13z" fill="#23262f" />

                {/* small tablet with character */}
                <rect x="140" y="60" width="40" height="30" rx="4" fill="#fff" stroke="#23262f" strokeWidth="1.6" />
                <circle cx="160" cy="72" r="6" fill="#23262f" />
                <path d="M153.5 72a6.5 6.5 0 0 1 13 0" fill="none" stroke="#12a4ec" strokeWidth="2" strokeLinecap="round" />
                <path d="M184 62h26" stroke="#12a4ec" strokeWidth="3" strokeLinecap="round" />
                <circle cx="148" cy="96" r="2.5" fill="#23262f" />
                <circle cx="172" cy="96" r="2.5" fill="#23262f" />

                {/* avatar */}
                <circle cx="150" cy="118" r="9" fill="#fff" stroke="#23262f" strokeWidth="1.6" />
                <circle cx="150" cy="115" r="3" fill="#23262f" />
                <path d="M143.5 124c.8-4 3.4-5.5 6.5-5.5s5.7 1.5 6.5 5.5z" fill="#23262f" />
              </svg>
            </div>
          </div>

          {/* Finance card */}
          <div className="tcard finance">
            <span className="badge">25</span>
            <h3>Finance</h3>
            <p>
              Topic Listing Template includes homepage, listing page, detail page, and contact page. You can
              feel free to edit and adapt for your CMS requirements.
            </p>
            <a className="learn" href="#">
              Learn More
            </a>

            <div className="finance-foot">
              <div className="share">
                <span className="share-label">Share:</span>
                <span className="socials">
                  <a href="#" aria-label="Twitter">
                    <svg viewBox="0 0 24 24">
                      <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2 7.9 7.9 0 0 1-2.5 1 4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3 4 4 0 0 1-1.8-.5v.05a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.07 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.5a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5A8 8 0 0 0 22 5.9z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Facebook">
                    <svg viewBox="0 0 24 24">
                      <path d="M13.5 24V13h3.5l.5-4h-4V6.5c0-1.15.32-1.94 1.98-1.94h2.12V1.08C17.26 1.03 16 1 14.5 1 11.4 1 9.5 2.9 9.5 6.1V9h-3.5v4h3.5v11h4z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Pinterest">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.06-.93-.12-2.36.02-3.38.13-.9.85-5.78.85-5.78s-.22-.44-.22-1.08c0-1 .59-1.76 1.31-1.76.62 0 .92.46.92 1.02 0 .62-.4 1.55-.6 2.4-.17.72.36 1.3 1.07 1.3 1.28 0 2.27-1.35 2.27-3.3 0-1.72-1.24-2.93-3-2.93-2.05 0-3.25 1.53-3.25 3.12 0 .62.24 1.28.53 1.64a.21.21 0 0 1 .05.2c-.06.24-.19.72-.21.82-.03.14-.11.17-.25.1-.94-.44-1.53-1.8-1.53-2.9 0-2.36 1.72-4.53 4.95-4.53 2.6 0 4.62 1.85 4.62 4.33 0 2.58-1.63 4.66-3.89 4.66-.76 0-1.47-.4-1.72-.86l-.47 1.78c-.17.65-.63 1.47-.94 1.97A12 12 0 1 0 12 0z" />
                    </svg>
                  </a>
                </span>
              </div>

              <span className="bookmark" aria-label="Bookmark">
                <svg viewBox="0 0 24 24">
                  <path d="M6 3h12v18l-6-4-6 4V3z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}