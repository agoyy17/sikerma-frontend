import React from "react";
import "./Layanan.css";

const Layanan = () => {
  const services = [
    {
      title: "Inisiasi Kemitraan",
      description: "Formulir inisiasi kemitraan",
      link: "#",
    },
    {
      title: "Evaluasi Kemitraan",
      description: "Formulir evaluasi kemitraan",
      link: "#",
    },
    {
      title: "Pelaporan Dokumen Kerjasama",
      description: "Formulir untuk melaporkan dokumen kerja sama di lingkungan Universitas Yarsi",
      link: "#",
    },
  ];

  return (
    <div className="layanan-container">
      <header className="layanan-header">
        <h1>Layanan</h1>
      </header>
      <div className="layanan-content">
        {services.map((service, index) => (
          <div key={index} className="layanan-item">
            <div className="layanan-info">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
            <button className="btn-buka" onClick={() => window.location.href = service.link}>
              Buka
            </button>
          </div>
        ))}
      </div>
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

export default Layanan;
