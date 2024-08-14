import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [productCSI, setProductCSI] = useState({});
    const [zoneCSI, setZoneCSI] = useState({});
    const [overallCSI, setOverallCSI] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback/all-feedbacks');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
        const fetchCSI = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback/csi');
                const { productCSI, zoneCSI, overallCSI } = response.data;
                console.log('Fetched Product CSI:', productCSI);
                console.log('Fetched Zone CSI:', zoneCSI);
                console.log('Fetched Overall CSI:', overallCSI);
                setProductCSI(productCSI);
                setZoneCSI(zoneCSI);
                setOverallCSI(overallCSI);
            } catch (error) {
                console.error('Error fetching CSI:', error);
            }
        };

        fetchFeedbacks();
        fetchCSI();
    }, []);
    

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <h2>Feedbacks</h2>
            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Zone</th>
                        <th>Product</th>
                        <th>Responses</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedback => (
                        <tr key={feedback._id}>
                            <td>{feedback.customerId}</td>
                            <td>{feedback.zone}</td>
                            <td>{feedback.product}</td>
                            <td>{Object.values(feedback.responses).join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Customer Satisfaction Index (CSI)</h2>
            <h3>Overall CSI: {overallCSI !== null ? overallCSI.toFixed(2) : 'N/A'}</h3>
            <h3>Product-wise CSI</h3>
            <ul>
                {Object.entries(productCSI).map(([product, csi]) => (
                    <li key={product}>{product}: {csi !== null ? csi.toFixed(2) : 'N/A'}</li>
                ))}
            </ul>
            <h3>Zone-wise CSI</h3>
            <ul>
                {Object.entries(zoneCSI).map(([zone, csi]) => (
                    <li key={zone}>{zone}: {csi !== null ? csi.toFixed(2) : 'N/A'}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;