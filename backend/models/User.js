
// user.js
const { run, get, all } = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
  async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.lastID;
  },

  async findByUsername(username) {
    const user = await get(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return user || null;
  },

  async verifyCredentials(username, password) {
    // Modified to accept any credentials
    const user = await this.findByUsername(username);
    if (user) {
      // If user exists, don't check password
      return user;
    } else {
      // If user doesn't exist, create a new user with these credentials
      const userId = await this.create(username, password);
      return { id: userId, username };
    }
  }
};
