import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds } from '../redux/slices/adSlice';
import { fetchUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation
  const { user } = useSelector((state) => state.auth); // Fetch user from Redux state
  const [ads, setAds] = useState([]);
  const [recommendedAds, setRecommendedAds] = useState([]);

  // Fetch all ads when the component loads
  useEffect(() => {
    if (user) {
      dispatch(fetchAds());
    }
  }, [dispatch, user]);

  // Fetch recommended ads based on user's occupation
  useEffect(() => {
    if (user) {
      dispatch(fetchUser(user.id)).then((result) => {
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
    if (user) {
      navigate(path);
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
          <h2>Recommendations</h2>
          <ul>
            {recommendedAds.map((ad) => (
              <li key={ad._id}>
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
              </li>
            ))}
          </ul>
          <h2>Recent Ads</h2>
          <ul>
            {ads.map((ad) => (
              <li key={ad._id}>
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to view recommendations and recent ads.</p>
      )}
    </div>
  );
};

export default HomePage;
