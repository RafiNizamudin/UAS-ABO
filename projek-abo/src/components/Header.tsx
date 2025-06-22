// File: components/Header.tsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      if (window.innerWidth > 640) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">RSU Delima</Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="mobile-toggle"
        >
          &#9776;
        </button>

        <div className={`nav-links${isMobile && menuOpen ? ' show' : ''}`} role="menubar">
          <a href="#about" role="menuitem">Tentang Kami</a>
          <a href="#services" role="menuitem">Layanan</a>
          <a href="#informasi" role="menuitem">Informasi</a>
          <a href="#contact" role="menuitem">Kontak</a>
        </div>
      </nav>
    </header>
  );
}