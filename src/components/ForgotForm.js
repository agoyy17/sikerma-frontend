import React from 'react';
import './ForgotForm.css'; // Menghubungkan ke file CSS

const ForgotForm = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <img
          src={process.env.PUBLIC_URL + '/images/logo-yarsi.png'} // Sesuaikan dengan lokasi logo Anda
          alt="Universitas Yarsi"
          className="forgot-password-logo"
        />
        <form className="forgot-password-form">
          <h2 className="forgot-password-title">Lupa Password</h2>
          <p className="forgot-password-description">
            Masukkan email Anda untuk mendapatkan link reset password.
          </p>
          <input type="email" placeholder="Email" className="forgot-password-input" />
          <button type="submit" className="forgot-password-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotForm;
