import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { fetchUser } from '../redux/slices/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const userId = decodedToken?.id;
    dispatch(fetchUser(userId));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log('User data:', user);
  console.log('Is user loaded?', !!user);

  return (
    <div>
      {user ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>{user.name}'s Profile</h1>
            <button 
              onClick={() => navigate('/edit-profile')}
              style={{ 
                padding: '12px 24px',
                marginLeft: '20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Edit Profile
            </button>
          </div>
          <p>Phone: {user.phone}</p>
          <p>Age: {user.age}</p>
          <p>Occupation: {user.occupation}</p>
          <h2>Your Ads</h2>
          <ul>
            {user.ads && user.ads.length > 0 ? (
              user.ads.map((ad) => (
                <li key={ad._id}>
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
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
