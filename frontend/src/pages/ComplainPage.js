import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
  const [accusedPostTitle, setAccusedPostTitle] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // Check authentication
  React.useEffect(() => {
    if (!user) {
      alert('Please login to submit a complaint');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a complaint.');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/complaints/create', {
        userId: user._id, // Using the MongoDB _id
        accusedPostTitle,
        complaintText
      });
      alert(response.data.message || 'Complaint submitted successfully!');
      // Clear form
      setAccusedPostTitle('');
      setComplaintText('');
      navigate('/')
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert(error.response?.data?.message || 'Failed to submit the complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Submit a Complaint</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="accusedPostTitle" className="block font-medium">
            Accused Post Title:
          </label>
          <input
            id="accusedPostTitle"
            type="text"
            value={accusedPostTitle}
            onChange={(e) => setAccusedPostTitle(e.target.value)}
            required
            disabled={loading}
            className="w-full p-2 border rounded"
            placeholder="Enter the title of the post you're complaining about"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="complaintText" className="block font-medium">
            Your Complaint:
          </label>
          <textarea
            id="complaintText"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            required
            disabled={loading}
            className="w-full p-2 border rounded h-32"
            placeholder="Please describe your complaint in detail"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
};

export default ComplaintPage;