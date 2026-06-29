# 🚀 CodeRoom

A real-time collaborative code editor built for the **Kodex Mini Hack Sprint**.

---

# 📌 Project Overview

CodeRoom allows multiple users to collaborate inside a shared coding room in real-time.

Features include:

- Create Room
- Join Room
- Live Code Synchronization
- Delta-based Document Updates
- Live Participants
- Typing Indicator
- Host Privileges
- MongoDB Persistence
- Socket.IO Realtime Communication

---

# 🏗️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Socket.IO Client
- Monaco Editor

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Redis
- Zod
- Winston

---

# 📂 Project Structure

```
CodeRoom

client/

server/
```

---

# 👨‍💻 Team Members

| Member | Domain |
|---------|---------|
| Avyaan | Domain A - Room Management |
| Om | Domain B - Document Sync Engine |
| Aryan | Domain C - Realtime & Presence |

---

# ⚡ Features

## Domain A

- Room Creation
- Join Room
- Host Controls
- Username Management
- Reconnect Handling

---

## Domain B

- Monaco Code Editor
- Delta Based Editing
- Conflict Resolution
- Document Persistence
- Version Handling

---

## Domain C

- Socket.IO
- Presence
- Typing Indicator
- Live Participants
- Realtime Updates

---

# 🛠 Installation

## Clone Repository

```bash
git clone https://github.com/OSSM-0224/CodeRoom
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🌐 Environment Variables

Backend

```
PORT= port number   

MONGODB_URI= MongoDb Cluster URL

REDIS_URL= redis URL

CLIENT_URL= Client url
```

Frontend

```
VITE_API_URL=

VITE_SOCKET_URL=
```

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render / Railway

Database

- MongoDB Atlas

Redis

- Redis Cloud

---

# 📜 License

MIT License
