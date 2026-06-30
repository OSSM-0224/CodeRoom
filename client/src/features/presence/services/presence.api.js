import { socket } from "../../../app/socket";


export const joinRoom = (roomId, userId) => {
    socket.emit("room:join", { roomId, userId });
};

export const leaveRoom = (roomId, userId) => {
    socket.emit("room:leave", { roomId, userId });
};

export const startTyping = (roomId, userId) => {
    socket.emit("USER_TYPING", { roomId, userId });
};

export const stopTyping = (roomId, userId) => {
    socket.emit("USER_STOPPED_TYPING", { roomId, userId });
};