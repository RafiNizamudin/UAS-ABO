import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import AntrianForm from '../components/AntrianForm';
import PerjanjianForm from '../components/PerjanjianForm';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function PatientPage() {
  const [activeSection, setActiveSection] = useState<'antrian' | 'perjanjian' | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

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
                  navigate('/login');
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

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '6rem 2rem 2rem', // Padding top besar agar tidak ketutup header
        }}
      >
        <button onClick={() => setActiveSection('antrian')} className="btn-primary">
          Cari No Antrian
        </button>
        <button onClick={() => setActiveSection('perjanjian')} className="btn-primary">
          Form Perjanjian
        </button>

        {activeSection === 'antrian' && <AntrianForm />}
        {activeSection === 'perjanjian' && <PerjanjianForm />}
      </main>

      <Footer />
    </>
  );
}
