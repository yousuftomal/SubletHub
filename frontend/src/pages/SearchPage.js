import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [location, setLocation] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [occupation, setOccupation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/ads/search', {
        params: { searchQuery, location, minRent, maxRent, occupation },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Search Ads</h1>
      <div>
        <label>Search Query:</label>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <label>Min Rent:</label>
        <input type="number" value={minRent} onChange={(e) => setMinRent(e.target.value)} />
      </div>
      <div>
        <label>Max Rent:</label>
        <input type="number" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} />
      </div>
      <div>
        <label>Occupation:</label>
        <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button>

      <h2>Results:</h2>
      <ul>
        {results.map((ad) => (
          <li key={ad._id}>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <p>Rent: {ad.rent}</p>
            <p>Location: {ad.location}</p>
            <p>Preferred Occupation: {ad.occupation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
