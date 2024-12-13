// front/src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import TaskUploadPage from './components/TaskUploadPage';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/upload" element={<TaskUploadPage />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;