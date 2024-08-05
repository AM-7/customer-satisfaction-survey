import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../src/gail-logo.png'; // Ensure the path is correct

const AdminLogin = () => {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/admin-login', {
                adminUsername,
                adminPassword,
            });
            if (response.status === 200) {
                navigate('/admin-dashboard'); // Replace with your admin dashboard route
            }
        } catch (error) {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="GAIL India" className="logo" />
            <h1>Admin Login</h1>
            <form onSubmit={handleAdminLogin}>
                <input
                    type="text"
                    placeholder="Admin Username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
