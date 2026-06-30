import { Router } from "express";
import {
  getParticipantsController,
  getRoomController,
  leaveRoomController,
  roomCreateController,
  roomJoinController,
} from "../controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/createRoom", roomCreateController);
roomRouter.post("/joinRoom", roomJoinController);
roomRouter.get("/:roomId", getParticipantsController)

roomRouter.get("/user/:roomId", getRoomController)
roomRouter.post("/leave", leaveRoomController)

export default roomRouter;
