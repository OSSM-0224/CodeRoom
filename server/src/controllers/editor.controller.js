import { z } from "zod";
import editorService from "../services/editor.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

/**
 * Editor Controller
 * -------------------
 * Why does a REST endpoint for deltas exist if sockets already handle this?
 * - Resilience: if a client's socket briefly disconnects/reconnects, this
 *   endpoint lets the client flush any queued offline deltas over HTTP
 *   instead of losing them.
 * - Testability: it's much easier to test delta application logic with
 *   curl/Postman/automated HTTP tests than with raw socket events.
 *
 * This controller reuses editorService.processDelta — the exact same
 * function the socket handler calls — so behavior is identical and not
 * duplicated.
 */

const deltaSchema = z.object({
  type: z.enum(["insert", "delete"]),
  position: z.number().int().nonnegative(),
  text: z.string().default(""),
  length: z.number().int().nonnegative().optional(),
  timestamp: z.number(),
  userId: z.string(),
  roomId: z.string(),
});

// A batch is capped at 2 deltas — that's the maximum a single local edit
// ever produces (delete old selection + insert new text). Capping it keeps
// the payload provably minimal and rejects anything trying to smuggle a
// larger operation log through this endpoint.
const deltaBatchSchema = z.array(deltaSchema).min(1).max(2);

/**
 * POST /api/editor/delta
 * Validates and applies a single delta via the shared editorService,
 * then returns the result. Broadcasting to other clients in the room
 * still happens via the socket layer (editor.socket.js) for real-time
 * delivery — this REST path is for persistence/recovery, not live fanout.
 */
const submitDelta = asyncHandler(async (req, res) => {
  const parsed = deltaSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid delta payload", parsed.error.errors);
  }

  const result = await editorService.processDelta(parsed.data);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Delta applied successfully"));
});

/**
 * POST /api/editor/delta-batch
 * Validates and atomically applies an ordered batch of 1-2 deltas — used
 * for selection-replace (delete + insert) so the HTTP fallback path gets
 * the same atomicity guarantee as the socket path. See editorService
 * .processDeltaBatch for why atomicity matters here.
 */
const submitDeltaBatch = asyncHandler(async (req, res) => {
  const parsed = deltaBatchSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid delta batch payload", parsed.error.errors);
  }

  const result = await editorService.processDeltaBatch(parsed.data);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Delta batch applied successfully"));
});

export default {
  submitDelta,
  submitDeltaBatch,
};