import {
  createRoomService,
  joinRoomService,
} from "../services/room.service.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createDocument } from "../repositories/document.repository.js";

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

    const room = await createRoom({ name, hostname });


    const document = await createDocument(room._id);

    if (!document) {
        throw new ApiError(500, "Document not created");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            "Room created successfully",
            room
        )
    );

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

    const { roomCode, username, socketId } = req.body;

  // Call Service Layer
  const room = await joinRoomService({
    roomCode,
    username,
  });

    const room = await joinRoom({ roomCode, username, socketId });


    return res.status(200).json(
        new ApiResponse(200, "Room joined successfully", room)
    );

});
