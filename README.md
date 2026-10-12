# User Analytics Application

A full-stack user interaction analytics application built with Node.js, Express, MongoDB, and React.

Tracks user interactions (`page_view` and `click` with coordinates) from a webpage and displays them in a dashboard.

---

## Tech Stack
- **Frontend:** React, Pure CSS
- **Backend:** Node.js, Express (MVC architecture)
- **Database:** MongoDB (Mongoose)
- **Tracking:** Vanilla JavaScript

---

## Project Structure
```
UserAnalyticsApplication/
├── server/
│   ├── config/db.js                   # Database connection
│   ├── models/eventModel.js           # Event schema
│   ├── controllers/eventController.js # Event & session logic
│   ├── routes/eventRoutes.js          # API routes
│   └── server.js                      # Server entry point
├── tracker/
│   ├── tracker.js                     # Tracking script
│   └── index.html                     # Demo testing page
├── dashboard/                         # React dashboard
└── README.md
```

---

## Setup & Running

### 1. Start MongoDB
Ensure MongoDB is running locally:
```bash
mongod
```

### 2. Start Application
```bash
cd server
npm install
node server.js
```

### 3. Open Application
- **Dashboard:** `http://localhost:5000`
- **Demo Page:** `http://localhost:5000/demo`

---

## API Endpoints
- `POST /api/events` — Ingests event data (`page_view` or `click`)
- `GET /api/sessions` — Returns list of all sessions with event counts
- `GET /api/sessions/:sessionId` — Returns chronological events for a session (User Journey)
- `GET /api/heatmap` — Returns click coordinates for a given page URL

---

## Trade-offs & Implementation Notes
- **Lightweight Tracker:** Used a small vanilla JavaScript script with native `fetch` and `localStorage` (with cookie fallback) to keep page load impact minimal.
- **Direct Database Writes:** Persisted incoming events directly to MongoDB for simplicity and quick querying.
- **Pure CSS Layout:** Built UI with standard CSS Grid and Flexbox instead of adding heavy external UI libraries.
