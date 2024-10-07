import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginForm.css'; // Styling untuk form login

const LoginForm = () => {
  const navigate = useNavigate(); // Deklarasi useNavigate untuk navigasi

  // Fungsi handler untuk tombol Login
  const handleLogin = (e) => {
    e.preventDefault();
    // Logika autentikasi dapat ditambahkan di sini (opsional)
    navigate('/home'); // Navigasi ke halaman Home setelah login berhasil
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="login-links">
        <Link to="/register" className="login-link">Register</Link> {/* Tombol register */}
        <Link to="/forgot-password" className="login-link">Forgot Password?</Link> {/* Tombol Forgot Password */}
      </div>
    </div>
  );
};

export default LoginForm;
