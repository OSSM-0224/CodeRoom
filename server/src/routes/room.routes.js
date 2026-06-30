import { Router } from "express";
import {
  roomCreateController,
  roomJoinController,
} from "../controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/createRoom", roomCreateController);
roomRouter.post("/joinRoom", roomJoinController);

export default roomRouter;
