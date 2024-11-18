// src/pages/ProfilePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, selectUserLoading, selectUserError } from '../redux/slices/userSlice';

const ProfilePage = ({ userId }) => {
  const dispatch = useDispatch();

  // Access Redux state
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Fetch user when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  // Render loading state
  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  // Render error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the user profile
  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          {/* Add more user info fields here */}
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default ProfilePage;
