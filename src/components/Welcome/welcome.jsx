import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './welcome.css';

const Welcome = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.username) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="welcome-banner-container">
            <h1 className="welcome-banner">
                Welcome to Paradise {username} 🥂
            </h1>
        </div>
    );
};

export default Welcome;
