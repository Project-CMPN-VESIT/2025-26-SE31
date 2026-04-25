import mongoose from 'mongoose';
import 'dotenv/config';
import { Review, Feedback } from '../src/models/reviewSchema_and_feedbackSchema.js';

async function checkReviews() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sanskarsanas2611:alliswell@cluster0.np4fzgx.mongodb.net/?appName=Cluster0');
        console.log("Connected to DB");

        const reviews = await Review.find({});
        console.log("Reviews in DB:", reviews.length);
        console.table(reviews.map(r => ({
            rating: r.rating,
            comment: r.comment,
            user: r.user
        })));

        const feedbacks = await Feedback.find({});
        console.log("Feedbacks in DB:", feedbacks.length);
        console.table(feedbacks.map(f => ({
            title: f.title,
            thoughts: f.thoughts,
            shareOnWall: f.shareOnWall
        })));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkReviews();
