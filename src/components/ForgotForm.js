import React, { useState } from 'react';
import axiosInstance from './axiosConfig';
import './ForgotForm.css';

const ForgotForm = () => {
  const [email, setEmail] = useState(''); // State untuk email
  const [message, setMessage] = useState(''); // State untuk pesan sukses/error
  const [loading, setLoading] = useState(false); // State untuk loader
  const [error, setError] = useState(''); // State untuk pesan error

  // Handle perubahan input email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Fungsi submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('Mengirim permintaan lupa password ke backend:', email);

      // Kirim request menggunakan Axios
      const response = await axiosInstance.post(
        '/users/forgot-password',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Forgot password berhasil:', response.data);
      setMessage(response.data.message || 'Link reset password telah dikirim ke email Anda.');
    } catch (error) {
      console.error('Error saat mengirim permintaan lupa password:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <img
          src={process.env.PUBLIC_URL + '/images/logo-yarsi.png'}
          alt="Universitas Yarsi"
          className="forgot-password-logo"
        />
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2 className="forgot-password-title">Lupa Password</h2>
          <p className="forgot-password-description">
            Masukkan email Anda untuk mendapatkan link reset password.
          </p>
          <input
            type="email"
            placeholder="Email"
            className="forgot-password-input"
            value={email}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <button type="submit" className="forgot-password-button" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotForm;
