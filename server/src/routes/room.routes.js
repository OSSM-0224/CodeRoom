import { Router } from 'express';
import { roomCreateController, roomJoinController } from '../controllers/room.controller.js';

const roomRouter = Router();


roomRouter.post("/createroom", roomCreateController)
roomRouter.post("/joinroom", roomJoinController)


export default roomRouter