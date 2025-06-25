import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Footer from '../components/Footer';

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
  const navigate = useNavigate();

  const handleTampilkan = () => {
    if (!selectedPeriode) return alert('Silakan pilih periode terlebih dahulu');
    setShowData(true);
  };

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}>
        RSU Delima
        <div style={{ position: 'absolute', right: '1.5rem', cursor: 'pointer' }}>
          <FaUserCircle size={28} onClick={() => setShowInfo(!showInfo)} />
          {showInfo && (
            <div style={{
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
            }}>
              <p><strong>Nama:</strong> John Doe</p>
              <p><strong>Peran:</strong> Admin</p>
              <p><strong>Email:</strong> john@example.com</p>
              <button onClick={() => navigate('/login')} style={{
                marginTop: '0.75rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                width: '100%',
              }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main style={{ padding: '6rem 2rem 2rem', fontFamily: 'Arial, sans-serif' }}>
        {/* Dokter per Poli */}
        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Data Dokter per Poli</h2>
          {Object.entries(dummyDokterPerPoli).map(([poli, dokters]) => (
            <div key={poli} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{poli}</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {dokters.map(d => (
                  <li key={d.id} style={{ marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => setSelectedDokter(d)}
                      style={{
                        backgroundColor: '#111',
                        color: '#fff',
                        padding: '6px 14px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      {d.nama}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Form Ubah Jadwal */}
          {selectedDokter && (
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Ubah Jadwal untuk {selectedDokter.nama}</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  placeholder="Hari"
                  value={jadwalBaru.hari}
                  onChange={e => setJadwalBaru({ ...jadwalBaru, hari: e.target.value })}
                  style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                  placeholder="Jam"
                  value={jadwalBaru.jam}
                  onChange={e => setJadwalBaru({ ...jadwalBaru, jam: e.target.value })}
                  style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <button
                onClick={() => alert('Jadwal berhasil diperbarui')}
                style={{
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Simpan
              </button>
            </div>
          )}
        </section>

        {/* Kunjungan & Statistik */}
        <section style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => { setView('kunjungan'); setShowData(false); }} style={btnStyle}>
              Kunjungan
            </button>
            <button onClick={() => { setView('statistik'); setShowData(false); }} style={btnStyle}>
              Statistik
            </button>
          </div>

          {/* Periode */}
          {view !== 'default' && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ marginRight: '0.5rem' }}>Pilih Periode:</label>
              <input
                placeholder="Contoh: 2025-06"
                value={selectedPeriode}
                onChange={e => setSelectedPeriode(e.target.value)}
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button onClick={handleTampilkan} style={{ ...btnStyle, marginLeft: '0.5rem' }}>
                Tampilkan
              </button>
            </div>
          )}

          {/* Tampilkan Data */}
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

          {view === 'statistik' && showData && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Statistik Pasien per Jadwal</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dummyStatistik}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jadwal" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#2563eb" />
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

// Style untuk tombol
const btnStyle = {
  backgroundColor: '#111',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};
