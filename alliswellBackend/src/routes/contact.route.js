import express from 'express';
export const contactRouter = express.Router();
import {submitContactForm, getAllEnquiries, updateEnquiryStatus, getMyEnquiries} from '../controllers/contact.controller.js';
import { verifyAccesstoken } from '../middlewares/auth.js';
import { adminAuth } from '../middlewares/adminAuth.js';

// POST /api/v1/contact/send
contactRouter.post('/send', submitContactForm);

// GET /api/v1/contact/my-enquiries
contactRouter.get('/my-enquiries', verifyAccesstoken, getMyEnquiries);

// GET /api/v1/contact/all
contactRouter.get('/all', verifyAccesstoken, adminAuth, getAllEnquiries);

// PATCH /api/v1/contact/status/:id
contactRouter.patch('/status/:id', verifyAccesstoken, adminAuth, updateEnquiryStatus);