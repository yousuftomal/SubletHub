import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds } from '../redux/slices/adSlice';
import { fetchUser  } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation
  const { user } = useSelector((state) => state.auth); // Fetch user from Redux state
  const [ads, setAds] = useState([]);
  const [recommendedAds, setRecommendedAds] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [searchLocation, setSearchLocation] = useState(''); // Renamed from location
  const [occupation, setOccupation] = useState('');

  // Fetch all ads when the component loads
  useEffect(() => {
    if (user) {
      dispatch(fetchAds());
    }
  }, [dispatch, user]);

  // Fetch recommended ads based on user's occupation
  useEffect(() => {
    if (user) {
      dispatch(fetchUser (user.id)).then((result) => {
        const userData = result.payload;
        if (userData) {
          const fetchRecommendedAds = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/ads/recommended?occupation=${userData.occupation}`);
              setRecommendedAds(response.data);
            } catch (error) {
              console.error('Error fetching recommended ads:', error);
            }
          };
          fetchRecommendedAds();
        }
      });
    }
  }, [dispatch, user]);

  // Fetch recent ads
  useEffect(() => {
    const fetchRecentAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching recent ads:', error);
      }
    };
    if (user) {
      fetchRecentAds();
    }
  }, [user]);

  // Handle navigation
  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    console.log('User  state:', user);
    console.log('Is Admin:', user.isAdmin); // Check if user is admin
    if (user && user.isAdmin) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/ads/search", {
        params: {
          keyword: searchCriteria,
          location: searchLocation,
          occupation: occupation,
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };
  // Handle complaint navigation
  const handleComplaint = () => {
    if (user) {
      navigate('/complaint');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Sublet Hub</h1>
      <nav>
        {user ? (
          <>
            <button onClick={() => handleNavigation('/profile')}>Profile</button>
            <button onClick={() => handleNavigation('/post-ad')}>Post Ad</button>
            <button onClick={handleComplaint}>Complaint</button>
            <button onClick={() => handleNavigation('/admin')}>Admin</button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>

      {user ? (
        <>
          {/* Search bar and button */}
          <form onSubmit={handleSearch} className="search-section">
            <input
              type="text"
              placeholder="Search ads..."
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
            />
            
            <button type="submit">Search</button>
          </form>

          {/* Display search results */}
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((ad) => (
                <div key={ad.id} className="ad-card">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Rent: ${ad.rent}</p>
                  <p>Location: {ad.location}</p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>

          {/* Display recommended ads */}
          <div className="recommended-ads">
            <h2>Recommended Ads for You</h2>
            {recommendedAds.length > 0 ? (
              recommendedAds.map((ad) => (
                <div key={ad.id} className="ad-card">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Rent: ${ad.rent}</p>
                  <p>Location: {ad.location}</p>
                </div>
              ))
            ) : (
              <p>No recommended ads available.</p>
            )}
          </div>
          
          <div className="recommended-ads">
            <h2>Recent Ads for You</h2>
            {ads.length > 0 ? (
              recommendedAds.map((ad) => (
                <div key={ad.id} className="ad-card">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Rent: ${ad.rent}</p>
                  <p>Location: {ad.location}</p>
                </div>
              ))
            ) : (
              <p>No recommended ads available.</p>
            )}
          </div>
        </>
      ) : (
        <p>Please log in to view ads and make searches.</p>
      )}
    </div>
  );
};

export default HomePage;