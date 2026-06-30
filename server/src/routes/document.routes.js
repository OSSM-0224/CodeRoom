import { Router } from 'express';
import { getDocumentController, patchDocumentController } from '../controllers/document.controller.js';

const documentRoutes = Router();


documentRoutes.get("/:roomId", getDocumentController);
documentRoutes.patch("/:roomId", patchDocumentController);


export default documentRoutes
