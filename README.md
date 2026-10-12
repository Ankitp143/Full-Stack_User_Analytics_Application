# User Analytics Application

A lightweight, full-stack user interaction tracking and analytics application built with **Node.js**, **Express**, **MongoDB**, and **React**.

---

## 📌 Tech Stack

- **Client-Side Tracking:** Vanilla JavaScript (IIFE, DOM Event Listeners, Fetch API, `localStorage` & Cookie fallback)
- **Backend:** Node.js, Express.js (MVC Architecture)
- **Database:** MongoDB, Mongoose
- **Frontend Dashboard:** React.js (Vite), Modular Components, Pure CSS (Flexbox & CSS Grid)

---

## 📂 Project Structure (MVC Pattern)

```
UserAnalyticsApplication/
├── server/                          # Backend (Node.js & Express)
│   ├── config/
│   │   └── db.js                    # Database connection module
│   ├── models/
│   │   └── eventModel.js            # Mongoose schema for user events
│   ├── controllers/
│   │   └── eventController.js       # Business logic (event storage, aggregation)
│   ├── routes/
│   │   └── eventRoutes.js           # REST API routes
│   ├── server.js                    # Express application entrypoint
│   └── package.json
│
├── tracker/                         # Event Tracker & Demo Page
│   ├── tracker.js                   # Lightweight (<60 lines) tracking snippet
│   └── index.html                   # Interactive demo page to generate events
│
├── dashboard/                       # Frontend Analytics Dashboard (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          # Dashboard navigation sidebar
│   │   │   ├── SessionsView.jsx     # Session list & User Journey timeline
│   │   │   └── HeatmapView.jsx      # Visual click coordinate heatmap
│   │   ├── services/
│   │   └── api.js               # Centralized API service functions
│   │   ├── App.jsx                  # Main dashboard coordinator
│   │   ├── App.css                  # Clean, responsive layout styling
│   │   └── main.jsx
│   └── package.json
│
├── start-backend.bat                # 1-click startup script for backend
├── start-dashboard.bat              # 1-click startup script for dashboard
├── .gitignore
└── README.md
```

---

## 🚀 Local Setup Steps

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd UserAnalyticsApplication
```

### 2. Set Up the Backend
```bash
cd server
npm install
node server.js
```
*The backend server will run on `http://localhost:5000`.*

### 3. Set Up the Frontend Dashboard
In a new terminal window:
```bash
cd dashboard
npm install
npm run dev
```
*The dashboard will run on `http://localhost:5173`.*

### 4. Test Event Tracking
1. Open the demo webpage in your browser:  
   👉 **`http://localhost:5000/tracker/index.html`**
2. Click anywhere on the page, interact with buttons, or generate a new session.
3. Open the React Dashboard:  
   👉 **`http://localhost:5173`**
   - **Sessions View:** View all sessions and click on any session to see the chronological **User Journey** timeline.
   - **Heatmap View:** Select the page URL from the dropdown to visually view click coordinates as heat dots over the simulated canvas.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/events` | Receives client interaction payload (`page_view` or `click`) and saves to MongoDB |
| `GET` | `/api/sessions` | Aggregates and returns all unique sessions with their total event counts |
| `GET` | `/api/sessions/:sessionId` | Returns chronologically ordered event timeline for a session (**User Journey**) |
| `GET` | `/api/heatmap?pageUrl=...` | Returns all click coordinates `(x, y)` for a given page URL |
| `GET` | `/api/pages` | Returns distinct tracked page URLs for the heatmap filter |

---

## ⚖️ Architectural Decisions & Trade-Offs

1. **Lightweight Vanilla JS Script vs. Third-Party Analytics SDKs**:
   - *Decision:* Built a pure ~50-line tracking script without external libraries.
   - *Trade-off:* Eliminates bundle bloat and ensures fast load times on target pages, while keeping tracking focused specifically on required interactions (`page_view` and `click`).

2. **Absolute Coordinates vs. Responsive Relative Percentages**:
   - *Decision:* Stored page-level coordinates `(x, y)` using `e.pageX` and `e.pageY`.
   - *Trade-off:* Ideal for straightforward coordinate plotting on standard desktop layouts. For multi-device responsiveness across dynamic viewports, relative coordinates (`(x / viewportWidth) * 100`) could be added in a production expansion.

3. **Event-Driven Write Ingestion vs. In-Memory Queue (Redis/Kafka)**:
   - *Decision:* Directly persisted incoming events to MongoDB using Mongoose.
   - *Trade-off:* Kept architecture simple and lightweight without additional infrastructure overhead. For high-throughput production workloads (millions of requests/sec), an ingestion buffer (Redis queue or Kafka) would be recommended before database persistence.

4. **Component State vs. Heavy Global State (Redux/Zustand)**:
   - *Decision:* Standard React hooks (`useState`, `useEffect`) and a dedicated `services/api.js` layer.
   - *Trade-off:* Zero unnecessary boilerplate, easy to maintain, and completely sufficient for a two-view analytics application.
