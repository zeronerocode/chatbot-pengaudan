import type { NextPage } from 'next';
import Header from '@/components/Header';

const ProfilPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Profil Instansi</h1>
      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Tentang Kami</h2>
          <p className="mt-2">
            Kami adalah lembaga yang berkomitmen untuk memberikan pelayanan publik terbaik.
            Platform ini disediakan untuk menjembatani komunikasi antara masyarakat dan kami,
            memastikan setiap suara didengar dan setiap masalah ditindaklanjuti.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Visi & Misi</h2>
          <p className="mt-2">
            <strong>Visi:</strong> Menjadi lembaga pelayanan publik yang transparan, responsif, dan akuntabel.
          </p>
          <p className="mt-1">
            <strong>Misi:</strong> Menyediakan sarana pengaduan yang mudah diakses, memproses setiap pengaduan dengan cepat dan tepat, serta memberikan solusi yang memuaskan bagi masyarakat.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Kontak Kami</h2>
          <ul className="mt-2 list-inside list-disc">
            <li><strong>Alamat:</strong> Jl. Merdeka No. 123, Lhokseumawe, Aceh</li>
            <li><strong>Email:</strong> kontak@pengaduandesa.id</li>
            <li><strong>Telepon:</strong> (0645) 123-4567</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfilPage;