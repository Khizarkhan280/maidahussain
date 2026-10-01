import { Router } from "express";
import Lead from "../models/Lead.js";
import { sendLeadNotification } from "../mailer.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only accept real strings; anything else (numbers, objects, arrays) becomes "" and fails validation with a 400
const clean = (v) => (typeof v === "string" ? v.trim() : "");

// POST /api/leads  -> create a new lead from the contact form
router.post("/", async (req, res) => {
  try {
    const body = req.body || {};
    const fullName = clean(body.fullName);
    const company = clean(body.company);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const message = clean(body.message);

    if (!fullName) {
      return res.status(400).json({ error: "Full name is required." });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "A valid company email is required." });
    }
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }
    if (fullName.length > 120 || company.length > 160 || email.length > 254 || phone.length > 40 || message.length > 5000) {
      return res.status(400).json({ error: "One of the fields is too long." });
    }

    const lead = await Lead.create({ fullName, company, email, phone, message });

    // Fire-and-forget: a mail failure must never lose the lead or fail the request
    sendLeadNotification(lead).catch((err) =>
    console.error("Lead notification email failed:", err.message)
    );

    res.status(201).json({ ok: true, id: lead._id });
    } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/leads -> list submitted leads, newest first
// NOTE: this has no auth guard yet — add one before exposing it outside your own machine.
router.get("/", async (_req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;