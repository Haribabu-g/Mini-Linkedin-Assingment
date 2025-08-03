// src/pages/Home.js
import React, { useContext, useEffect } from 'react';
import { PostContext, PostProvider } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import PostForm from '../components/posts/PostForm';
import PostItem from '../components/posts/PostItem';
import Spinner from '../components/layout/Spinner';
import { useNavigate } from 'react-router-dom';

// This is the actual content of the page
const HomeContent = () => {
    const { posts, loading, getPosts } = useContext(PostContext);
    const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // If authentication is still loading, do nothing yet
        if (authLoading) {
            return;
        }
        // If not authenticated, redirect to login
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            // Otherwise, get the posts
            getPosts();
        }
        // Rerun this effect if auth state changes
    }, [isAuthenticated, authLoading, getPosts, navigate]);

    // Show a spinner while posts are loading
    if (loading) return <Spinner />;

    return (
        <div>
            <h1 style={{ color: '#0a66c2' }}>Home Feed</h1>
            <p>Welcome to the community!</p>
            <PostForm />
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

// We wrap the page content in the PostProvider so it has access to post-related state
const Home = () => (
    <PostProvider>
        <HomeContent />
    </PostProvider>
);

export default Home;
