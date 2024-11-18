import React, { useState } from 'react';
import axios from 'axios';
import CustomModal from '../components/Modal';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nationalID: '',
    age: '',
    occupation: '',
    profilePhoto: null,
  });
  const [modalData, setModalData] = useState({ open: false, title: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/api/users/register', formDataToSend);
      setModalData({
        open: true,
        title: 'Success',
        message: 'User registered successfully!',
      });
    } catch (error) {
      setModalData({
        open: true,
        title: 'Error',
        message: 'Failed to register user. Please try again.',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="nationalID" placeholder="National ID" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} />
        <input type="file" name="profilePhoto" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
      <CustomModal
        open={modalData.open}
        onClose={() => setModalData({ ...modalData, open: false })}
        title={modalData.title}
        message={modalData.message}
      />
    </div>
  );
};

export default RegisterPage;
