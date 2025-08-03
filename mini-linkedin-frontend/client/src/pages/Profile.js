// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Spinner from '../components/layout/Spinner';
import PostItem from '../components/posts/PostItem';

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setLoading(true);
        const profileRes = await api.get(`/users/${userId}`);
        const postsRes = await api.get(`/posts/user/${userId}`);
        
        setProfile(profileRes.data);
        setPosts(postsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (userId) {
        getProfileData();
    }
  }, [userId]);

  if (loading) return <Spinner />;

  if (!profile) return <h2>Profile not found</h2>;

  return (
    <div>
      <div className="post" style={{ marginBottom: '2rem' }}>
        <h2>{profile.name}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        {/* Updated to show the bio */}
        <p><strong>Bio:</strong> {profile.bio || 'No bio provided.'}</p>
        <small>Joined on {new Date(profile.date).toLocaleDateString()}</small>
      </div>

      <h2 style={{ color: '#0a66c2' }}>{profile.name}'s Posts</h2>
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <h4>This user has not posted anything yet.</h4>
        )}
      </div>
    </div>
  );
};

export default Profile;
