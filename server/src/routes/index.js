import { Router } from "express";
import roomRouter from "./room.routes.js";
import documentRoute from "./document.routes.js";
const router = Router();
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

router.use("/room", roomRouter)
router.use("/document", documentRoute)


export default router;