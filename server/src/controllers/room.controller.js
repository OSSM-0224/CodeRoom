import {
  createRoomService,
  getParticipants,
  joinRoomService,
} from "../services/room.service.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import documentService from "../services/document.service.js";
import roomModel from "../models/Room.js";
import participantModel from "../models/Participant.js";

/**
 * ----------------------------------------
 * Create Room
 * POST /api/room/createRoom
 * ----------------------------------------
 */
export const roomCreateController = asyncHandler(async (req, res) => {
  const { name, hostname } = req.body;

  if (!name || !hostname) {
    throw new ApiError(400, "All fields are required");
  }
  const room = await createRoomService({
    name,
    hostname,
  });

  await documentService.createDocumentForRoom(room._id);


  return res.status(201).json(
    new ApiResponse(
      201,
      "Room created successfully",
      room
    )
  );

});

/**
 * ----------------------------------------
 * Join Room
 * POST /api/room/joinRoom
 * ----------------------------------------
 */
export const roomJoinController = asyncHandler(async (req, res) => {
  const { roomCode, username } = req.body;


  // Call Service Layer
  const room = await joinRoomService({
    roomCode,
    username,
  });



  return res.status(200).json(
    new ApiResponse(200, "Room joined successfully", room)
  );

});


// controllers/participant.controller.js


export const getParticipantsController = asyncHandler(async (req, res) => {

  const { roomId } = req.params;

  const participants = await getParticipants(roomId);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Participants fetched successfully",
      participants
    )
  );
});


export const getRoomController = asyncHandler(async (req, res) => {

  const { roomId } = req.params;

  const room = await roomModel.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Room fetched successfully",
      room
    )
  );

});


export const leaveRoomController = asyncHandler(async (req, res) => {

  console.log(req.body);

  const { username } = req.body;


  const participant = await participantModel.findOneAndDelete({
    username,
  });

  console.log(participant);

  if (!participant) {
    throw new ApiError(404, "Participant not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Left room successfully"
    )
  );
});
