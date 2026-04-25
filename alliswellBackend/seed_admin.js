import mongoose from 'mongoose';
import User from './src/models/user.js';
import 'dotenv/config';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log('Connected to DB');

    const adminEmail = 'admin@alliswell.org';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Sudhir Waghmare',
      email: adminEmail,
      password: 'adminPassword123',
      role: 'admin',
      isEmailVerified: true
    });

    console.log('Admin created successfully:', adminEmail);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
