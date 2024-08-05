import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../src/styles.css';
import usePreventBack from '../hooks/usePreventBack';
const NaturalGasForm = () => {
    const location = useLocation();
   // console.log(location.state);
   // console.log(props);
    const customerId = location.state.customerId;
    const zone = location.state.zone;
    //console.log("zone: ", zone);
    const [responses, setResponses] = useState(Array(5).fill(3)); 
    usePreventBack();
    //Do same as CustomerDashboard to send cID
    const handleChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback/submit`, {
                customerId, 
                zone,
                product: 'Natural Gas',
                responses,
            });
            alert('Feedback submitted successfully');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="container">
            <h1>Natural Gas Feedback</h1>
            <form onSubmit={handleSubmit}>
                {[...Array(5)].map((_, index) => (
                    <div key={index}>
                        <label>Question {index + 1}</label>
                        <select value={responses[index]} onChange={(e) => handleChange(index, Number(e.target.value))}>
                            <option value={5}>Highly Satisfied</option>
                            <option value={4}>Satisfied</option>
                            <option value={3}>Neutral</option>
                            <option value={2}>Dissatisfied</option>
                            <option value={1}>Poor</option>
                        </select>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NaturalGasForm;
