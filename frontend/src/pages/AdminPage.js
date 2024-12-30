import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch complaints from the server
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.get('http://localhost:5000/api/admin/complaints', {
        headers: {
          Authorization: `Bearer ${token}` // Set the token in the Authorization header
        }
      });
      setComplaints(response.data); // Set the complaints data
    } catch (err) {
      console.error('Error fetching complaints:', err); // Log the error for debugging
      setError('Error fetching complaints');
    } finally {
      setLoading(false);
    }
  };

  // Call fetchComplaints when the component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Function to handle deleting a complaint
  const handleDeleteComplaint = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.delete(`http://localhost:5000/api/admin/complaints/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Set the token in the Authorization header
        }
      });
      // Update the state to remove the deleted complaint from the list
      setComplaints(complaints.filter(complaint => complaint._id !== id)); // Remove the deleted complaint from the state
    } catch (err) {
      console.error('Error deleting complaint:', err); // Log the error for debugging
      setError('Error deleting complaint');
    }
  };

  return (
    <div>
      <h1>Admin Complaints Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Complaint</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint._id}>
              <td>{complaint.user.name}</td>
              <td>{complaint.complaintText}</td>
              <td>{new Date(complaint.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDeleteComplaint(complaint._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;