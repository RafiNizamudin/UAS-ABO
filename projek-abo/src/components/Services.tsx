// File: components/Services.tsx
const services = [
  { icon: '🩺', title: 'Konsultasi Medis', desc: 'Konsultasi dengan dokter ahli dari berbagai spesialisasi.' },
  { icon: '💉', title: 'Vaksinasi', desc: 'Program vaksinasi lengkap untuk melindungi Anda dari penyakit.' },
  { icon: '🩹', title: 'Penanganan Darurat', desc: 'Layanan cepat dan tepat untuk kondisi darurat 24 jam.' },
  { icon: '🩻', title: 'Radiologi & Laboratorium', desc: 'Pemeriksaan akurat untuk kebutuhan diagnostik Anda.' },
  { icon: '🚑', title: 'Ambulance', desc: 'Layanan Ambulance merupakan sarana yang siap memfasilitasi kegiatan evakuasi medis dengan menggunakan ambunlance.' },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <h2 className="section-title">Layanan Kami</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <article key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}