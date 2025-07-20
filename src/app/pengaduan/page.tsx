import Chatbot from '@/components/Chatbot';
import Header from '@/components/Header';

export default function PengaduanPage() {
  return (
    <div className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <Header />
      <div className="container mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
            <h1 className="text-4xl font-bold text-gray-800">Layanan Pengaduan Online</h1>
            <p className="mt-2 text-lg text-gray-600">Sampaikan keluhan atau masukan Anda melalui asisten virtual kami.</p>
        </div>
        <Chatbot />
      </div>
    </div>
  );
}