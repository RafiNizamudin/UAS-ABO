import React from 'react';
import { useNavigate } from 'react-router-dom';

const Informasi: React.FC = () => {
    const navigate = useNavigate();
  return (
    <section id="informasi" className="doctor-box">
      <h2 className="section-title">Informasi</h2>
        <div className="doctor-actions">
          <button className="btn-doctor"onClick={() => navigate('/doctors')}>Lihat Dokter</button>
          <button className="btn-doctor"onClick={() => navigate('/login')}>Buat Perjanjian</button>
        </div>
    </section>
  );
};

export default Informasi;
