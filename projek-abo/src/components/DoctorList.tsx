// File: components/DoctorList.tsx
const doctors = [
  {
    icon: '🩺',
    title: 'Umum',
    doctors: [
      { name: 'dr. Budi, Sp.PD', schedule: 'Senin - Rabu' },
      { name: 'dr. Sinta, Sp.PD', schedule: 'Kamis - Sabtu' },
    ],
  },
  {
    icon: '❤️‍🩹',
    title: 'Kardiologi',
    doctors: [
      { name: 'dr. Budi, Sp.JP', schedule: 'Senin & Rabu' },
      { name: 'dr. Riko, Sp.JP', schedule: 'Jumat' },
    ],
  },
  {
    icon: '👶',
    title: 'Anak',
    doctors: [
      { name: 'dr. Sari Andriani, Sp.A', schedule: 'Selasa & Sabtu' },
      { name: 'dr. Vina, Sp.A', schedule: 'Kamis' },
    ],
  },
  {
    icon: '🦴',
    title: 'Ortopedi',
    doctors: [
      { name: 'dr. Dedi, Sp.OT', schedule: 'Senin - Rabu' },
      { name: 'dr. Herman, Sp.OT', schedule: 'Jumat' },
    ],
  },
  {
    icon: '🧴',
    title: 'Kulit dan Kelamin',
    doctors: [
      { name: 'dr. Maya Lestari, Sp.KK', schedule: 'Rabu' },
      { name: 'dr. Farah, Sp.KK', schedule: 'Senin & Jumat' },
    ],
  },
  {
    icon: '👁️',
    title: 'Mata',
    doctors: [
      { name: 'dr. Nia, Sp.M', schedule: 'Senin & Kamis' },
      { name: 'dr. Ahmad, Sp.M', schedule: 'Selasa' },
    ],
  },
  {
    icon: '🦷',
    title: 'Gigi',
    doctors: [
      { name: 'drg. Andi Putra', schedule: 'Senin - Kamis' },
      { name: 'drg. Lestari', schedule: 'Jumat & Sabtu' },
    ],
  },
  {
    icon: '🤰',
    title: 'Kandungan',
    doctors: [
      { name: 'dr. Rani, Sp.OG', schedule: 'Selasa & Sabtu' },
      { name: 'dr. Mita, Sp.OG', schedule: 'Kamis' },
    ],
  },
];

export default function DoctorList() {
  return (
    <section className="services">
      <h2 className="section-title">Poli</h2>
      <div className="services-grid">
        {doctors.map((poli, index) => (
          <article key={index} className="service-card">
            <div className="service-icon">{poli.icon}</div>
            <h3 className="service-title">{poli.title}</h3>
            <div className="service-desc">
              {poli.doctors.map((doc, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <strong>{doc.name}</strong><br />
                  <span style={{ color: '#475569' }}>{doc.schedule}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
