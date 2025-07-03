const axios = require('axios');
const { run, all } = require('../config/db');
require('dotenv').config(); 

module.exports = {
  async getWeather(location, userId) {
    console.log('Weather Controller - Starting weather fetch for:', { location, userId });
    
    try {
      console.log('Weather Controller - Calling OpenWeather API');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      
      console.log('Weather Controller - OpenWeather API response received');
      const weatherData = {
        location: response.data.name,
        country: response.data.sys.country,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        feelsLike: Math.round(response.data.main.feels_like),
        pressure: response.data.main.pressure
      };

      console.log('Weather Controller - Processed weather data:', weatherData);
      
      // First check if user exists
      const userExists = await all('SELECT id FROM users WHERE id = ?', [userId]);
      console.log('Weather Controller - User check result:', userExists);
      
      if (userExists.length === 0) {
        console.error('Weather Controller - User not found:', userId);
        throw new Error('User not found');
      }
      
      console.log('Weather Controller - Saving to search history');
      const result = await run(
        'INSERT INTO search_history (user_id, location, temperature, conditions) VALUES (?, ?, ?, ?)',
        [userId, location, weatherData.temperature, weatherData.description]
      );
      console.log('Weather Controller - Search history saved:', result);
      
      // Verify the insertion
      const savedRecord = await all(
        'SELECT * FROM search_history WHERE id = ?', 
        [result.lastID]
      );
      console.log('Weather Controller - Verified saved record:', savedRecord);
      
      return weatherData;
    } catch (error) {
      console.error('Weather Controller - Error:', error.message);
      if (error.response) {
        console.error('Weather Controller - API Error:', error.response.data);
      }
      throw error;
    }
  }
};