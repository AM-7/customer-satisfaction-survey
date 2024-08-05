import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../src/gail-logo.png'; 

const Home = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCustomerLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/customer-login', {
                customerName,
                customerId,
            });
            
            
            if (response.status === 200) {
                const {customerId, zone} = response.data;
                navigate('/customer-dashboard',{state : {customerId, zone}}); 
            }
        } catch (error) {
            setError('Invalid customer name or ID');
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="GAIL India" className="logo" />
            <h1>Customer Login</h1>
            <form onSubmit={handleCustomerLogin}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
            <a href="/admin-login">Admin Login</a>
        </div>
    );
};

export default Home;
