import express from 'express';
import { uploadDocs } from '../config/cloudinary.js';
import { uploadDocument, getAllDocuments, getDocumentById, previewDocumentById, deleteDocument } from '../controllers/document.controller.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { verifyAccesstoken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload', verifyAccesstoken, adminAuth, uploadDocs.single('file'), uploadDocument);
router.get('/all', getAllDocuments);
router.get('/preview/:id', previewDocumentById);
router.get('/:id', getDocumentById);
router.delete('/:id', verifyAccesstoken, adminAuth, deleteDocument);

export default router;
