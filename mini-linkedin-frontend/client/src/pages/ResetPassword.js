// src/pages/ResetPassword.js
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ResetPassword = () => {
    const { resetPassword } = useContext(AuthContext); // We will add this function to the context
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        resetPassword(token, { password });
        setMessage('Password has been reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
    };

    return (
        <div className="form-container">
            <h1>Set New Password</h1>
            {message && <div className="popup success" style={{ position: 'static', transform: 'none', marginBottom: '1rem' }}><p>{message}</p></div>}
            {error && <div className="popup error" style={{ position: 'static', transform: 'none', marginBottom: '1rem' }}><p>{error}</p></div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm New Password</label>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        required
                        minLength="6"
                    />
                </div>
                <input type="submit" value="Reset Password" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

export default ResetPassword;
