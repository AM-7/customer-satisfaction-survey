// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import './styles.css';
import CustomerDashboard from './pages/CustomerDashboard';
import NaturalGasForm from './pages/NaturalGasForm';
import PetrochemicalForm from './pages/PetrochemicalForm';
import LiquidHydrocarbonsForm from './pages/LiquidHydrocarbonsForm';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/feedback/natural-gas" element={<NaturalGasForm />} />
                <Route path="/feedback/petrochemical" element={<PetrochemicalForm />} />
                <Route path="/feedback/liquid-hydrocarbons" element={<LiquidHydrocarbonsForm />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
