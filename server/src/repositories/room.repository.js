import participantModel from "../models/Participant.js";
import roomModel from "../models/Room.js";
import ApiError from "../utils/ApiError.js";
import generateRooCode from "../utils/generateRoomCode.js";

export const createRoom = async ({ name, hostname }) => {
  let roomCode;

  do {
    roomCode = generateRooCode();
  } while (await roomModel.findOne({ roomCode }));

  const room = await roomModel.create({
    roomCode,
    roomName: name,
    host: hostname,
  });

  if (!room) throw new ApiError(500, "Failed to create room");

  return room;
};

export const joinRoom = async ({ roomCode, username, socketId }) => {

    const room = await roomModel.findOne({ roomCode });

    if (!room) throw new ApiError(404, "Room not found");

    const existingParticipant = await participantModel.findOne({
        roomId: room._id,
        username,
    });

    if (existingParticipant) throw new ApiError(400, "Room Already exist")

    const participant = await participantModel.create({
        username,
        socketId: "socket-test-123",
        roomId: room._id,
    });

    return {
        room, participant
    }


  return room;
};
