# Music Playlist API (MySQL Version)

Simple Node/Express backend with JWT authentication, CRUD for songs and playlists, validation, and tests.

## Setup
1. Copy `.env.example` → `.env` and fill with your MySQL credentials.
2. Run `npm install`
3. Start with `npm run dev`

## Endpoints
- POST /api/register
- POST /api/login
- GET /api/profile (auth required)
- GET /api/songs
- POST /api/songs
- PUT /api/songs/:id
- DELETE /api/songs/:id
- GET /api/playlists (auth required)
- POST /api/playlists (auth required)
- PUT /api/playlists/:id (auth required)
- PATCH /api/playlists/:id/add-song/:songId (auth required)
- DELETE /api/playlists/:id (auth required)

## Tests
Run with `npm test`

My Code