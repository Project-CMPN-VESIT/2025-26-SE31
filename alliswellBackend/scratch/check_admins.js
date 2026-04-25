import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../src/models/user.js';

async function checkPasswords() {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Connected to DB");

        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
            console.log(`Admin: ${admin.email}, Role: ${admin.role}`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkPasswords();
