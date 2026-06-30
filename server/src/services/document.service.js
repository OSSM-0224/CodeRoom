import documentRepository from "../repositories/document.repository.js";
import ApiError from "../utils/ApiError.js";
/**
 * Create a document for a freshly created room.
 * Called by Domain A's room creation flow (room.service.js) via a single
 * import of this function — Domain A does not touch document internals.
 */
const createDocumentForRoom = async (roomId, language) => {
  const existing = await documentRepository.findByRoomId(roomId);
  if (existing) {
    // Idempotent: if a document already exists for this room, just return it
    // instead of throwing, so retries / re-entrant calls are safe.
    return existing;
  }
  return documentRepository.createDocument({ roomId, language });
};

/**
 * Get the latest document for a room (used when a user joins).
 */
const getDocumentByRoomId = async (roomId) => {
  const document = await documentRepository.findByRoomId(roomId);
  if (!document) {
    throw new ApiError(404, "Document not found for this room");
  }
  return document;
};

/**
 * Manual update of a document (PATCH endpoint) — e.g. changing language,
 * or a full content overwrite/save from the client toolbar "Save" action.
 * This bypasses delta logic intentionally; it's for explicit full saves only.
 */
const updateDocument = async (roomId, { content, language }) => {
  const document = await documentRepository.findByRoomId(roomId);
  if (!document) {
    throw new ApiError(404, "Document not found for this room");
  }

  const updated = await documentRepository.replaceDocument(roomId, {
    content,
    language,
  });

  return updated;
};

export default {
  createDocumentForRoom,
  getDocumentByRoomId,
  updateDocument,
};
