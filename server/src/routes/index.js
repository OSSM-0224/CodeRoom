import { Router } from "express";
import roomRouter from "./room.routes.js";
const router = Router();
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

router.use("/room", roomRouter)


export default router;