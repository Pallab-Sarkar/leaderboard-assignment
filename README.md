# Real-Time Leaderboard System

This backend service tracks players scores in real-time and maintains a leaderboard using WebSockets, MongoDB, and Node.js.

## Features

- Real-time player score updates via WebSockets
- Fetch top N players globally or filtered by region/game mode
- Daily score resets with TTL logic
- Optimized indexes for performance
- HTTP endpoints for non-realtime access

## Setup

add .env file:
DB_URL=mongodb://localhost:27017/leaderboard
PORT=3000
NODE_ENV=development

```
npm install
npm run dev
```
