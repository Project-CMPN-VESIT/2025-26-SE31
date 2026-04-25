import mongoose from 'mongoose';
import 'dotenv/config';
import { Contact } from '../src/models/contactSchema.js';

async function checkShubhadaEnquiries() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sanskarsanas2611:alliswell@cluster0.np4fzgx.mongodb.net/?appName=Cluster0');
        console.log("Connected to DB");

        const email = 'dshubhada2006@gmail.com';
        const enquiries = await Contact.find({ email: email });
        
        console.log(`Enquiries found for ${email}:`, enquiries.length);
        console.table(enquiries.map(e => ({
            id: e._id.toString(),
            name: e.name,
            email: e.email,
            user: e.user ? e.user.toString() : 'None',
            status: e.status
        })));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkShubhadaEnquiries();
