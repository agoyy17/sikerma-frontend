import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('authToken'); // Mendapatkan token dari localStorage
  const role = localStorage.getItem('role'); // Mendapatkan role dari localStorage

  // Jika token tidak ada, arahkan pengguna ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai dengan requiredRole, arahkan ke halaman beranda atau halaman lain
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/beranda" replace />; // Ganti ke halaman yang sesuai
  }

  // Jika token ada dan role sesuai (atau tidak ada role yang dibutuhkan), render komponen anak
  return children;
};

export default ProtectedRoute;
