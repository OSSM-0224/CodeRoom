import { Router } from "express";
import roomRouter from "./room.routes.js";
import documentRoutes from "./document.routes.js";
import editorRoutes from './editor.routes.js'



const router = Router();
router.use("/room", roomRouter);
router.use("/document", documentRoutes);
router.use("/editor", editorRoutes);

router.use("/room", roomRouter)
router.use("/document", documentRoutes)


export default router;
