import http from "http";
import app from "./app.js";
import env from "./config/env.config.js";
import connectMongoDB from "./database/mongodb.js";
import initializeSocket from "./socket/index.js";
import { Server } from "socket.io";

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const startServer = async () => {
  try {
    await connectMongoDB();
    server.listen(env.PORT, () => {
      console.log(`Server running on ${env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};
initializeSocket();
startServer();
