// src/pages/ForgotPassword.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
    const { forgotPassword } = useContext(AuthContext); // We will add this function to the context
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        forgotPassword({ email });
        setMessage('If an account with that email exists, a password reset link has been sent. Please check your Email.');
    };

    return (
        <div className="form-container">
            <h1>Reset Password</h1>
            <p>Enter your email address to receive a password reset link.</p>
            {message && <div className="popup success" style={{ position: 'static', transform: 'none', marginBottom: '1rem' }}><p>{message}</p></div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <input type="submit" value="Send Reset Link" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

export default ForgotPassword;
