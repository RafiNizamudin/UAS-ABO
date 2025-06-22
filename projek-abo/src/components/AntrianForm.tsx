import React, { useState } from 'react';
import supabase from '../utils/supabase';
import BuktiPerjanjian from './BuktiPerjanjian';

export default function AntrianForm() {
  const [inputId, setInputId] = useState('');
  const [bukti, setBukti] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', inputId.trim())
      .single();

    if (error || !data) {
      alert('Data tidak ditemukan');
      setBukti(null);
      return;
    }

    setBukti({
      id: data.id,
      nama: data.nama,
      poli: data.poli,
      dokter: data.dokter,
      tanggal: data.tanggal,
      jam: data.jam,
      antrian: data.nomor_antrian,
    });
  };

  return (
    <div className="form-container">
      <h2>Cari Nomor Antrian</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label htmlFor="cari-id">Masukkan ID Perjanjian</label>
        <input
          id="cari-id"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          required
        />
        <button type="submit">Cari</button>
      </form>

      {bukti && <BuktiPerjanjian {...bukti} />}
    </div>
  );
}
