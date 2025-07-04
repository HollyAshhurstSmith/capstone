const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function registerUser(username, password) {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });

  return newUser;
}

async function loginUser(username, password) {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'defaultSecret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  return { token, user };
}

module.exports = {
  registerUser,
  loginUser,
};
