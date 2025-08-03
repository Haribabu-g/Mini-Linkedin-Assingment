// src/components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    // We get loading and user from the context now
    const { isAuthenticated, logout, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    const authLinks = (
        <ul>
            <li>
                <Link to="/">Feed</Link>
            </li>
            <li>
                {/* This link will only render when the user object is fully loaded */}
                {user && <Link to={`/profile/${user._id}`}>My Profile</Link>}
            </li>
            <li>
                <a onClick={onLogout} href="#!">
                    Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar">
            <h1>
                <Link to="/">Mini-LinkedIn</Link>
            </h1>
            {/* We also wait for the loading state to be false before showing links */}
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
        </nav>
    );
};

export default Navbar;
