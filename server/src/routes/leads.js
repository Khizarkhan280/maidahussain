import { Router } from "express";
import Lead from "../models/Lead.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/leads  -> create a new lead from the contact form
router.post("/", async (req, res) => {
  try {
    const { fullName, company, email, phone, message } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: "Full name is required." });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "A valid company email is required." });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const lead = await Lead.create({
      fullName: fullName.trim(),
      company: (company || "").trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      message: message.trim(),
    });

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
