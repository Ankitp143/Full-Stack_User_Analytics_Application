const Event = require('../models/eventModel');

// @desc    Receive and save a user interaction event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const { session_id, sessionId, event_type, eventType, page_url, pageUrl, timestamp, x, y } = req.body;

    const finalSessionId = session_id || sessionId;
    const finalEventType = event_type || eventType;
    const finalPageUrl = page_url || pageUrl;

    if (!finalSessionId || !finalEventType || !finalPageUrl) {
      return res.status(400).json({ message: 'session_id, event_type, and page_url are required' });
    }

    const event = new Event({
      sessionId: finalSessionId,
      eventType: finalEventType,
      pageUrl: finalPageUrl,
      timestamp: timestamp || new Date(),
      coordinates: {
        x: finalEventType === 'click' ? (x ?? null) : null,
        y: finalEventType === 'click' ? (y ?? null) : null
      }
    });

    const savedEvent = await event.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unique sessions with event counts
// @route   GET /api/sessions
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: '$sessionId',
          totalEvents: { $sum: 1 },
          firstSeen: { $min: '$timestamp' },
          lastSeen: { $max: '$timestamp' }
        }
      },
      {
        $project: {
          sessionId: '$_id',
          _id: 0,
          totalEvents: 1,
          firstSeen: 1,
          lastSeen: 1
        }
      },
      { $sort: { lastSeen: -1 } }
    ]);

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events for a specific session (user journey)
// @route   GET /api/sessions/:sessionId
exports.getSessionEvents = async (req, res) => {
  try {
    const events = await Event.find({ sessionId: req.params.sessionId }).sort({ timestamp: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get click coordinates for heatmap
// @route   GET /api/heatmap
exports.getHeatmap = async (req, res) => {
  try {
    const { pageUrl } = req.query;
    const filter = { eventType: 'click' };

    if (pageUrl) {
      filter.pageUrl = pageUrl;
    }

    const clicks = await Event.find(filter).select('sessionId pageUrl timestamp coordinates').sort({ timestamp: -1 });

    const formattedClicks = clicks.map(c => ({
      _id: c._id,
      sessionId: c.sessionId,
      pageUrl: c.pageUrl,
      timestamp: c.timestamp,
      x: c.coordinates?.x,
      y: c.coordinates?.y
    }));

    res.json(formattedClicks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get distinct page URLs for dropdown
// @route   GET /api/pages
exports.getPages = async (req, res) => {
  try {
    const pages = await Event.distinct('pageUrl');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
