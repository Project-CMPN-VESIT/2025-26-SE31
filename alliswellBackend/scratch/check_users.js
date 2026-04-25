import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../src/models/user.js';

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sanskarsanas2611:alliswell@cluster0.np4fzgx.mongodb.net/?appName=Cluster0');
        console.log("Connected to DB");

        const users = await User.find({}, 'email name role isEmailVerified');
        console.log("Users in DB:");
        console.table(users.map(u => ({
            name: u.name,
            email: u.email,
            role: u.role,
            verified: u.isEmailVerified
        })));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkUsers();
