const initializeSocket = (io) => {
  console.log("initializeSocket called");

  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);
  });
};

export default initializeSocket;