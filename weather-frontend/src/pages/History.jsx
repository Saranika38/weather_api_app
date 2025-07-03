import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchHistory, deleteSearchHistory } from '../utils/history';
import { getWeather } from '../utils/weather';

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    console.log('History Component - Starting to fetch history');
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getSearchHistory();
      console.log('History Component - Received history data:', data);
      setHistory(data);
    } catch (err) {
      console.error('History Component - Error fetching history:', err);
      setError(err.message || 'Failed to fetch search history. Please try again.');
    } finally {
      setIsLoading(false);
      console.log('History Component - Fetch complete, loading:', false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSearchHistory(id);
      setHistory(history.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete history item. Please try again.');
      console.error(err);
    }
  };

  const handleSearch = async (location) => {
    try {
      await getWeather(location);
      navigate('/');
    } catch (err) {
      setError('Failed to search for this location. Please try again.');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (history.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Search History</h1>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Search History</h2>
            <p className="card-description">Your recent weather searches will appear here</p>
          </div>
          <div className="card-content text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No search history found</p>
            <button 
              className="btn btn-outline mt-4"
              onClick={() => navigate('/')}
            >
              Search Weather
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Search History</h1>
        <button 
          className="btn btn-outline"
          onClick={fetchHistory}
        >
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="alert alert-error mb-6">
          {error}
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item) => (
          <div key={item._id} className="card">
            <div className="card-header pb-2">
              <h2 className="card-title text-lg">{item.location}</h2>
              <p className="card-description flex items-center">
                {item.country || "Unknown"}
              </p>
            </div>
            <div className="card-content">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <div className="text-lg font-semibold">
                  {item.temperature}°C
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <button 
                  className="btn btn-secondary flex-1"
                  onClick={() => handleSearch(item.location)}
                >
                  Search Again
                </button>
                <button 
                  className="btn btn-outline p-2"
                  onClick={() => handleDelete(item._id)}
                >
Delete                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;