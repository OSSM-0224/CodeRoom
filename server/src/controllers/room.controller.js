import {
  createRoomService,
  joinRoomService,
} from "../services/room.service.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

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

  // Call Service Layer
  const room = await createRoomService({
    name,
    hostname,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, room, "Room created successfully"));
});

/**
 * ----------------------------------------
 * Join Room
 * POST /api/room/joinRoom
 * ----------------------------------------
 */
export const roomJoinController = asyncHandler(async (req, res) => {
  const { roomCode, username } = req.body;

  if (!roomCode || !username) {
    throw new ApiError(400, "All fields are required");
  }

  // Call Service Layer
  const room = await joinRoomService({
    roomCode,
    username,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, room, "Room joined successfully"));
});
