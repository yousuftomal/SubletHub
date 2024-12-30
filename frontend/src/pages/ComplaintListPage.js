import React from 'react';
import ComplaintList from '../components/ComplainList'; // Matches the renamed file

const ComplaintListPage = () => {
  return (
    <div>
      <h1>Admin Complaints Dashboard</h1>
      <ComplaintList />
    </div>
  );
};

export default ComplaintListPage;
