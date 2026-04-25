import mongoose from 'mongoose';
import 'dotenv/config';
import { Contact } from '../src/models/contactSchema.js';

async function checkEnquiries() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sanskarsanas2611:alliswell@cluster0.np4fzgx.mongodb.net/?appName=Cluster0');
        console.log("Connected to DB");

        const enquiries = await Contact.find({}).limit(5);
        console.log("Recent Enquiries:");
        console.table(enquiries.map(e => ({
            id: e._id.toString(),
            name: e.name,
            status: e.status,
            reply: e.reply,
            type: e.enquiryType
        })));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkEnquiries();
