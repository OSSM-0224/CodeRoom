import * as roomRepository from "../repositories/room.repository.js";
import documentService from "./document.service.js";

export const createRoomService = async ({ name, hostname }) => {
  // Create Room
  const room = await roomRepository.createRoom({
    name,
    hostname,
  });
  // Automatically create Document
  await documentService.createDocumentForRoom(room._id);
  return room;
};
export const joinRoomService = async ({ roomCode, username, socketId }) => {
  return await roomRepository.joinRoom({
    roomCode,
    username,
    socketId
  });
};

// services/participant.service.js


export const getParticipants = async (roomId) => {
  return await roomRepository.getParticipantsByRoom(roomId);
};

