import { useNavigate } from "react-router-dom";

// File: components/RegisterForm.tsx
export default function RegisterForm() {
    const navigate = useNavigate();
  return (
    <div className="form-container">
      <h2 className="form-title">Pendaftaran Pasien Baru</h2>
      <form className="register-form">

        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap</label>
          <input type="text" id="nama" name="nama" required />
        </div>

        <div className="form-group">
          <label htmlFor="tanggal-lahir">Tanggal Lahir</label>
          <input type="date" id="tanggal-lahir" name="tanggal_lahir" required />
        </div>

        <div className="form-group">
          <label htmlFor="alamat">Alamat</label>
          <input type="text" id="alamat" name="alamat" required />
        </div>

        <div className="form-group">
          <label htmlFor="telepon">Nomor Telepon</label>
          <input type="tel" id="telepon" name="telepon" required />
        </div>

        <div className="form-group">
          <label htmlFor="jenis-kelamin">Jenis Kelamin</label>
          <select id="jenis-kelamin" name="jenis_kelamin" required>
            <option value="" disabled selected>
              -- Pilih Jenis Kelamin --
            </option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="bpjs">Nomor BPJS (Opsional)</label>
          <input type="text" id="bpjs" name="bpjs" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Kata Sandi</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
          <input type="password" id="confirm-password" name="confirm_password" required />
        </div>

        <button type="submit" className="submit-button">
          Buat Akun
        </button>

      <p className="back-login-text">
        Sudah punya akun?{' '}
        <button type="button" className="back-login-button" onClick={() => navigate('/login')}>
          Kembali ke Login
        </button>
      </p>
      </form>
    </div>
  );
}
