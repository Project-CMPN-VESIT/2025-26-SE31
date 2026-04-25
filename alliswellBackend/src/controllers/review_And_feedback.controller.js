import { Feedback, Review } from '../models/reviewSchema_and_feedbackSchema.js';

// --- REVIEW CONTROLLERS ---

// 1. Create Review (Existing)
export const postReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const newReview = await Review.create({
      user: req.user._id,
      rating,
      comment
    });
    res.status(201).json({ success: true, message: "Review added!", data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Get All Reviews (New Feature)
export const getAllReviews = async (req, res) => {
  try {
    // .populate('user', 'name') assumes your User model has a 'name' field
    const reviews = await Review.find()
      .populate('user', 'name email') 
      .sort({ createdAt: -1 }); // Show newest first

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// --- FEEDBACK CONTROLLERS ---

// 3. Create Feedback (Existing)
export const postFeedback = async (req, res) => {
  try {
    const { title, thoughts, type, shareOnWall } = req.body;
    const newFeedback = await Feedback.create({
      user: req.user._id,
      title,
      thoughts,
      type,
      shareOnWall
    });
    res.status(201).json({ success: true, message: "Thoughts shared successfully!", data: newFeedback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Get All Community Feedback (New Feature)
export const getAllFeedback = async (req, res) => {
  try {
    // We only fetch feedback where shareOnWall is true
    const feedbacks = await Feedback.find({ shareOnWall: true })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};