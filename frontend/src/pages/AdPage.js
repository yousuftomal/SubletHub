import React, { useState, useEffect } from 'react';
import axios from 'axios';



const SearchSublets = ({ setSearchResults }) => {
    const [location, setLocation] = useState("");
    const [minRent, setMinRent] = useState("");
    const [maxRent, setMaxRent] = useState("");
    const [occupation, setOccupation] = useState("");
  
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get("http://localhost:5000/api/ads/search", {
          params: { location, minRent, maxRent, occupation },
        });
        setSearchResults(response.data.data); // Assuming `setSearchResults` updates the ads list
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    return (
      <div>
        <h3>Search Sublets</h3>
        <form onSubmit={handleSearch}>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>
          <div>
            <label>Min Rent:</label>
            <input
              type="number"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
              placeholder="Enter min rent"
            />
          </div>
          <div>
            <label>Max Rent:</label>
            <input
              type="number"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              placeholder="Enter max rent"
            />
          </div>
          <div>
            <label>Occupation:</label>
            <select value={occupation} onChange={(e) => setOccupation(e.target.value)}>
              <option value="">Select occupation</option>
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  };
  
const AdPage = () => {
  const [ads, setAds] = useState([]); // State to store ads
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Search filters
  const [location, setLocation] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [occupation, setOccupation] = useState('');
  const [sortBy, setSortBy] = useState('desc'); // Default to descending

  // Fetch ads based on filters
  const fetchAds = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        location,
        minRent,
        maxRent,
        occupation,
        sortBy,
      };

      const response = await axios.get('/api/ads/search', { params }); // Backend route
      setAds(response.data.data); // Update state with the ads
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError('Could not fetch ads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch ads on first render and whenever filters change
  useEffect(() => {
    fetchAds();
  }, [location, minRent, maxRent, occupation, sortBy]);

  return (
    <div>
      <h1>Search Sublets</h1>
      
      {/* Search Filters */}
      <div style={{ marginBottom: '20px' }}>
        <select onChange={(e) => setLocation(e.target.value)} value={location}>
          <option value="">Select Location</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>

        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />

        <select onChange={(e) => setOccupation(e.target.value)} value={occupation}>
          <option value="">Select Occupation</option>
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
          <option value="Retired">Retired</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <button onClick={fetchAds}>Search</button>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Search Results */}
      <div>
        {ads.length === 0 ? (
          <p>No ads found. Try adjusting your filters.</p>
        ) : (
          ads.map((ad) => (
            <div key={ad._id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
              <h2>{ad.title}</h2>
              <p>{ad.description}</p>
              <p>Location: {ad.location}</p>
              <p>Rent: ${ad.rent}</p>
              <p>Preferred Occupation: {ad.preferredOccupation}</p>
              <p>Posted At: {new Date(ad.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdPage;
