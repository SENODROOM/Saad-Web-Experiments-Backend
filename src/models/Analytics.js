import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  event: {
    type: String,
    required: true,
    index: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
