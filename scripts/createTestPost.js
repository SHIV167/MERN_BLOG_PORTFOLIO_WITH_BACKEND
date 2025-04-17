const mongoose = require('mongoose');
const Post = require('../backend/models/postModel');
const User = require('../backend/models/userModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const createTestPost = async () => {
  try {
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    const post = await Post.create({
      title: 'Welcome to My Blog',
      content: 'This is my first blog post. Stay tuned for more content!',
      category: 'General',
      author: admin._id,
      slug: 'welcome-to-my-blog',
      tags: ['welcome', 'introduction']
    });

    console.log('Test post created:', post);
  } catch (error) {
    console.error('Error creating test post:', error);
  } finally {
    mongoose.connection.close();
  }
};

createTestPost();
