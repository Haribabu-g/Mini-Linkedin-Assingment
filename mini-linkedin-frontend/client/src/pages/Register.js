// src/pages/Register.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    bio: '' // Add bio to the initial state
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const { name, email, password, password2, bio } = user; // Destructure bio

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      // Pass the entire user object, including the bio
      register({ name, email, password, bio });
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="form-container">
      {showSuccess && (
        <div className="popup success">
          <p>Registration successful! Redirecting to login...</p>
        </div>
      )}
      {error && (
        <div className="popup error">
          <p>{error}</p>
        </div>
      )}

      <h1>
        Account <span style={{ color: '#0a66c2' }}>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        {/* Add the Bio textarea */}
        <div className="form-group">
          <label htmlFor="bio">Bio (Optional)</label>
          <textarea
            name="bio"
            value={bio}
            onChange={onChange}
            rows="3"
            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: 'inherit' }}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Register;
