import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Replace with actual user ID
    dispatch(fetchUser(userId));
  }, [dispatch]);

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
