import { useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT } from "../config/contact";

const LogoMark = () => (
  <span className="mark">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="13" r="7" />
      <path d="M12 9v4l2.5 2.5M9 3l3-1 3 1" />
    </svg>
  </span>
);

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">

    <path d="M6 9l6 6 6-6" />
  </svg>
);

const MOBILE_LINKS = [
  { label: "Services", hasChevron: true },
  { label: "Business Challenges", hasChevron: true },
  { label: "Company", hasChevron: true },
  { label: "Industries", hasChevron: true },
  { label: "Resources", hasChevron: true },
  { label: "Apps", hasChevron: true },
  { label: "Case Studies", hasChevron: false },
  { label: "Contact", hasChevron: false, to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="logo" aria-label="Home">
            <img src="https://247labs.com/wp-content/uploads/2023/03/Group-10.png" alt="Logo" />
          </Link>
          <div className="navlinks">
            <a href="#" className="has-chevron">Services</a>
            <a href="#" className="has-chevron">Products</a>
            <a href="#" className="has-chevron">Company</a>
            <a href="#" className="has-chevron">Industries</a>
            <a href="#" className="has-chevron">Resources</a>
            <a href="#">Case Studies</a>
          </div>
          <div className="nav-right">
            <a className="expert-btn" href={`tel:${CONTACT.phoneHref}`}>
              <span className="label">Talk to an Expert</span>
              <span className="num">{CONTACT.phone}</span>
            </a>
            <Link to="/contact" className="btn-solid">
              Contact Us
            </Link>
            <button className="burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mm-top">
          <Link to="/" className="logo" onClick={closeMenu}>
            <LogoMark />
            247 Labs
          </Link>
          <a className="mm-expert" href={`tel:${CONTACT.phoneHref}`}>
            <span className="label">Talk to an Expert →</span>
            <span className="num">{CONTACT.phone}</span>
          </a>
          <Link to="/contact" className="btn-solid" style={{ padding: "11px 16px" }} onClick={closeMenu}>
            Contact Us
          </Link>
          <button className="mm-close" aria-label="Close menu" onClick={closeMenu}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>
        </div>
        <div className="mm-links">
          {MOBILE_LINKS.map((link) =>
            link.to ? (
              <Link to={link.to} key={link.label} onClick={closeMenu}>
                {link.label} {link.hasChevron && <Chevron />}
              </Link>
            ) : (
              <a href="#" key={link.label}>
                {link.label} {link.hasChevron && <Chevron />}
              </a>
            )
          )}
        </div>
      </div>
    </>
  );
}