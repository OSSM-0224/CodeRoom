// server/src/controllers/document.controller.js

import { z } from "zod";
import documentService from "../services/document.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const updateDocumentSchema = z.object({
  content: z.string().optional(),
  language: z.string().optional(),
});

/**
 * GET /api/document/:roomId
 * Returns the latest persisted document for a room.
 * Called when a user joins a room so their editor can be hydrated.
 */
const getDocument = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) {
    throw new ApiError(400, "roomId is required");
  }

  const document = await documentService.getDocumentByRoomId(roomId);

  return res
    .status(200)
    .json(new ApiResponse(200, document, "Document fetched successfully"));
});

/**
 * PATCH /api/document/:roomId
 * Explicit full save / language change — NOT used for live keystroke sync
 * (that goes through sockets via editor.routes.js / editor.socket.js).
 * Used by the toolbar's "Save" indicator flow and language dropdown.
 */
const updateDocument = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) {
    throw new ApiError(400, "roomId is required");
  }

  const parsed = updateDocumentSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid update payload", parsed.error.errors);
  }

  const updated = await documentService.updateDocument(roomId, parsed.data);

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Document updated successfully"));
});

export default {
  getDocument,
  updateDocument,
};