import React from 'react';
import './RegisterForm.css'; // Menghubungkan ke file CSS

const RegisterForm = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <img
          src={process.env.PUBLIC_URL + '/images/logo-yarsi.png'} // Sesuaikan dengan lokasi logo Anda
          alt="Universitas Yarsi"
          className="register-logo"
        />
        <form className="register-form">
          <input type="text" placeholder="Nama" className="register-input" />
          <select className="register-input">
            <option value="" selected>Akademik</option>
            <option value="" selected>Pemerintah</option>
            <option value="" selected>Industri</option>
            <option value="" selected>Organisasi</option>
            <option value="" selected>Fakultas</option>
            <option value="" selected>Program Studi</option>
            <option value="" disabled selected>Jenis Mitra</option>
            {/* Tambahkan opsi lainnya */}
          </select>
          <select className="register-input">
          <option value="" selected>Domestik</option>
          <option value="" selected>Internasional</option>
          <option value="" disabled selected>Kategori</option>
            {/* Tambahkan opsi lainnya */}
          </select>
          <input type="text" placeholder="Kategori" className="register-input" />
          <input type="text" placeholder="Negara" className="register-input" />
          <input type="email" placeholder="Email" className="register-input" />
          <input type="password" placeholder="Password" className="register-input" />
          <input type="password" placeholder="Confirm Password" className="register-input" />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
