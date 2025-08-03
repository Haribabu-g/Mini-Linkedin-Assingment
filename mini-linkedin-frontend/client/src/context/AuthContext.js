// src/context/AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api';

// (The initialState and authReducer remain the same as the previous final version)
const initialState = { token: localStorage.getItem('token'), isAuthenticated: null, loading: true, user: null, error: null };
const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'USER_LOADED': return { ...state, isAuthenticated: true, loading: false, user: payload };
    case 'LOGIN_SUCCESS': localStorage.setItem('token', payload.token); return { ...state, ...payload, isAuthenticated: true, loading: false, error: null };
    case 'REGISTER_SUCCESS': return { ...state, loading: false, error: null };
    case 'AUTH_ERROR': case 'LOGOUT': localStorage.removeItem('token'); return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: payload };
    case 'CLEAR_ERRORS': return { ...state, error: null };
    default: return state;
  }
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // loadUser, register, login, logout, clearErrors functions remain the same
  const loadUser = async () => { if (localStorage.token) { try { const res = await api.get('/auth'); dispatch({ type: 'USER_LOADED', payload: res.data }); } catch (err) { dispatch({ type: 'AUTH_ERROR' }); } } else { dispatch({ type: 'AUTH_ERROR' }); } };
  useEffect(() => { loadUser(); }, []);
  const register = async (formData) => { try { await api.post('/auth/register', formData); dispatch({ type: 'REGISTER_SUCCESS' }); } catch (err) { dispatch({ type: 'AUTH_ERROR', payload: err.response.data }); } };
  const login = async (formData) => { try { const res = await api.post('/auth/login', formData); dispatch({ type: 'LOGIN_SUCCESS', payload: res.data }); } catch (err) { dispatch({ type: 'AUTH_ERROR', payload: err.response.data }); } };
  const logout = () => dispatch({ type: 'LOGOUT' });
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  // --- ADD THESE NEW FUNCTIONS ---

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      await api.post('/auth/forgot-password', email);
    } catch (err) {
      console.error('Forgot password error', err.response.data);
    }
  };

  // Reset Password
  const resetPassword = async (token, password) => {
    try {
      await api.post(`/auth/reset-password/${token}`, password);
    } catch (err) {
      console.error('Reset password error', err.response.data);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
        forgotPassword, // Add to provider
        resetPassword,  // Add to provider
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
