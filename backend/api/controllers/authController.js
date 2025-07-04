const authService = require('../services/authService');

async function register(req, res) {
  const { username, password } = req.body;
  try {
    await authService.registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    const status = err.message === 'User already exists' ? 409 : 500;
    res.status(status).json({ message: err.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const { token, user } = await authService.loginUser(username, password);
    res.json({ token, user, message: 'Login successful' });
  } catch (err) {
    const status = err.message === 'Invalid credentials' ? 401 : 500;
    res.status(status).json({ message: err.message });
  }
}

module.exports = { register, login };
