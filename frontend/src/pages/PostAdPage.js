import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAd } from '../redux/slices/adSlice';

const PostAdPage = () => {
  const [ad, setAd] = useState({ title: '', description: '', rent: '', location: '', preferredOccupation: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postAd(ad)).unwrap();
      alert('Ad Posted!');
    } catch (error) {
      alert('Error posting ad');
      console.error('Ad submission error:', error);
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <h1>Post an Ad</h1>
        <input type="text" placeholder="Title" value={ad.title} onChange={(e) => setAd({ ...ad, title: e.target.value })} />
        <textarea placeholder="Description" value={ad.description} onChange={(e) => setAd({ ...ad, description: e.target.value })} />
        <input type="number" placeholder="Rent" value={ad.rent} onChange={(e) => setAd({ ...ad, rent: e.target.value })} />
        <input type="text" placeholder="Location" value={ad.location} onChange={(e) => setAd({ ...ad, location: e.target.value })} />
        <input type="text" placeholder="Preferred Occupation" value={ad.preferredOccupation} onChange={(e) => setAd({ ...ad, preferredOccupation: e.target.value })} />
        <button type="submit">Post Ad</button>
      </form>
    </div>
  );
};

export default PostAdPage;
