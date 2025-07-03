const { run } = require('../config/db');

async function populateSampleData() {
  const sampleData = [
    { location: 'London', temperature: 15, conditions: 'Partly cloudy' },
    { location: 'Tokyo', temperature: 23, conditions: 'Clear sky' },
    { location: 'New York', temperature: 20, conditions: 'Sunny' },
    { location: 'Paris', temperature: 18, conditions: 'Light rain' },
    { location: 'Sydney', temperature: 25, conditions: 'Clear sky' },
    { location: 'Dubai', temperature: 35, conditions: 'Sunny' },
    { location: 'Singapore', temperature: 30, conditions: 'Scattered clouds' },
    { location: 'Mumbai', temperature: 32, conditions: 'Humid' },
    { location: 'Moscow', temperature: 5, conditions: 'Overcast' },
    { location: 'Rio de Janeiro', temperature: 28, conditions: 'Partly cloudy' }
  ];

  try {
    // Assuming user_id 1 exists
    const userId = 1;
    
    for (const data of sampleData) {
      await run(
        'INSERT INTO search_history (user_id, location, temperature, conditions) VALUES (?, ?, ?, ?)',
        [userId, data.location, data.temperature, data.conditions]
      );
      console.log(`Added sample data for ${data.location}`);
    }

    console.log('Sample data population completed successfully!');
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
}

populateSampleData();