import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles.css';
import { useLocation } from 'react-router-dom';
import usePreventBack from '../hooks/usePreventBack';


const LiquidHydrocarbonsForm = () => {
    const location = useLocation();
    const customerId = location.state.customerId;
    const zone = location.state.zone;
    const [responses, setResponses] = useState({
        question1: 3,
        question2: 3,
        question3: 3,
        question4: 3,
        question5: 3
    });
    usePreventBack();
    const handleChange = (e) => {
        setResponses({
            ...responses,
            [e.target.name]: Number(e.target.value)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseArray = [
                responses.question1,
                responses.question2,
                responses.question3,
                responses.question4,
                responses.question5
            ];
            await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback/submit`, {
                customerId,
                zone,
                product: 'Liquid Hydrocarbons',
                responses: responseArray,
            });
            alert('Feedback submitted successfully');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="container">
            <h1>Liquid Hydrocarbons Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>How Satisfied are you with the Quality of Liquid Hydrocarbons?</label>
                    <select name="question1" value={responses.question1} onChange={handleChange}>
                        <option value="5">Highly Satisfied</option>
                        <option value="4">Satisfied</option>
                        <option value="3">Neutral</option>
                        <option value="2">Dissatisfied</option>
                        <option value="1">Poor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>How Satisfied are you with the Availability of Liquid Hydrocarbons?</label>
                    <select name="question2" value={responses.question2} onChange={handleChange}>
                        <option value="5">Highly Satisfied</option>
                        <option value="4">Satisfied</option>
                        <option value="3">Neutral</option>
                        <option value="2">Dissatisfied</option>
                        <option value="1">Poor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>How Satisfied are you with the Pricing of Liquid Hydrocarbons?</label>
                    <select name="question3" value={responses.question3} onChange={handleChange}>
                        <option value="5">Highly Satisfied</option>
                        <option value="4">Satisfied</option>
                        <option value="3">Neutral</option>
                        <option value="2">Dissatisfied</option>
                        <option value="1">Poor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>How Satisfied are you with the Customer Service?</label>
                    <select name="question4" value={responses.question4} onChange={handleChange}>
                        <option value="5">Highly Satisfied</option>
                        <option value="4">Satisfied</option>
                        <option value="3">Neutral</option>
                        <option value="2">Dissatisfied</option>
                        <option value="1">Poor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>How Satisfied are you with the Overall Experience?</label>
                    <select name="question5" value={responses.question5} onChange={handleChange}>
                        <option value="5">Highly Satisfied</option>
                        <option value="4">Satisfied</option>
                        <option value="3">Neutral</option>
                        <option value="2">Dissatisfied</option>
                        <option value="1">Poor</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LiquidHydrocarbonsForm;
