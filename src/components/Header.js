import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig'; // Konfigurasi Axios
import './Header.css'; // Menghubungkan ke file CSS

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const isHomePage = location.pathname === "/home";
  const isHomeOrLoginPage = location.pathname === "/" || location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isForgotPage = location.pathname === "/forgot-password";
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [role, setRole] = useState(''); // State untuk role pengguna
  const [name, setName] = useState(''); // State untuk nama pengguna
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]); // State untuk notifikasi

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem('userId');
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const userData = response.data.data;
      setName(userData.name); // Set nama pengguna
      setRole(userData.role); // Set role pengguna
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil notifikasi untuk pengguna
  const fetchNotifications = async () => {
    const userId = localStorage.getItem('userId');
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/notification?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      // Pastikan Anda mengakses properti yang benar dari respons API
      const notificationsData = response.data.data;
      console.log("Notifications Data:", notificationsData);
      // Set notifikasi ke state
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/beranda') {
      fetchUserProfile();
      fetchNotifications(); // Ambil notifikasi ketika berada di halaman beranda
    }
  }, [location.pathname]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false); // Menutup dropdown jika klik di luar
    }
    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
      setNotificationsOpen(false); // Menutup notifikasi jika klik di luar
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Menambahkan event listener untuk klik di luar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Membersihkan event listener saat komponen unmount
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('authToken'); // Hapus token
    localStorage.removeItem('userId');
    navigate('/home');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Navigasi ke halaman Edit Profile
  };

  return (
    <header>
      <div className="top-bar">
        <p>SELAMAT DATANG DI UNIVERSITAS YARSI</p>
      </div>
      <nav className="navbar">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/images/logo-yarsi.png'} alt="Universitas Yarsi Logo" />
        </div>
        {!isHomeOrLoginPage && !isRegisterPage && !isForgotPage && (
          <ul className="nav-links">
            {isHomePage ? (
              <>
                <li><Link to="/login">LOGIN</Link></li>
              </>
            ) : (
              <>
                <li>
                  <Link to={role === 'admin' ? '/AdminDashboard' : '/beranda'}>
                    HOME
                  </Link>
                </li>
                <li><Link to="/mitra">MITRA</Link></li>
                <li><Link to="/profile">PROFIL</Link></li>
                <li><Link to="/layanan">LAYANAN</Link></li>
                <li><Link to="/panduan">PANDUAN</Link></li>
                <div className="user-info">
                  {isLoading ? <span>Loading...</span>: <span>Hai, {name}</span>}
                  <div className={`user-icon-container ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} ref={dropdownRef}>
                    <img
                      src={process.env.PUBLIC_URL + '/images/user.png'}
                      alt="User"
                      className="user-icon"
                    />
                    {menuOpen && (
                      <ul className="dropdown-menu">
                        <li onClick={handleEditProfile}>Edit Profile</li>
                        <li onClick={handleLogout}>Log Out</li>
                      </ul>
                    )}
                  </div>
                  <div className="notification-container">
  <img
    src={process.env.PUBLIC_URL + '/images/bell.png'}
    alt="Notification Icon"
    className="notification-icon"
    onClick={toggleNotifications}
  />
  {notificationsOpen && (
    <ul className="notification-dropdown" ref={notificationsRef}>
      {isLoading ? (
        <li>Loading notifications...</li>
      ) : notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <li key={index}>
            <strong>{notification.title}</strong> - {notification.description}
          </li>
        ))
      ) : (
        <li>No notifications</li>
      )}
    </ul>
  )}
</div>
                </div>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
