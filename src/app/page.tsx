import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BeritaSection from '@/components/BeritaSection';
import Footer from '@/components/Footer';
import AOSInitializer from '@/components/AOSInitializer';

// Halaman ini sekarang hanya merakit komponen-komponen utama
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AOSInitializer />
      <Header />
      <main className="flex-grow">
        <Hero />
        {/* <BeritaSection /> */}
      </main>
      <Footer />
    </div>
  );
}