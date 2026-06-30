socket.on("USER_TYPING", ({ roomId, username }) => {
    socket.to(roomId).emit("USER_TYPING", {
        username,
    });
});

socket.on("USER_STOPPED_TYPING", ({ roomId, username }) => {
    socket.to(roomId).emit("USER_STOPPED_TYPING", {
        username,
    });
});