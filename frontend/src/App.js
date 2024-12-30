import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ComplaintPage from './pages/ComplainPage'; // Updated to match file
import ComplaintListPage from './pages/ComplaintListPage'; // Matches updated name
import AdPage from './pages/AdPage';
import PostAdPage from './pages/PostAdPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SearchSublets from './components/SearchSublet';
import EditAdPage from './components/EditAdPage';
import EditProfilePage from './components/EditProfilePage';
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/ads" element={<AdPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-sublets" element={<SearchSublets />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/post-ad" element={user ? <PostAdPage /> : <Navigate to="/login" />} />
        <Route path="/edit-ad/:id" element={user ? <EditAdPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={user ? <EditProfilePage /> : <Navigate to="/login" />} />
        <Route
          path="/admin"
          element={user && user.isAdmin ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/complaints"
          element={user && user.isAdmin === true ? <ComplaintListPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
