import { useState } from "react";

const EMPTY_FORM = { fullName: "", company: "", email: "", phone: "", message: "" };

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" });

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

      // The body may be empty or not JSON (for example when the dev proxy can't reach the server)
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* ignore */
      }

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus({ state: "success", message: "Thanks — we'll be in touch shortly." });
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err instanceof TypeError
            ? "We couldn't reach the server. Please check your connection and try again."
            : err.message,
      });
    }
  };

  return (
    <section className="contact-banner" id="contact">
      <div className="contact-grid">
        <div className="contact-left">
          <div className="contact-eyebrow">CONTACT 247 LABS</div>
          <h2>Let's build something great together.</h2>
          <p>
            Whether you have questions about our services, need assistance, or simply want to explore
            potential collaborations, we're here to listen and provide the support you need.
          </p>

          <a className="contact-card" href="tel:+92 300 1234567">
            <span className="icon-box">
              <PhoneIcon />
            </span>
            <span className="info">
              <span className="lbl">CALL US AT</span>
              <span className="val">+92 300 1234567</span>
            </span>
          </a>

          <a className="contact-card" href="mailto:hello@247labs.com">
            <span className="icon-box">
              <MailIcon />
            </span>
            <span className="info">
              <span className="lbl">EMAIL US</span>
              <span className="val">hello@247labs.com</span>
            </span>
          </a>
        </div>

        {/* ---- form card ---- */}
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