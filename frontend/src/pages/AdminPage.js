import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('Unauthorized');
      window.location = '/';
    }
  }, [user]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage Users and Posts Here</p>
    </div>
  );
};

export default AdminPage;
