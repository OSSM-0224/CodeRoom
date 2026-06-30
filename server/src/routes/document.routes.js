import { Router } from "express";
import documentController from "../controllers/document.controller.js";

const router = Router();

// GET /api/document/:roomId -> fetch latest document on join
router.get("/:roomId", documentController.getDocument);

// PATCH /api/document/:roomId -> explicit full save / language change
router.patch("/:roomId", documentController.updateDocument);

export default router;