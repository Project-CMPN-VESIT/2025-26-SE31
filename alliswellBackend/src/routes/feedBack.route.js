import express from 'express';
const feedbackRouter = express.Router();
import { postFeedback, getAllFeedback } from '../controllers/review_And_feedback.controller.js';
import { verifyAccesstoken } from '../middlewares/auth.js';

feedbackRouter.post('/add-feedback',verifyAccesstoken, postFeedback);

// Route: http://localhost:8000/api/v1/community-feedback/wall
// Purpose: Publicly display the community's thoughts and experiences
feedbackRouter.get('/all-feedback', getAllFeedback);

export default feedbackRouter;