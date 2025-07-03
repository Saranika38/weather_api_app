const { run } = require('../config/db');

async function createTestUser() {
  try {
    const result = await run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      ['testuser', 'dummyhash']
    );
    console.log('Test user created with ID:', result.lastID);
  } catch (error) {
    console.error('Error creating test user:', error);
  }
}

createTestUser();