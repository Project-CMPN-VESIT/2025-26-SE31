import express from 'express';
const reviewRouter = express.Router();
import { postReview, getAllReviews } from '../controllers/review_And_feedback.controller.js';
import { verifyAccesstoken } from '../middlewares/auth.js';

// Route: http://localhost:8000/api/v1/reviews/add
// Purpose: Let a logged-in user write a review
reviewRouter.post('/add-review',verifyAccesstoken,postReview);

// Route: http://localhost:8000/api/v1/reviews/all
// Purpose: Let everyone see the reviews/ratings on the homepage
reviewRouter.get('/all', getAllReviews); 

export default reviewRouter;