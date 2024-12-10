import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nationalID: '',
    age: '',
    occupation: '',
    profilePhoto: null,
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

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
    const resultAction = await dispatch(registerUser(formDataToSend));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/login'); // Navigate to the login page after successful registration
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="text" name="nationalID" placeholder="National ID" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} />
      <input type="file" name="profilePhoto" onChange={handleFileChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit" disabled={isLoading}>Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterPage;
