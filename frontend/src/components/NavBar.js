import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/post-ad">Post Ad</Link>
            <Link to="/search">Search Ads</Link>
        </nav>
    );
};

export default NavBar;
