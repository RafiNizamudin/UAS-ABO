export default function Contact() {
  return (
    <section id="contact" className="contact-grid">
      <div className="contact-info-box">
        <h2 className="section-title" style={{ textAlign: 'left' }}>Informasi Kontak</h2>
        <p><strong>Alamat:</strong> Jalan Yos Sudarso KM 13.6 No.19A Martubung <br/>Kecamatan Medan Labuhan <br/>Kota Medan <br/>Sumatera Utara</p>
        <p><strong>Telepon IGD:</strong> (061) 685-5195 <span>(24 Jam)</span></p>
        <p><strong>Email:</strong> rsudelima25@gmail.com</p>
      </div>

      <div className="map-box">
        <h2 className="section-title" style={{ textAlign: 'left' }}>Lokasi Kami</h2>
        <div className="map-responsive">
          <iframe
            title="Lokasi RSU Delima"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.4996184961537!2d98.67130313832045!3d3.696261111449105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3036cd9736a2c5ed%3A0x347b7ffb2584d7a3!2sRumah%20Sakit%20Umum%20Delima!5e0!3m2!1sid!2sid!4v1719055202766!5m2!1sid!2sid"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
