const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const existingUser = await authService.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await authService.createUser(username, hashedPassword);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await authService.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = { register, login };
