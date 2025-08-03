// src/components/posts/PostForm.js
import React, { useState, useContext } from 'react';
import { PostContext } from '../../context/PostContext';

const PostForm = () => {
  const { addPost } = useContext(PostContext);
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <div className="post-form" style={{ marginBottom: '2rem' }}>
      <form onSubmit={onSubmit} className="form-container">
        <div className="form-group">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
