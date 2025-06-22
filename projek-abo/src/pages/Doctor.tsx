// File: pages/DoctorPage.tsx
import DoctorList from '../components/DoctorList';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Doctor() {
  return (
    <>
      <Header />
      <main>
        <DoctorList />
      </main>
      <Footer />
    </>
  );
}