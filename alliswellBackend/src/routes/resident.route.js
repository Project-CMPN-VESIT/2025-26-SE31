import express from 'express';
export const residentRouter = express.Router();
import { createResident, getAllResidents, updateResident, deleteResident } from '../controllers/resident.controller.js';
import { verifyAccesstoken } from '../middlewares/auth.js';
import { adminAuth } from '../middlewares/adminAuth.js';

residentRouter.post('/add', verifyAccesstoken, adminAuth, createResident);
residentRouter.get('/all', verifyAccesstoken, adminAuth, getAllResidents);
residentRouter.put('/update/:id', verifyAccesstoken, adminAuth, updateResident);
residentRouter.delete('/delete/:id', verifyAccesstoken, adminAuth, deleteResident);
