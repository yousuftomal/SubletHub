import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/admin/complaints');
        setComplaints(response.data);
      } catch (err) {
        setError('Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/complaints/delete/${id}`);
      setComplaints(complaints.filter(complaint => complaint._id !== id));
    } catch (err) {
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
                <button onClick={() => handleDelete(complaint._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;