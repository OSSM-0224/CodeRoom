import editorRepository from "../repositories/editor.repository.js";
import documentRepository from "../repositories/document.repository.js";
import ApiError from "../utils/ApiError.js";
import logger from "../logger/logger.js";

const clampPositionToDocument = (position, documentLength) => {
  if (position < 0) return 0;
  if (position > documentLength) return documentLength;
  return position;
};

/**
 * Apply a single delta (insert or delete) to a content string.
 * Pure function — no DB access — easy to unit test.
 */
const applyDeltaToContent = (content, delta) => {
  const { type, position, text, length } = delta;
  const safePosition = clampPositionToDocument(position, content.length);

  if (type === "insert") {
    return content.slice(0, safePosition) + text + content.slice(safePosition);
  }

  if (type === "delete") {
    const deleteLength = length ?? text?.length ?? 0;
    const end = Math.min(safePosition + deleteLength, content.length);
    return content.slice(0, safePosition) + content.slice(end);
  }

  throw new ApiError(400, `Unsupported delta type: ${type}`);
};

const processDeltaBatch = async (deltas) => {
  if (!Array.isArray(deltas) || deltas.length === 0) {
    throw new ApiError(400, "At least one delta is required");
  }

  const { roomId } = deltas[0];
  const document = await editorRepository.getMutableDocument(roomId);
  if (!document) {
    throw new ApiError(404, "Document not found for this room");
  }

  const batchTimestamp = Math.max(...deltas.map((d) => d.timestamp));

  const isLateBatch = batchTimestamp < document.lastModified;
  if (isLateBatch) {
    logger.warn(
      `Late delta batch received for room ${roomId}: batchTimestamp=${batchTimestamp} < doc.lastModified=${document.lastModified}. Applying with position clamping (LWW).`
    );
  }

  let updatedContent = document.content;
  for (const delta of deltas) {
    updatedContent = applyDeltaToContent(updatedContent, delta);
  }
  const newLastModified = Math.max(document.lastModified, batchTimestamp);

  const updatedDocument = await editorRepository.persistAppliedDelta(roomId, {
    content: updatedContent,
    lastModified: newLastModified,
  });

  return {
    roomId,
    deltas,
    version: updatedDocument.version,
    lastModified: updatedDocument.lastModified,
  };
};

/**
 * Convenience wrapper for the common single-delta case (pure insert or
 * pure delete) so callers don't need to wrap a lone delta in an array
 * by hand. Internally just delegates to processDeltaBatch.
 */
const processDelta = async (delta) => {
  const result = await processDeltaBatch([delta]);
  return {
    roomId: result.roomId,
    delta: result.deltas[0],
    version: result.version,
    lastModified: result.lastModified,
  };
};

export default {
  applyDeltaToContent,
  clampPositionToDocument,
  processDelta,
  processDeltaBatch,
};