// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';

import AuthCard from '../pages/AuthCard';
import { useAuth } from '../auth/AuthProvider';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }/>
  <Route path="/login"  element={<AuthCard />} />
  <Route path="/signup" element={<AuthCard />} />
</Routes>
    </Router>
  );
}