import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create compound index for unique bookmarks per session
BookmarkSchema.index({ projectId: 1, sessionId: 1 }, { unique: true });

export const Bookmark = mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);
