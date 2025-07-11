import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import EmployeeProfile from './components/EmployeeProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/employee/:id" element={<EmployeeProfile />} />
    </Routes>
  );
}

export default App;
