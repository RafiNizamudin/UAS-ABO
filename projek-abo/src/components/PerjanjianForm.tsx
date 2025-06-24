// File: components/PerjanjianForm.tsx
import React, { useState } from 'react';
import supabase from '../utils/supabase';
import BuktiPerjanjian from './BuktiPerjanjian';

const jadwalDokter: Record<string, { dokter: string; hari: string; jam: string }[]> = {
  'Umum': [
    { dokter: 'dr. Budi, Sp.PD', hari: 'Senin', jam: '08:00 - 12:00' },
    { dokter: 'dr. Budi, Sp.PD', hari: 'Rabu', jam: '08:00 - 12:00' },
  ],
  'Kardiologi': [
    { dokter: 'dr. Budi, Sp.PD', hari: 'Selasa', jam: '08:00 - 12:00' },
  ],
  'Anak': [
    { dokter: 'dr. Sari Andriani, Sp.A', hari: 'Sabtu', jam: '09:00 - 13:00' },
  ],
  'Kulit dan Kelamin': [
    { dokter: 'dr. Maya Lestari, Sp.KK', hari: 'Rabu', jam: '10:00 - 14:00' },
  ],
};

const dayNameFromDate = (dateStr: string): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[new Date(dateStr).getDay()];
};

export default function PerjanjianForm() {
  const [nama, setNama] = useState('');
  const [poli, setPoli] = useState('');
  const [dokter, setDokter] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bukti, setBukti] = useState<any>(null);

  const dokterOptions = poli ? jadwalDokter[poli].map(d => d.dokter) : [];
  const uniqueDokters = Array.from(new Set(dokterOptions));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hari = dayNameFromDate(tanggal);
    const jadwal = jadwalDokter[poli]?.find(d => d.dokter === dokter && d.hari === hari);

    if (!jadwal) {
      alert('Tanggal tidak sesuai jadwal dokter.');
      return;
    }

    // Hitung jumlah perjanjian untuk hari dan dokter yang sama
    const { count, error: countError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('tanggal', tanggal)
      .eq('dokter', dokter);

    if (countError || count === null) {
      alert('Gagal menghitung antrian.');
      console.error(countError);
      return;
    }

    const nomorAntrian = count + 1;

    const { data, error: insertError } = await supabase
      .from('appointments')
      .insert({
        nama,
        poli,
        dokter,
        tanggal,
        jam: jadwal.jam,
        nomor_antrian: nomorAntrian
      })
      .select()
      .single();

    if (insertError || !data) {
      alert('Gagal menyimpan perjanjian.');
      console.error(insertError);
      return;
    }

    setBukti({
      id: data.id,
      nama: data.nama,
      poli: data.poli,
      dokter: data.dokter,
      tanggal: data.tanggal,
      // jam: data.jam,
      // antrian: data.nomor_antrian,
    });

    setSubmitted(true);
  };

  return submitted && bukti ? (
    <BuktiPerjanjian {...bukti} />
  ) : (
    <div className="form-container">
      <h2 className="form-title">Formulir Perjanjian</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Pilih Poli</label>
          <select
            value={poli}
            onChange={(e) => {
              setPoli(e.target.value);
              setDokter('');
            }}
            required
          >
            <option value="" disabled>-- Pilih Poli --</option>
            {Object.keys(jadwalDokter).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Pilih Dokter</label>
          <select
            value={dokter}
            onChange={(e) => setDokter(e.target.value)}
            required
          >
            <option value="" disabled>-- Pilih Dokter --</option>
            {uniqueDokters.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Pilih Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Tangal Lahir</label>
          <input type="date" 
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
          />
        </div>

        <button type="submit">Buat Perjanjian</button>
      </form>
    </div>
  );
}
