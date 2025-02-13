import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import axiosInstance from './axiosConfig';

const RegisterForm = () => {
  const navigate = useNavigate();

  // State untuk menyimpan input form dan validasi
  const [formData, setFormData] = useState({
    name: '', 
    position: '', 
    agency: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isValidasi, setIsValidasi] = useState(false); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const [loading, setLoading] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validasi minimal
    validateForm({ ...formData, [name]: value });
  };

  // Validasi form
  const validateForm = (data) => {
    const { name, position, agency, email, password, confirmPassword } = data;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      name &&
      position &&
      agency &&
      emailPattern.test(email) &&
      password.length >= 4 &&
      password === confirmPassword
    ) {
      setIsValidasi(true);
    } else {
      setIsValidasi(false);
    }
  };

  // Fungsi untuk menangani submit form
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidasi) {
      setError('Form tidak valid. Mohon periksa kembali.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log("Mengirim data ke backend:", {
        name: formData.name,
        position: formData.position,
        agency: formData.agency,
        email: formData.email,
        password: formData.password,
      });
      const response = await axiosInstance.post(
        '/users/register',
        {
          name: formData.name, // Sesuai schema Prisma
          position: formData.position,
          agency: formData.agency,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Registrasi berhasil:', response.data);
      setSuccess('Registrasi berhasil! Silakan login.');
      setFormData({
        name: '',
        position: '',
        agency: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error("Error saat registrasi:", error.response?.data || error.message);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nama"
            name="name" // Menggunakan field "name"
            className="register-input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Jabatan"
            name="position" // Menggunakan field "position"
            className="register-input"
            value={formData.position}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Instansi"
            name="agency" // Menggunakan field "agency"
            className="register-input"
            value={formData.agency}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="register-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="register-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="register-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {/* Error atau Success Message */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          {/* Tombol Register */}
          <button type="submit" className="register-button" disabled={!isValidasi || loading}>
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
