# User Analytics Application

A simple full-stack user analytics app built using Node.js, Express, MongoDB, and React.

It tracks user interactions (`page_view` and `click` with coordinates) from a webpage and displays them on a dashboard.

---

## Tech Stack
- **Frontend:** React, Pure CSS
- **Backend:** Node.js, Express (MVC pattern)
- **Database:** MongoDB (Mongoose)
- **Tracking:** Vanilla JavaScript

---

## Project Structure
```
UserAnalyticsApplication/
├── server/
│   ├── config/db.js              # Database connection
│   ├── models/eventModel.js      # Event schema
│   ├── controllers/eventController.js # Event & session logic
│   ├── routes/eventRoutes.js     # API routes
│   └── server.js                 # App entry point
├── tracker/
│   ├── tracker.js                # Tracking script
│   └── index.html                # Demo testing page
├── dashboard/                    # React dashboard
└── README.md
```

---

## How to Run Locally

### 1. Make sure MongoDB is running
```bash
mongod
```

### 2. Install & Start Server
```bash
cd server
npm install
node server.js
```

### 3. Open in Browser
Everything runs on **one single URL**:

👉 **`http://localhost:5000`** — Opens the React Analytics Dashboard  
👉 **`http://localhost:5000/demo`** — Opens the Demo webpage to test tracking clicks and views

---

## API Endpoints
- `POST /api/events` — Save event (`page_view` or `click`)
- `GET /api/sessions` — List all sessions with event counts
- `GET /api/sessions/:sessionId` — Get ordered events for a session (User Journey)
- `GET /api/heatmap` — Get click coordinates for heatmap

---

## Notes & Trade-offs
- **Vanilla JS Tracker:** Used a simple ~50 lines JavaScript script without external libraries for minimal footprint.
- **Single URL:** The backend serves the built React dashboard, the demo test page, and the API from one single port (`5000`) so you don't need multiple terminal windows or different ports.
- **Direct Database Writes:** Saved events directly to MongoDB for simplicity without needing extra queue tools like Redis or Kafka.
