import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import usePreventBack from '../hooks/usePreventBack';


const CustomerDashboard = () => {
    const location = useLocation();

    const customerId = location.state.customerId;
    const zone = location.state.zone;
    
    const [eligibleProducts, setEligibleProducts] = useState([]);
    const navigate = useNavigate();

   usePreventBack();
    
    useEffect(() => {
        const fetchEligibleProducts = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/eligible-products', {
                    customerId,
                });
               // console.log('API Response:', response.data);
                setEligibleProducts(response.data);
                
            } catch (error) {
                console.error('Error fetching eligible products:', error);
            }
        };

        fetchEligibleProducts();
    }, [customerId]);

    const handleProductClick = (product) => {
        switch (product) {
            case 'Natural Gas':
                navigate('/feedback/natural-gas', { state: { customerId, zone } });
                break;
            case 'Petrochemical':
                navigate('/feedback/petrochemical', { state: { customerId, zone } });
                break;
            case 'Liquid Hydrocarbons':
                navigate('/feedback/liquid-hydrocarbons', { state: { customerId, zone } });
                break;
            default:
                break;
        }
    };

    return (
        <div className="container">
            <h1>Customer Dashboard</h1>
            <ul>
                {eligibleProducts.length > 0? (
                eligibleProducts.map((product) => (
                    <li key={product} onClick={() => handleProductClick(product)}>
                    {product}
                    </li>
                ))
                ) : (
                <li>No eligible products found</li>
                )}
            </ul>
    </div>
    );
};

export default CustomerDashboard;
