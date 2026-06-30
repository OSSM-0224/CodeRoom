import { Router } from "express";
import roomRouter from "./room.routes.js";
import documentRoute from "./document.routes.js";
const router = Router();
router.use("/room", roomRouter);
router.use("/document", documentRoutes);
router.use("/editor", editorRoutes);

router.use("/room", roomRouter)
router.use("/document", documentRoute)


export default router;
