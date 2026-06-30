import { z } from "zod";
import editorService from "../services/editor.service.js";
import logger from "../logger/logger.js";

const deltaSchema = z.object({
  type: z.enum(["insert", "delete"]),
  position: z.number().int().nonnegative(),
  text: z.string().default(""),
  length: z.number().int().nonnegative().optional(),
  timestamp: z.number(),
  userId: z.string(),
  roomId: z.string(),
});
const deltaBatchSchema = z.array(deltaSchema).min(1).max(2);

/**
 * Registers editor-related listeners on a single connected socket.
 * Called from the central socket initialization file (not owned by us)
 * via: registerEditorSocketHandlers(io, socket).
 */
const registerEditorSocketHandlers = (io, socket) => {
  /**
   * "editor:delta" — fired by the client for every local change.
   * Payload is ALWAYS an array of 1-2 minimal delta objects:
   *  - [insertDelta]              pure typing / paste
   *  - [deleteDelta]               pure backspace / delete
   *  - [deleteDelta, insertDelta]  selection overwrite (replace)
   * Never carries the full document, only the delta(s) that changed.
   */
  socket.on("editor:delta", async (rawDeltas, ackCallback) => {
    try {
      const parsed = deltaBatchSchema.safeParse(rawDeltas);
      if (!parsed.success) {
        logger.warn(
          `Invalid delta batch from socket ${socket.id}: ${parsed.error.message}`
        );
        if (typeof ackCallback === "function") {
          ackCallback({ success: false, error: "Invalid delta payload" });
        }
        return;
      }

      const deltas = parsed.data;
      const { roomId } = deltas[0];

      // Apply the whole batch atomically via the shared service (handles
      // LWW + position clamping + a single persisted write, even when the
      // batch represents a delete+insert replace pair).
      const result = await editorService.processDeltaBatch(deltas);

      // Broadcast ONLY the delta batch (not the document) to everyone else
      // in the room, in the same order it was applied, so remote clients
      // reconstruct the exact same atomic replace.
      // `socket.to(roomId)` excludes the sender — the sender already has
      // the change applied locally (optimistic UI).
      socket.to(roomId).emit("editor:delta", {
        deltas: result.deltas,
        version: result.version,
        lastModified: result.lastModified,
      });

      // Acknowledge back to the sender so the client can update its
      // "Saved" status indicator.
      if (typeof ackCallback === "function") {
        ackCallback({ success: true, version: result.version });
      }
    } catch (error) {
      logger.error(`Failed to process editor:delta batch — ${error.message}`);
      if (typeof ackCallback === "function") {
        ackCallback({ success: false, error: "Failed to apply delta" });
      }
    }
  });
};

export default registerEditorSocketHandlers;