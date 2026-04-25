import mongoose from 'mongoose';
import User from './src/models/user.js';
import 'dotenv/config';

async function updateAdminName() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log('Connected to DB');

    // Find the admin user by role
    const admin = await User.findOne({ role: 'admin' });

    if (!admin) {
      console.log('No admin user found in database.');
      process.exit(0);
    }

    const oldName = admin.name;
    admin.name = 'Sudhir Waghmare';
    await admin.save();

    console.log(`Admin name updated successfully from "${oldName}" to "Sudhir Waghmare"`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin name:', err);
    process.exit(1);
  }
}

updateAdminName();
