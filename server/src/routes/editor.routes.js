import { Router } from "express";
import editorController from "../controllers/editor.controller.js";

const router = Router();

// POST /api/editor/delta -> HTTP fallback path for applying a single delta
router.post("/delta", editorController.submitDelta);

// POST /api/editor/delta-batch -> atomic fallback for a delete+insert pair
// (selection replace), mirrors the socket "editor:delta-batch" event.
router.post("/delta-batch", editorController.submitDeltaBatch);

export default router;