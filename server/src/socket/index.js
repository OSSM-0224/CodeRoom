import { io } from "../server.js";

const initializeSocket = () => {
  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
};

export default initializeSocket;
