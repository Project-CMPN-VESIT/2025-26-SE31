import mongoose from 'mongoose';
import 'dotenv/config';
import { Contact } from '../src/models/contactSchema.js';

async function testUpdate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sanskarsanas2611:alliswell@cluster0.np4fzgx.mongodb.net/?appName=Cluster0');
        console.log("Connected to DB");

        const id = '69d94b44832e6ed6a27b70c7'; // First one from the list
        const updateData = { status: 'In Progress', reply: 'Testing response' };

        const enquiry = await Contact.findByIdAndUpdate(id, updateData, { new: true });
        if (!enquiry) {
            console.log("Enquiry not found");
        } else {
            console.log("Updated Enquiry:", enquiry.status, enquiry.reply);
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

testUpdate();
