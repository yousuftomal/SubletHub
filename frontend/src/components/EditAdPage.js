import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAdPage = () => {
  const { id } = useParams(); // Get the ad ID from the URL parameters
  const adId = id; // Maintain compatibility with existing code
  const navigate = useNavigate();
  
  const [ad, setAd] = useState({
    title: '',
    description: '',
    rent: '',
    location: '',
    preferredOccupation: ''
  });
  const [error, setError] = useState(null);

  // Log and validate adId
  useEffect(() => {
    if (!adId) {
      console.error('No adId found in URL parameters');
      setError('Invalid ad ID');
      navigate('/profile');
    }
  }, [adId, navigate]);

  // Fetch the ad details when the component mounts
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ads/${adId}`);
        setAd(response.data); // Set the ad details in state
      } catch (err) {
        console.error('Error fetching ad:', err);
        setError('Error fetching ad');
      }
    };

    fetchAd();
  }, [adId]);

  // Handle input changes
  const handleChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.put(`http://localhost:5000/api/ads/${adId}`, ad, {
        headers: {
          Authorization: `Bearer ${token}` // Set the token in the Authorization header
        }
      });
      navigate('/profile'); // Redirect to the profile page after successful update
    } catch (err) {
      console.error('Error updating ad:', err);
      setError('Error updating ad');
    }
  };

  return (
    <div>
      <h1>Edit Ad</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={ad.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={ad.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rent:</label>
          <input
            type="number"
            name="rent"
            value={ad.rent}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={ad.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preferred Occupation:</label>
          <input
            type="text"
            name="preferredOccupation"
            value={ad.preferredOccupation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Ad</button>
      </form>
    </div>
  );
};

export default EditAdPage;