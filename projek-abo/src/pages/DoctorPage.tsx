// File: pages/DoctorPage.tsx
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import supabase from '../utils/supabase';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';

const jadwalDokter = [
  { hari: 'Senin', jam: '08:00 - 12:00' },
  { hari: 'Rabu', jam: '08:00 - 12:00' },
];

const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export default function DoctorPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [pasienList, setPasienList] = useState<any[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  const today = new Date();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const isHariPraktik = (date: Date) => {
    const dayName = dayNames[getDay(date)];
    return jadwalDokter.some(j => j.hari === dayName);
  };

  const fetchPasien = async (date: string) => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('tanggal', date)
      .order('nomor_antrian', { ascending: true });

    if (!error) setPasienList(data || []);
    setSelectedDate(date);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
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

      <main style={{ marginTop: '5rem', padding: '2rem' }}>
        <h2>Kalender Jadwal Praktik</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
          {daysInMonth.map((date, index) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const isPraktik = isHariPraktik(date);
            return (
              <div
                key={index}
                onClick={() => isPraktik && fetchPasien(dateStr)}
                style={{
                  padding: '1rem',
                  background: isPraktik ? '#c6f6d5' : '#e2e8f0',
                  cursor: isPraktik ? 'pointer' : 'default',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <strong>{format(date, 'd')}</strong>
                <div style={{ fontSize: '0.8rem' }}>{dayNames[getDay(date)]}</div>
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Daftar Pasien - {format(new Date(selectedDate), 'dd MMMM yyyy', { locale: localeId })}</h3>
            {pasienList.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pasienList.map((p) => (
                  <li key={p.id} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                    <strong>{p.nomor_antrian}.</strong> {p.nama} ({p.poli})
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada pasien.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
