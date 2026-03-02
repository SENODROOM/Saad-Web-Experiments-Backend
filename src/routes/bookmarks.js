import express from 'express';
import { Bookmark } from '../models/Bookmark.js';

const router = express.Router();

// GET - Fetch bookmarks for a session
router.get('/', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'anonymous';
    const bookmarks = await Bookmark.find({ sessionId }).sort({ createdAt: -1 });
    res.json({ bookmarks });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// POST - Create a bookmark
router.post('/', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'anonymous';
    const { projectId, projectTitle } = req.body;

    if (!projectId || !projectTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if bookmark already exists
    const existing = await Bookmark.findOne({ projectId, sessionId });
    if (existing) {
      return res.json({ message: 'Bookmark already exists', bookmark: existing });
    }

    const bookmark = await Bookmark.create({
      projectId,
      projectTitle,
      sessionId,
    });

    res.status(201).json({ bookmark });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
});

// DELETE - Remove a bookmark
router.delete('/', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'anonymous';
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ error: 'Missing projectId' });
    }

    await Bookmark.deleteOne({ projectId, sessionId });
    res.json({ message: 'Bookmark deleted' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

export default router;
