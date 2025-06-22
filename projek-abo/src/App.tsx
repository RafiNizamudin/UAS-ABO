// File: App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctor />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/pasien" element={<PatientPage />} />
      <Route path="/dokter" element={<DoctorPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}