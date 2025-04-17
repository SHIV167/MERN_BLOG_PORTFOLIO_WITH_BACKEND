const mongoose = require('mongoose');
const User = require('../backend/models/userModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const createAdminUser = async () => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
