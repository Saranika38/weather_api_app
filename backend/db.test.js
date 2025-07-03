const { all, db } = require('./config/db');

(async () => {
  try {
    const rows = await all('SELECT 1 + 1 AS solution');
    console.log('Database connection successful! Result:', rows[0].solution);
  } catch (err) {
    console.error('Database connection failed:', err);
  } finally {
    process.exit();
  }
})();