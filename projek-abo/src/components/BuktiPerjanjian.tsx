import supabase from '../utils/supabase';

type BuktiProps = {
  id: string;
  nama: string;
  poli: string;
  dokter: string;
  tanggal: string;
  tanggal_lahir: string;
  jam: string;
  antrian: number;
};

export default function BuktiPerjanjian({
  id,
  nama,
  poli,
  dokter,
  tanggal,
  tanggal_lahir,
  jam,
  antrian,
}: BuktiProps) {
  const handleCancel = async () => {
    const confirm = window.confirm('Apakah Anda yakin ingin membatalkan perjanjian ini?');
    if (!confirm) return;

    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) {
      alert('Gagal membatalkan perjanjian.');
      console.error(error);
    } else {
      alert('Perjanjian berhasil dibatalkan.');
      window.location.reload(); // Refresh halaman setelah dibatalkan
    }
  };

  return (
    <div className="bukti-card">
      <h2>Bukti Perjanjian</h2>
      <div className="bukti-info">
        <p><strong>ID Perjanjian:</strong> {id}</p>
        <p><strong>Nama:</strong> {nama}</p>
        <p><strong>Poli:</strong> {poli}</p>
        <p><strong>Dokter:</strong> {dokter}</p>
        <p><strong>Tanggal:</strong> {tanggal}</p>
        <p><strong>Tanggal Lahir:</strong> {tanggal_lahir}</p>
        <p><strong>Waktu Praktik:</strong> {jam}</p>
        <p><strong>Nomor Antrian:</strong> {antrian}</p>
      </div>

      <button onClick={handleCancel} className="btn-danger" style={{ marginTop: '1rem' }}>
        Batalkan Perjanjian
      </button>
    </div>
  );
}
