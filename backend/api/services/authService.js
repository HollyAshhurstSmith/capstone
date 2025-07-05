const User = require('../models/User');

async function findUserByUsername(username) {
  return await User.findOne({ where: { username } });
}

async function createUser(username, hashedPassword) {
  return await User.create({ username, password: hashedPassword });
}

module.exports = {
  findUserByUsername,
  createUser,
};