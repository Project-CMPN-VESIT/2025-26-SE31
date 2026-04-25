import mongoose from 'mongoose';
import 'dotenv/config';
import User from './src/models/user.js';

async function resetAdmin() {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Connected to DB");

        const email = 'admin@alliswell.org';
        let admin = await User.findOne({ email });
        
        if (admin) {
            admin.password = 'admin123'; // Simpler password
            admin.role = 'admin';
            admin.isEmailVerified = true;
            await admin.save();
            console.log("Admin password reset to: admin123");
        } else {
            admin = await User.create({
                name: 'System Admin',
                email: email,
                password: 'admin123',
                role: 'admin',
                isEmailVerified: true
            });
            console.log("Admin created with password: admin123");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

resetAdmin();
