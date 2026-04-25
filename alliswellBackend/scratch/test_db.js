import mongoose from 'mongoose';
import 'dotenv/config';

async function testConn() {
    try {
        console.log("Connecting to:", process.env.DBURL);
        await mongoose.connect(process.env.DBURL);
        console.log("Connected successfully");
        process.exit(0);
    } catch (err) {
        console.error("Connection failed:", err.message);
        process.exit(1);
    }
}
testConn();
