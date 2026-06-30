import { Router } from 'express';
import { getDocumentController, patchDocumentController } from '../controllers/document.controller.js';

const documentRoute = Router();


documentRoute.get("/:roomId", getDocumentController);
documentRoute.patch("/:roomId", patchDocumentController);


export default documentRoute