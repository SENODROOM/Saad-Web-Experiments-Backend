import express from 'express';
import { Analytics } from '../models/Analytics.js';

const router = express.Router();

// POST - Track an analytics event
router.post('/', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'anonymous';
    const { event, data } = req.body;

    if (!event) {
      return res.status(400).json({ error: 'Missing event name' });
    }

    const analyticsEvent = await Analytics.create({
      sessionId,
      event,
      data: data || {},
    });

    res.status(201).json({ success: true, event: analyticsEvent });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// GET - Fetch analytics for a session
router.get('/', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'anonymous';
    const events = await Analytics.find({ sessionId }).sort({ timestamp: -1 }).limit(100);
    res.json({ events });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
