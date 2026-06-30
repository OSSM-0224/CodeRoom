import { io } from "../server.js";
import registerEditorSocketHandlers from "./editor.socket.js";

const initializeSocket = () => {
  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);
    registerEditorSocketHandlers(io, socket);
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
};

export default initializeSocket;
