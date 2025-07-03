import React, { useState } from 'react';
import { getWeather } from '../utils/weather';

function Dashboard() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeather(location);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">Weather Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">Get real-time weather information for any location around the world</p>
      </div>
      
      <div className="card mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="card-header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h2 className="text-xl font-bold">Search Weather</h2>
          <p className="text-blue-100 mt-1">Enter a city name or location to get current weather conditions</p>
        </div>
        <div className="card-content p-6">
          {error && (
            <div className="alert alert-error mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                id="location"
                name="location"
                className="input pl-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-4 rounded-lg shadow-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all duration-200"
                placeholder="Enter city or location (e.g., London, Tokyo, New York)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Location search"
                autoComplete="off"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] font-medium text-white rounded-md shadow-md w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Weather
                </div>
              )}
            </button>
          </form>
        </div>
      </div>

      {weather && (
        <div className="space-y-6">
          <div className="card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-3xl font-bold">{weather.location}</h2>
                  <p className="flex items-center text-blue-100 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {weather.country}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold">{weather.temperature}°C</div>
                  <div>
                    <p className="text-white text-lg capitalize">{weather.description}</p>
                  </div>
                </div>
            </div>
          </div>
            <div className="card-content p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="weather-stat bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Humidity</span>
                  <span className="text-xl font-bold text-gray-800 dark:text-white">{weather.humidity}%</span>
                </div>
                <div className="weather-stat bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Feels Like</span>
                  <span className="text-xl font-bold text-gray-800 dark:text-white">{weather.feelsLike}°C</span>
                </div>
                <div className="weather-stat bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Wind Speed</span>
                  <span className="text-xl font-bold text-gray-800 dark:text-white">{weather.windSpeed} m/s</span>
                </div>
                <div className="weather-stat bg-blue-50 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pressure</span>
                  <span className="text-xl font-bold text-gray-800 dark:text-white">{weather.pressure} hPa</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700/30 rounded-lg border border-blue-100 dark:border-gray-700">
                <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Weather Information</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  The current weather in {weather.location} is {weather.description.toLowerCase()} with a temperature of {weather.temperature}°C. It feels like {weather.feelsLike}°C.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date
                </h3>
              </div>
              <div className="card-content">
                <p>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Local Time
                </h3>
              </div>
              <div className="card-content">
                <p>{new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true
                })}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Temperature Range
                </h3>
              </div>
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Min</p>
                    <p className="font-medium">{weather.minTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Max</p>
                    <p className="font-medium">{weather.maxTemp}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;