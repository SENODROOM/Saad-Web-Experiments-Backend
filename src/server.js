// Load environment variables FIRST before any other imports
import './config/env.js';

import express from 'express';
import cors from 'cors';
import connectDB from './lib/mongodb.js';
import bookmarksRouter from './routes/bookmarks.js';
import analyticsRouter from './routes/analytics.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Saad Web Experiments API',
    version: '1.0.0',
    endpoints: {
      bookmarks: '/api/bookmarks',
      analytics: '/api/analytics',
    },
  });
});

app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/analytics', analyticsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
