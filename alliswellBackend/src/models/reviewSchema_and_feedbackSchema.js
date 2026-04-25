import mongoose from 'mongoose';

// --- REVIEW SCHEMA (Star Ratings & Public Testimonials) ---
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    rating: {
        type: Number, required: true, min: 1, max: 5
    },
    comment: {
        type: String, required: true
    },
    isApproved:
    {
        type: Boolean, default: false
    },
    isFeatured: {
        type: Boolean, default: false
    }
}, { timestamps: true });


const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    title: {
        type: String, required: true
    }, // e.g., "My experience with the food drive"
    thoughts: {
        type: String, required: true
    }, // The detailed story/thoughts
    type: {
        type: String,
        enum: ['story', 'suggestion', 'appreciation', 'general'],
        default: 'General'
    },
    shareOnWall: {
        type: Boolean, default: true
    } 
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);

export const Feedback = mongoose.model('Feedback', feedbackSchema);