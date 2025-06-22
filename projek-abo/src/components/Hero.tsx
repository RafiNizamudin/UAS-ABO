// File: components/Hero.tsx
export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <h1 className="hero-title">
        Selamat datang di RSU Delima, perawatan kesehatan terpercaya Anda
      </h1>
      <p className="hero-subtitle">
        Kami menyediakan layanan medis berkualitas dengan dokter profesional dan fasilitas modern.
      </p>
      <button onClick={scrollToContact} className="btn-primari">Hubungi Kami</button>
    </section>
  );
}