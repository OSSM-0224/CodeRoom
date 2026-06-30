/**
 * Delta Helpers
 * --------------
 * Pure functions for applying deltas to a content string on the client.
 * Mirrors server/src/services/editor.service.js's apply logic exactly, so
 * local and server state converge on the same result.
 *
 * buildDeltaFromDiff ALWAYS returns an array of deltas (never a single
 * mixed object) so a selection-replace is honestly represented as a
 * delete followed by an insert, instead of smuggling extra fields onto
 * an insert delta. Each individual delta stays minimal — still just
 * {type, position, text, length, timestamp, userId, roomId} — we just
 * may send two of them instead of one.
 */

export const clampPosition = (position, contentLength) => {
  if (position < 0) return 0;
  if (position > contentLength) return contentLength;
  return position;
};

/**
 * Apply a single insert/delete delta to a string and return the new string.
 */
export const applyDelta = (content, delta) => {
  const { type, position, text, length } = delta;
  const safePosition = clampPosition(position, content.length);

  if (type === "insert") {
    return content.slice(0, safePosition) + text + content.slice(safePosition);
  }

  if (type === "delete") {
    const deleteLength = length ?? text?.length ?? 0;
    const end = Math.min(safePosition + deleteLength, content.length);
    return content.slice(0, safePosition) + content.slice(end);
  }

  return content;
};

/**
 * Apply an ORDERED sequence of deltas to a string, one after another.
 * Used both for local optimistic application of a [delete, insert] pair
 * and for applying an incoming remote batch. Applying in order (rather
 * than independently against the original string) is what makes the
 * delete+insert pair behave like a single atomic replace instead of two
 * deltas that could clobber each other if applied out of order.
 */
export const applyDeltaSequence = (content, deltas) => {
  return deltas.reduce((acc, delta) => applyDelta(acc, delta), content);
};

/**
 * Build a MINIMAL ordered array of deltas from a before/after string diff.
 * This is a basic diff — it finds the first point of divergence from the
 * front and back of the strings, which is sufficient for typical single
 * keystroke / paste / backspace / selection-replace operations.
 *
 * Returns:
 *  - []                          if there's no actual change
 *  - [insertDelta]                pure addition
 *  - [deleteDelta]                pure removal
 *  - [deleteDelta, insertDelta]   selection overwrite (replace)
 *
 * Both deltas in a replace pair share the SAME timestamp and the SAME
 * `position` (the delete removes the old selection, then the insert lands
 * at that same now-empty position) — this is what keeps the pair atomic
 * and minimal rather than re-diffing or padding with extra metadata.
 */
export const buildDeltaFromDiff = (
  oldContent,
  newContent,
  { userId, roomId },
) => {
  if (oldContent === newContent) return [];

  let start = 0;
  while (
    start < oldContent.length &&
    start < newContent.length &&
    oldContent[start] === newContent[start]
  ) {
    start++;
  }

  let oldEnd = oldContent.length;
  let newEnd = newContent.length;
  while (
    oldEnd > start &&
    newEnd > start &&
    oldContent[oldEnd - 1] === newContent[newEnd - 1]
  ) {
    oldEnd--;
    newEnd--;
  }

  const removed = oldContent.slice(start, oldEnd);
  const inserted = newContent.slice(start, newEnd);
  const timestamp = Date.now();

  const deltas = [];

  // Removal happens first (if any) so the insert below lands at a clean,
  // predictable position regardless of how long the removed text was.
  if (removed.length > 0) {
    deltas.push({
      type: "delete",
      position: start,
      text: "",
      length: removed.length,
      timestamp,
      userId,
      roomId,
    });
  }

  if (inserted.length > 0) {
    deltas.push({
      type: "insert",
      position: start,
      text: inserted,
      length: inserted.length,
      timestamp,
      userId,
      roomId,
    });
  }

  return deltas;
};
