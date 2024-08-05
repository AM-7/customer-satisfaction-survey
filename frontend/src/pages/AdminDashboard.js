import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback/all-feedbacks');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <div className="table-responsive">
                <table className="feedback-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Zone</th>
                            <th>Product</th>
                            <th>Question 1</th>
                            <th>Question 2</th>
                            <th>Question 3</th>
                            <th>Question 4</th>
                            <th>Question 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td>{feedback.customerId}</td>
                                <td>{feedback.zone}</td>
                                <td>{feedback.product}</td>
                                <td>{feedback.responses[0]}</td>
                                <td>{feedback.responses[1]}</td>
                                <td>{feedback.responses[2]}</td>
                                <td>{feedback.responses[3]}</td>
                                <td>{feedback.responses[4]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
