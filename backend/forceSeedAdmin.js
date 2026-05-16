const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    let user = await User.findOne({ email: 'admin@blogy.com' });
    if (user) {
      user.password = hashedPassword;
      user.role = 'admin';
      await user.save();
      console.log('Admin updated with new password admin123');
    } else {
      await User.create({
        name: 'Admin',
        email: 'admin@blogy.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin created');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
