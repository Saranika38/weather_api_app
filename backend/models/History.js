const { run, all } = require('../config/db');

module.exports = {
  /**
   * Log a search to history
   * @param {number} userId 
   * @param {string} location 
   * @returns {Promise<number>} Insert ID
   */
  async create(userId, location, temperature, conditions) {
    console.log('History Model - Creating new search history:', {
      userId,
      location,
      temperature,
      conditions
    });
    try {
      const result = await run(
        'INSERT INTO search_history (user_id, location, temperature, conditions) VALUES (?, ?, ?, ?)',
        [userId, location, temperature, conditions]
      );
      console.log('History Model - Created record with ID:', result.lastID);
      return result.lastID;
    } catch (error) {
      console.error('History Model - Database error in create:', error);
      throw error;
    }
  },

  /**
   * Get user's search history
   * @param {number} userId 
   * @returns {Promise<array>} Array of history items
   */
  async findByUser(userId) {
    console.log('History Model - Executing findByUser query for userId:', userId);
    try {
      const rows = await all(
        'SELECT id, location, temperature, conditions, search_date FROM search_history WHERE user_id = ? ORDER BY search_date DESC',
        [userId]
      );
      console.log('History Model - Found records:', rows.length);
      console.log('History Model - Sample record:', rows[0] || 'No records');
      return rows;
    } catch (error) {
      console.error('History Model - Database error in findByUser:', error);
      throw error;
    }
  },

  /**
   * Clear user's history
   * @param {number} userId 
   * @returns {Promise<void>}
   */
  async clearHistory(userId) {
    console.log('History Model - Clearing history for userId:', userId);
    try {
      const result = await run(
        'DELETE FROM search_history WHERE user_id = ?',
        [userId]
      );
      console.log('History Model - Cleared records:', result.changes);
      return result.changes;
    } catch (error) {
      console.error('History Model - Database error in clearHistory:', error);
      throw error;
    }
  }
};