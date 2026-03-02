# Backend API

Express.js backend for Saad Web Experiments portfolio.

## Features

- MongoDB integration with Mongoose
- RESTful API endpoints
- CORS enabled
- Session-based bookmarks
- Analytics tracking

## Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI

# Start development server
npm run dev
```

## Important: Running the Server

**Always run from the backend directory**:

```bash
cd backend
npm run dev
```

This ensures the `.env` file is loaded correctly.

## API Endpoints

### Bookmarks

- `GET /api/bookmarks` - Get all bookmarks for session
- `POST /api/bookmarks` - Create a bookmark
- `DELETE /api/bookmarks?projectId=xxx` - Delete a bookmark

### Analytics

- `GET /api/analytics` - Get analytics for session
- `POST /api/analytics` - Track an event

## Environment Variables

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

## Development

```bash
# From backend directory
npm run dev    # Start with auto-reload
npm start      # Start production server
```

## Testing

```bash
# Test API is running
curl http://localhost:5000

# Test bookmarks endpoint
curl http://localhost:5000/api/bookmarks
```

## Troubleshooting

### Error: "MONGODB_URI is not defined"

**Solution**: Make sure you're running from the backend directory

```bash
cd backend
npm run dev
```

### Error: "Cannot find module"

**Solution**: Install dependencies

```bash
cd backend
npm install
```

### Error: "Port already in use"

**Solution**: Kill the process or use a different port

```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port
PORT=5001 npm run dev
```

## Project Structure

```
backend/
├── src/
│   ├── models/           # MongoDB models
│   │   ├── Bookmark.js
│   │   └── Analytics.js
│   ├── routes/           # API routes
│   │   ├── bookmarks.js
│   │   └── analytics.js
│   ├── lib/              # Utilities
│   │   └── mongodb.js
│   └── server.js         # Entry point
├── .env                  # Environment variables (gitignored)
├── .env.example          # Environment template
└── package.json
```

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - CORS middleware
- `dotenv` - Environment variables

---

**Ready to start!** Run `npm run dev` from the backend directory.
