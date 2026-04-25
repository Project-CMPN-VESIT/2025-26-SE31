import express from 'express';
const eventRouter = express.Router();
import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controllers/event.controller.js';
import { upload } from '../config/cloudinary.js';
import { verifyAccesstoken } from '../middlewares/auth.js';
import { adminAuth } from '../middlewares/adminAuth.js';

eventRouter.post('/add-event',verifyAccesstoken,adminAuth,upload.array('images', 10),createEvent);
eventRouter.delete('/delete-event/:id', verifyAccesstoken, adminAuth, deleteEvent);
eventRouter.put('/update-event/:id', verifyAccesstoken, adminAuth, upload.array('images'), updateEvent);
eventRouter.get('/get-all', getAllEvents)
export default eventRouter;

