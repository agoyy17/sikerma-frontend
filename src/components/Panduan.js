import React from 'react';
import './Panduan.css';

const Panduan = () => {
  const templates = [
    {
      title: 'Template Nota Kesepahaman UY',
      description: 'Template Nota Kesepahaman (MoU) UY (Indonesia)',
      buttonLabel: 'Unduh',
      fileUrl: '/files/template-nota-kesepahaman-uy.pdf',
    },
    {
      title: 'Template PKS UY (Pertukaran Mahasiswa)',
      description: 'Template Nota Kesepahaman (MoA) UY (Indonesia)',
      buttonLabel: 'Unduh',
      fileUrl: '/files/template-pks-uy.docx',
    },
    {
      title: 'Template IA UY',
      description: 'Template Implementation Arrangement UY (Indonesia)',
      buttonLabel: 'Unduh',
      fileUrl: '/files/template-ia-uy.pdf',
    },
    {
      title: 'Peraturan Kerja Sama UY',
      description: 'Pedoman pelaksanaan kerja sama di lingkungan Yarsi',
      buttonLabel: 'Unduh',
      fileUrl: '/files/peraturan-kerja-sama-uy.pdf',
    },
    {
      title: 'Prosedur Kerja Sama Dalam Negeri UY',
      description: 'Prosedur untuk Kerja Sama dalam negeri UY meliputi penjajakan, perikatan, implementasi, pemantauan & evaluasi, pengembangan dan penghentian kerja sama.',
      buttonLabel: 'Unduh',
      fileUrl: '/files/prosedur-kerja-sama-dalam-negeri-uy.pdf',
    },
  ];

  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop(); 
    link.click();
  };

  return (
    <div className="panduan-template-container">
      <h2>Panduan & Template</h2>
      <div className="template-list">
        {templates.map((template, index) => (
          <div key={index} className="template-item">
            <div className="template-content">
              <h4>{template.title}</h4>
              {template.description && <p>{template.description}</p>}
            </div>
            <button
              className="unduh-button"
              onClick={() => handleDownload(template.fileUrl)}
            >
              {template.buttonLabel}
            </button>
          </div>
        ))}
      </div>
      {/* Bagian lainnya tetap sama */}
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
          <img src="./images/uthm.png" alt="Logo 2" className="partner-logo" />
          <img src="./images/education.png" alt="Logo 3" className="partner-logo" />
          <img src="./images/dayananda.png" alt="Logo 4" className="partner-logo" />
        </div>
      </section>
    </div>
  );
};

export default Panduan;
