
import { ro } from "zod/v4/locales/index.js";
import roomModel from "../models/Room.js";
import { createRoom, joinRoom } from "../repositories/room.repository.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createDocument } from "../repositories/document.repository.js";


export const roomCreateController = asyncHandler(async (req, res) => {

    const { name, hostname } = req.body;

    if (!name || !hostname)
        throw new ApiError(400, "All fields are required");

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

});


export const roomJoinController = asyncHandler(async (req, res) => {

    const { roomCode, username, socketId } = req.body;

    if (!roomCode || !username) {
        throw new ApiError(400, "All fields are required");
    }

    const room = await joinRoom({ roomCode, username, socketId });


    return res.status(200).json(
        new ApiResponse(200, "Room joined successfully", room)
    );

});