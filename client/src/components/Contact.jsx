import { useState } from "react";

const Check = () => (
  <span className="check">
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
      <path d="M4 12l5 5L20 6" />
    </svg>
  </span>
);

const BENEFITS = [
  "Client Oriented",
  "Result-driven",
  "Independent",
  "Problem-solving",
  "Competent",
  "Transparent",
];

const EMPTY_FORM = { fullName: "", company: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus({ state: "success", message: "Thanks — we'll be in touch shortly." });
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <section className="contact-banner" id="contact">
      <div className="contact-top">
        <div className="contact-tag">CONTACT US</div>
      </div>
      <div className="contact-grid">
        <div className="contact-left">
          <h2>Let's build something great together.</h2>
          <p>
            We're happy to answer any questions you may have and help you determine which of our services best
            fits your needs.
          </p>
          <p>
            <b>Call us at</b> <a href="tel:18772477421">1-877-247-7421</a> or email{" "}
            <a href="mailto:hello@247labs.com">hello@247labs.com</a>
          </p>

          <div className="benefits-title">Your Benefits:</div>
          <div className="benefits">
            {BENEFITS.map((b) => (
              <div key={b}>
                <Check />
                {b}
              </div>
            ))}
          </div>

          <div className="steps">
            <div className="step">
              <span className="n">1</span>
              <p>We schedule a call at your convenience</p>
            </div>
            <span className="arrow">›</span>
            <div className="step">
              <span className="n">2</span>
              <p>We do a discovery and consulting meeting</p>
            </div>
            <span className="arrow">›</span>
            <div className="step">
              <span className="n">3</span>
              <p>We prepare a proposal</p>
            </div>
          </div>

          <div className="offices">
            <div>
              ✓ 170 University Ave,
              <br />
              Toronto, Ontario
              <br />
              M5H 3B3
            </div>
            <div>
              ✓ 95 Mural St.
              <br />
              Richmond Hill, Ontario
              <br />
              L4B 3G2
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Schedule A Free Consultation</h3>
          <div className="card-divider">
            <span className="line"></span>
            <span className="tick">✓</span>
            <span className="line"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row accent">
              <label>
                Full Name <span className="req">*</span>
              </label>
              <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label>Company / Organization</label>
              <input type="text" name="company" placeholder="Organization" value={form.company} onChange={handleChange} />
            </div>
            <div className="form-row accent">
              <label>
                Company Email <span className="req">*</span>
              </label>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-row">
              <label>
                Message <span className="req">*</span>
              </label>
              <textarea
                name="message"
                placeholder="To better assist you, please describe how we can help."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fake-captcha">
              <span className="l">
                <input type="checkbox" required />
                I'm not a robot
              </span>
              <span style={{ fontSize: ".7rem", color: "#999" }}>reCAPTCHA</span>
            </div>
            <button className="send-btn" type="submit" disabled={status.state === "loading"}>
              {status.state === "loading" ? "Sending…" : "Send"}
            </button>
            {status.state === "success" && <p className="form-status success">{status.message}</p>}
            {status.state === "error" && <p className="form-status error">{status.message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
