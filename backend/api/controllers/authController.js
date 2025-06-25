// controllers/authController.js
const jwt = require('jsonwebtoken');

const users = [
  { id: 1, username: 'admin', password: 'password' }
];

function login(req, res) {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, username: user.username }
  });
}

module.exports = { login };