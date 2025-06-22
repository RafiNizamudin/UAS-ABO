// File: pages/AdminPage.tsx
import { useState } from 'react';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const dummyDokterPerPoli = {
  'Umum': [{ id: 1, nama: 'dr. Budi' }],
  'Anak': [{ id: 2, nama: 'dr. Sari' }],
  'Kulit': [{ id: 3, nama: 'dr. Maya' }],
};

const dummyKunjungan = [
  { poli: 'Umum', jumlah: 10 },
  { poli: 'Anak', jumlah: 5 },
  { poli: 'Kulit', jumlah: 8 },
];

const dummyStatistik = [
  { jadwal: 'Senin 08:00', jumlah: 4 },
  { jadwal: 'Rabu 10:00', jumlah: 7 },
  { jadwal: 'Sabtu 09:00', jumlah: 6 },
];

export default function AdminPage() {
  const [selectedDokter, setSelectedDokter] = useState<any>(null);
  const [jadwalBaru, setJadwalBaru] = useState({ hari: '', jam: '' });
  const [view, setView] = useState<'default' | 'kunjungan' | 'statistik'>('default');
  const [selectedPeriode, setSelectedPeriode] = useState('');
  const [showData, setShowData] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleTampilkan = () => {
    if (!selectedPeriode) return alert('Silakan pilih periode terlebih dahulu');
    setShowData(true);
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: 'fixed', top: 0, width: '100%',
          backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem', fontSize: '1.5rem', fontWeight: 'bold',
        }}
      >
        RSU Delima
        <div style={{ position: 'absolute', right: '1.5rem', cursor: 'pointer' }}>
          <FaUserCircle size={28} onClick={() => setShowInfo(!showInfo)} />

          {showInfo && (
            <div
              style={{
                position: 'absolute',
                top: '2.5rem',
                right: 0,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                padding: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                minWidth: '180px',
                fontSize: '0.9rem',
                zIndex: 1001,
              }}
            >
              <p><strong>Nama:</strong> John Doe</p>
              <p><strong>Peran:</strong> Pasien</p>
              <p><strong>Email:</strong> john@example.com</p>

              <button
                onClick={() => {
                  window.location.href = '/login';
                }}
                style={{
                  marginTop: '0.75rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  width: '100%',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ padding: '6rem 2rem 2rem' }}>
        {/* Dokter per Poli */}
        <section>
          <h2>Data Dokter per Poli</h2>
          {Object.entries(dummyDokterPerPoli).map(([poli, dokters]) => (
            <div key={poli}>
              <h3>{poli}</h3>
              <ul>
                {dokters.map(d => (
                  <li key={d.id}>
                    <button onClick={() => setSelectedDokter(d)}>{d.nama}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Form Ubah Jadwal */}
          {selectedDokter && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Ubah Jadwal untuk {selectedDokter.nama}</h3>
              <input placeholder="Hari" value={jadwalBaru.hari}
                onChange={e => setJadwalBaru(prev => ({ ...prev, hari: e.target.value }))} />
              <input placeholder="Jam" value={jadwalBaru.jam}
                onChange={e => setJadwalBaru(prev => ({ ...prev, jam: e.target.value }))} />
              <button onClick={() => alert('Jadwal berhasil diperbarui')}>Simpan</button>
            </div>
          )}
        </section>

        {/* Tombol Kunjungan & Statistik */}
        <section style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => { setView('kunjungan'); setShowData(false); }}>Kunjungan</button>
            <button onClick={() => { setView('statistik'); setShowData(false); }}>Statistik</button>
          </div>

          {/* Pilih Periode */}
          {view !== 'default' && (
            <div style={{ marginTop: '1rem' }}>
              <label>Pilih Periode:</label>
              <input
                placeholder="contoh: 2025-06"
                value={selectedPeriode}
                onChange={(e) => setSelectedPeriode(e.target.value)}
              />
              <button onClick={handleTampilkan}>Tampilkan</button>
            </div>
          )}

          {/* Hasil: Kunjungan (List) */}
          {view === 'kunjungan' && showData && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Rekap Kunjungan Pasien per Poli</h4>
              <ul>
                {dummyKunjungan.map((item, i) => (
                  <li key={i}>{item.poli}: {item.jumlah} pasien</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hasil: Statistik (Grafik) */}
          {view === 'statistik' && showData && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Statistik Pasien per Jadwal</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dummyStatistik}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jadwal" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#007BFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
