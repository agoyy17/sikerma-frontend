import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axiosInstance from './axiosConfig';

const LoginForm = () => {
  const navigate = useNavigate(); // Untuk navigasi
  const [formData, setFormData] = useState({ email: '', password: '' }); // State form
  const [error, setError] = useState(''); // State error message
  const [loading, setLoading] = useState(false); // State loader

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi handler untuk tombol Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validasi input kosong
    if (!formData.email || !formData.password) {
      setError('Email dan Password wajib diisi!');
      return;
    }

    setLoading(true); // Tampilkan loader
    setError(''); // Reset error sebelumnya

    try {
      console.log("Mengirim data login ke backend:", formData);
      const response = await axiosInstance.post(
        '/users/login',
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login berhasil:', response.data);

      if (response.data && response.data.data) {
        const { accessToken, user } = response.data.data;
        console.log('User Role:', user.role); // Debug role dari user

        // Simpan token dan role ke localStorage
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('role', user.role);  // Pastikan role disimpan

        // Redirect berdasarkan role
        const role = user.role;
        if (role === 'Admin' || role === 'Unit' || role === 'Staff') {
          navigate('/beranda'); // Admin, Unit, dan Staff menuju beranda
        } else if (role === 'User') {
          navigate('/beranda'); // Mitra menuju beranda (atau bisa arahkan ke halaman khusus mitra)
        } else {
          navigate('/beranda'); // Halaman default
        }
      }
    } catch (error) {
      console.error('Error saat login:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false); // Matikan loader
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="login-links">
        <Link to="/register" className="login-link">Register</Link>
        <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default LoginForm;
