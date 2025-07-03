// history.js
const History = require('../models/History');

module.exports = {
  async getHistory(userId) {
    console.log('History Controller - Fetching history for user:', userId);
    try {
      const history = await History.findByUser(userId);
      console.log('History Controller - Found records:', history.length);
      return history;
    } catch (error) {
      console.error('History Controller - Error fetching history:', error);
      throw error;
    }
  },

  async clearHistory(userId) {
    console.log('History Controller - Clearing history for user:', userId);
    try {
      await History.clearHistory(userId);
      console.log('History Controller - History cleared successfully');
      return { message: 'History cleared' };
    } catch (error) {
      console.error('History Controller - Error clearing history:', error);
      throw error;
    }
  }
};