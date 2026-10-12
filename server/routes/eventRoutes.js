const express = require('express');
const router = express.Router();
const {
  createEvent,
  getSessions,
  getSessionEvents,
  getHeatmap,
  getPages
} = require('../controllers/eventController');

// 1. Ingest event
router.post('/events', createEvent);

// 2. Fetch all sessions with event counts
router.get('/sessions', getSessions);

// 3. Fetch chronological events for specific session (user journey)
router.get('/sessions/:sessionId', getSessionEvents);

// 4. Fetch click coordinates for heatmap
router.get('/heatmap', getHeatmap);

// Helper for frontend page dropdown
router.get('/pages', getPages);

module.exports = router;
