import Document from "../models/Document.js";

/**
 * Document Repository
 * --------------------
 * Repository layer = ONLY layer allowed to run Mongoose queries for Document.
 * Services must never import the Document model directly — they call these
 * functions instead. This keeps persistence logic swappable/testable.
 */

/**
 * Create a new document for a room.
 * Called automatically when a room is created (Domain A triggers this via
 * documentService, never directly).
 */
const createDocument = async ({ roomId, language = "javascript" }) => {
  const document = await Document.create({
    roomId,
    content: "",
    language,
    version: 0,
    lastModified: Date.now(),
  });
  return document;
};

/**
 * Fetch the latest document for a room.
 * Used when a user joins a room and needs the current shared state.
 */
const findByRoomId = async (roomId) => {
  return Document.findOne({ roomId }).lean();
};

/**
 * Fetch the RAW (non-lean) document for a room.
 * Needed internally when we intend to mutate + save it (e.g. applying a delta),
 * since .lean() returns plain objects with no .save() method.
 */
const findRawByRoomId = async (roomId) => {
  return Document.findOne({ roomId });
};

/**
 * Persist new content + bump version/lastModified after a delta is applied.
 * This is the ONLY function that writes document content to MongoDB.
 */
const updateContent = async (roomId, { content, lastModified, version }) => {
  return Document.findOneAndUpdate(
    { roomId },
    {
      $set: {
        content,
        lastModified,
        version,
      },
    },
    { new: true },
  ).lean();
};

/**
 * Replace document content directly (used by PATCH /api/document/:roomId
 * for manual saves / language change / full overwrite scenarios).
 */
const replaceDocument = async (roomId, { content, language }) => {
  const update = { lastModified: Date.now() };
  if (content !== undefined) update.content = content;
  if (language !== undefined) update.language = language;

  return Document.findOneAndUpdate(
    { roomId },
    { $set: update, $inc: { version: 1 } },
    { new: true },
  ).lean();
};

/**
 * Delete a document (cleanup helper, e.g. when a room is destroyed).
 */
const deleteByRoomId = async (roomId) => {
  return Document.deleteOne({ roomId });
};

export default {
  createDocument,
  findByRoomId,
  findRawByRoomId,
  updateContent,
  replaceDocument,
  deleteByRoomId,
};
