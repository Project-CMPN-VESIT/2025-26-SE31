import mongoose from 'mongoose';
import 'dotenv/config';
import { Contact } from './src/models/contactSchema.js';

async function checkEnquiries() {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Connected to DB");

        const enquiries = await Contact.find({}).limit(10);
        console.log("Sample Enquiries:");
        console.table(enquiries.map(e => ({
            id: e._id,
            email: e.email,
            user: e.user,
            type: e.enquiryType
        })));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkEnquiries();
