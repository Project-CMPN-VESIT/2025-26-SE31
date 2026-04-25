import express from 'express';
export const donationRouter = express.Router();
import { createDonation, getAllDonations, getDonationStats } from '../controllers/donation.controller.js';
import { verifyAccesstoken } from '../middlewares/auth.js';
import { adminAuth } from '../middlewares/adminAuth.js';

donationRouter.post('/create', createDonation); // Public can donate
donationRouter.get('/all', verifyAccesstoken, adminAuth, getAllDonations);
donationRouter.get('/stats', verifyAccesstoken, adminAuth, getDonationStats);
