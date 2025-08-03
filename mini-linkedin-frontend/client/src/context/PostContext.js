// src/context/PostContext.js
import React, { createContext, useReducer, useCallback } from 'react'; // 1. Import useCallback
import api from '../api';

// Initial state
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

// Create context
export const PostContext = createContext(initialState);

// Reducer
const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case 'POST_ERROR':
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Provider component
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // 2. Wrap getPosts in useCallback
  const getPosts = useCallback(async () => {
    try {
      const res = await api.get('/posts');
      dispatch({
        type: 'GET_POSTS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'POST_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }, []); // 3. Add empty dependency array

  // 4. Wrap addPost in useCallback as well for consistency
  const addPost = useCallback(async (formData) => {
    try {
      const res = await api.post('/posts', formData);
      dispatch({
        type: 'ADD_POST',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'POST_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }, []); // 5. Add empty dependency array

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        loading: state.loading,
        error: state.error,
        getPosts,
        addPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
