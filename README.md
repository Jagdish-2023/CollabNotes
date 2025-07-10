# MusicMart

A real-time collaborative note-taking app where users can create note documents, and changes appear live across open clients.

## Live demo
[Run](https://collabnotes-ten.vercel.app)

---
## Recording
[View](https://drive.google.com/file/d/15ASOECwbZ6b2EA_8hqHouXVcVN54qIrf/view?usp=sharing)

---



## Quick Start
```
git clone https://github.com/Jagdish-2023/CollabNotes.git
cd collabnotes
npm install
npm run dev
```

## Technologies
- React, react-router
- Bootstrap
- MongoDB,Mongoose
- Node.js, Express.js

## Features
**Dashboard**
- Option to create a new Note
- See a list of all notes (fetched from DB).
- Bootstrap-based card layout

**Note Editor**
- Real-time editing via WebSocket
- Live updates across all connected clients
- Auto-save to database every 5 seconds
- Shows "Last Updated" timestamp



## API Reference
- POST/notes - Add a new Note.
- GET/notes/:noteId - Fetch Specific Note details.
- PUT/notes/:noteId - Make changes to an existing Note.
- GET/notes - List of all Notes saved in DB


