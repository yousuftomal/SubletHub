import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error: reduxError } = useSelector((state) => state.user);
  const userId = localStorage.getItem('userId');
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user && user.ads) {
      // Ensure ads is an array and has valid _id fields
      const validAds = user.ads.filter(ad => ad && ad._id);
      setAds(validAds);
    }
  }, [user]);

  const handleDeleteAd = async (adId) => {
    console.log('Attempting to delete ad with ID:', adId);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/ads/delete/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAds(ads.filter(ad => ad._id !== adId));
    } catch (err) {
      console.error('Error deleting ad:', err);
      setError('Error deleting ad');
    }
  };

  const handleEditAd = (adId) => {
    if (!adId) {
      console.error('Invalid adId:', adId);
      setError('Invalid ad ID');
      return;
    }
    navigate(`/edit-ad/${adId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}'s Profile</h1>
          <p>Phone: {user.phone}</p>
          <p>Age: {user.age}</p>
          <p>Occupation: {user.occupation}</p>
<button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
<h2>Your Ads</h2>
          <ul>
            {ads && ads.length > 0 ? (
              ads.map((ad) => (
                <li key={ad._id}>
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Rent: {ad.rent}</p>
                  <p>Location: {ad.location}</p>
                  <button onClick={() => handleEditAd(ad._id)}>Edit</button>
                  <button onClick={() => handleDeleteAd(ad._id)}>Delete</button>
                </li>
              ))
            ) : (
              <p>No ads posted yet.</p>
            )}
          </ul>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
