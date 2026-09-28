# 247 Labs Clone — MERN Stack

A MongoDB / Express / React / Node rebuild of the site clone. The contact form on the
page posts real submissions ("leads") to a MongoDB collection through an Express API.
Design and copy match the earlier static clone — swap content later without touching layout.

## Project layout

```
247labs-mern/
├── server/     Express API + MongoDB (Mongoose)
│   └── src/
│       ├── index.js        app entry point
│       ├── db.js           Mongo connection
│       ├── models/Lead.js  contact-form submission schema
│       └── routes/leads.js POST /api/leads, GET /api/leads
└── client/     React app (Vite)
    └── src/
        ├── App.jsx
        └── components/     Navbar, Hero, Contact, Discover, Footer
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance. Easiest options:
  - Install locally and run `mongod` (default URI `mongodb://127.0.0.1:27017`), or
  - Use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and paste its
    connection string into `server/.env`.

## 1. Start the backend

```bash
cd server
npm install
cp .env.example .env
# edit .env if your MongoDB URI or port differ from the defaults
npm run dev
```

This starts the API on **http://localhost:5000**. Check it's alive at
`http://localhost:5000/api/health`.

## 2. Start the frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

This starts the site on **http://localhost:5173**. The Vite dev server proxies any
`/api/*` request to the Express server, so the contact form works out of the box.

## How the contact form works

Submitting the "Schedule A Free Consultation" form sends a `POST /api/leads` request
with `{ fullName, company, email, phone, message }`. The server validates the required
fields (full name, email, message), saves the lead in MongoDB, and returns `{ ok: true }`.
The form shows a success or error message in place of the old placeholder alert.

To see the leads that have been captured, visit `http://localhost:5000/api/leads`
(this route has no login on it yet — see below).

## Changing content later

All page copy lives in the JSX files under `client/src/components/` (plain strings/JSX,
no CMS yet), and the styling lives entirely in `client/src/index.css`. Edit copy freely —
the design/layout won't move as long as you keep the same class names.

## Next steps you may want before going live

- **Auth on `GET /api/leads`**: right now anyone who can reach the server can read
  submitted leads. Add an API key or login before deploying this publicly.
- **Rate limiting / spam protection** on the POST endpoint (the checkbox on the form is
  currently decorative, not a real CAPTCHA).
- **Production build**: `npm run build` in `client/` outputs static files in
  `client/dist/` that Express can serve, or that you can deploy to any static host.
- **Environment variables in production**: set `MONGODB_URI`, `PORT`, and `CLIENT_ORIGIN`
  on whatever host you deploy the server to.
