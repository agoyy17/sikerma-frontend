import React from 'react';
import './Profile.css'; // Hubungkan dengan file CSS untuk styling

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Bagian Gambar */}
      <div className="profile-image-section">
        <img src={process.env.PUBLIC_URL + '/images/india.png'} alt="Kerjasama 1" className="profile-image" />
      </div>
      {/* Bagian Konten Profil */}
      <div className="profile-content">
        <p>
          Universitas YARSI adalah institusi dinamis yang mendorong inovasi dan keunggulan dalam pendidikan dan penelitian. 
          Inti dari misinya adalah dedikasi yang teguh terhadap kolaborasi. Universitas YARSI secara aktif menjalin hubungan dengan institusi pendidikan tinggi lainnya, 
          lembaga pemerintah, dan perusahaan terkemuka secara nasional dan internasional. Universitas YARSI meningkatkan kapasitasnya untuk menciptakan lingkungan pembelajaran 
          yang dinamis dan kompetitif secara global dengan membina kemitraan dengan rekan akademis, badan pemerintah, dan pemimpin industri. Melalui kolaborasi ini, universitas 
          memanfaatkan gabungan keahlian, sumber daya, dan pengalaman untuk memajukan upaya pendidikan dan penelitiannya, yang pada akhirnya membentuk masa depan yang lebih cerah bagi mahasiswanya dan memberikan dampak signifikan pada lanskap akademik global.
        </p>
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

export default Profile;
