import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotForm from './components/ForgotForm';
import Home from './components/Home';
import Beranda from './components/Beranda';
import Profile from './components/Profile';
import Repositori from './components/Repositori';
import Mitra from './components/Mitra';
import Layanan from './components/Layanan';
import Panduan from './components/Panduan';
import Pengajuan from './components/Pengajuan';
import Perpanjangan from './components/Perpanjangan';
import Adendum from './components/Adendum';
import EditProfile from './components/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotForm />} />
          <Route
            path="/beranda"
            element={
              <ProtectedRoute>
                <Beranda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/repositori"
            element={
              <ProtectedRoute>
                <Repositori />
              </ProtectedRoute>
            }
          />
          <Route path="/mitra" element={<Mitra />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/panduan" element={<Panduan />} />
          <Route
            path="/pengajuan-baru"
            element={
              <ProtectedRoute>
                <Pengajuan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perpanjangan"
            element={
              <ProtectedRoute>
                <Perpanjangan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adendum"
            element={
              <ProtectedRoute>
                <Adendum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
