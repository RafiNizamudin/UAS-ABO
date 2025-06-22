// File: pages/Home.tsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Informasi from '../components/Informasi';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Informasi />
        <Contact />
      </main>
      <Footer />
    </>
  );
}