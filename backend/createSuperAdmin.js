// backend/createSuperAdmin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

async function createSuperAdmin() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  // Super Admin credentials
  const superAdminData = {
    username: 'superadmin',
    password: await bcrypt.hash('YourStrongPassword123!', 10),
    role: 'super_admin'
  };

  // Create or update Super Admin
  const superAdmin = await User.findOneAndUpdate(
    { username: 'superadmin' },
    superAdminData,
    { upsert: true, new: true }
  );

  console.log('Super Admin created/updated:', superAdmin);
  await mongoose.disconnect();
}

createSuperAdmin().catch(console.error);