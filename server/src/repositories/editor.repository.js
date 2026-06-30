import Document from "../models/Document.js";
/**
 * Get the raw (mutable, non-lean) document for a room.
 * We need the live Mongoose document, not a lean object, so the service
 * can mutate content in memory before a single atomic save.
 */
const getMutableDocument = async (roomId) => {
  return Document.findOne({ roomId });
};

/**
 * Atomically persist the result of an applied delta.
 * Uses findOneAndUpdate with $inc on version to avoid lost updates if two
 * deltas are somehow processed in close succession.
 */
const persistAppliedDelta = async (roomId, { content, lastModified }) => {
  return Document.findOneAndUpdate(
    { roomId },
    {
      $set: { content, lastModified },
      $inc: { version: 1 },
    },
    { new: true }
  ).lean();
};

export default {
  getMutableDocument,
  persistAppliedDelta,
};