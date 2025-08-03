// src/components/posts/PostItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post: { _id, text, name, user, date } }) => {
  return (
    <div className="post">
      <div className="post-header">
        <h4>
          <Link to={`/profile/${user}`}>{name}</Link>
        </h4>
        <small className="post-date">
          {/* Changed to toLocaleString() to include the time */}
          Posted on {new Date(date).toLocaleString()}
        </small>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PostItem;
