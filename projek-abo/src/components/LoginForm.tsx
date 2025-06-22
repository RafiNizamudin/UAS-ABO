// File: components/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [role, setRole] = useState('pasien');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login berdasarkan role
    navigate(`/${role}`);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Masuk ke Akun Anda</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="role">Login sebagai:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select"
        >
          <option value="pasien">Pasien</option>
          <option value="dokter">Dokter</option>
          <option value="admin">Admin</option>
        </select>

        <input type="text" placeholder="Email atau Nama Pengguna" required />
        <input type="password" placeholder="Kata Sandi" required />
        <button type="submit">Masuk</button>
      </form>
      <p className="form-footer">
        Belum punya akun?{' '}
        <button type="button" onClick={() => navigate('/register')} className="link-button">
          Daftar
        </button>
      </p>
    </div>
  );
}
