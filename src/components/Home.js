import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Bagian Peta Kerjasama */}
      <section className="map-section">
        <img src={'/images/mapworld.png'} alt="Peta Kerjasama Global" className="map-image" />
      </section>

      {/* Bagian Informasi Global */}
      <section className="info-section">
        <p>
          Secara Global, Universitas Yarsi menjalin kerjasama sebanyak...., baik <strong>Domestik</strong> maupun <strong>Internasional</strong>, termasuk diantaranya
        </p>
        <button className="btn-mitra">Daftar Semua Mitra →</button>
      </section>

      {/* Bagian Konten Kerjasama */}
      <div className="home-content">
        {/* Kerja Sama Domestik */}
        <div className="content-box">
          <h2>Kerja Sama <span className="highlight">Domestik</span></h2>
          <p>Berdasarkan bentuk, jenis mitra, kerja sama:</p>
          <p className="cooperation-type">MoU</p>
          <hr />
          <p className="cooperation-type">MoA/IA</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '70%' }}>70%</div>
          </div>
        </div>

        {/* Kerja Sama Internasional */}
        <div className="content-box">
          <h2>Kerja Sama <span className="highlight">Internasional</span></h2>
          <p>Berdasarkan bentuk, jenis mitra, kerja sama:</p>
          <p className="cooperation-type">MoU</p>
          <hr />
          <p className="cooperation-type">MoA/IA</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '40%' }}>40%</div>
          </div>
        </div>
      </div>

      {/* Bagian Berita Terbaru */}
      <div className="home-news">
        <h2 className="news-title">Berita Terbaru</h2>
        <div className="news-container">
          <div className="news-item">
            <img src="/images/riset.png" alt="Berita 1" />
            <p>Selesaikan Tugas Akhir: Mahasiswa Melakukan Riset Buat...</p>
          </div>
          <div className="news-item">
            <img src="/images/india.png" alt="Berita 2" />
            <p>Kolaborasi Riset: Universitas Yarsi dengan Institusi Internasional...</p>
          </div>
          <div className="news-item">
            <img src="/images/peresmian.png" alt="Berita 3" />
            <p>Acara Pembukaan Program Studi Baru di Fakultas Kedokteran...</p>
          </div>
        </div>
      </div>

      {/* Bagian baru untuk logo mitra */}
      <section className="partner-logos">
        <h2 className="partner-title">Mitra Kami</h2>
        <div className="logo-container">
          <img src= './images/uthm.png' alt="Logo 2" className="partner-logo" />
          <img src= './images/education.png' alt="Logo 3" className="partner-logo" />
          <img src= './images/dayananda.png' alt="Logo 4" className="partner-logo" />
        </div>
      </section>
    </div>
  );
};

export default Home;
