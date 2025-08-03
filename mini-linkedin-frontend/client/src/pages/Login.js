// src/pages/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Login = () => {
  const { login, isAuthenticated, error: authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (authError) {
      setError(authError.msg || 'Invalid Credentials');
    }
  }, [isAuthenticated, authError, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="form-container">
      {error && <div className="popup error"><p>{error}</p></div>}
      <h1>Account <span style={{ color: '#0a66c2' }}>Login</span></h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
      {/* Add Forgot Password Link */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
