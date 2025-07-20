import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold">Desa Kedungwungu</h3>
                        <p className="mt-4 text-sm text-gray-400">Website resmi pemerintah Desa Kedungwungu, Kecamatan Krangkeng, Kabupaten Indramayu.</p>
                        <div className="flex space-x-4 mt-4">
                            <span className="text-gray-400 hover:text-white cursor-default"><FaFacebookF /></span>
                            <span className="text-gray-400 hover:text-white cursor-default"><FaTwitter /></span>
                            <span className="text-gray-400 hover:text-white cursor-default"><FaInstagram /></span>
                            <span className="text-gray-400 hover:text-white cursor-default"><FaYoutube /></span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Akses Cepat</h3>
                        <ul className="mt-4 space-y-2">
                            <li><span className="text-sm text-gray-400">Profil Desa</span></li>
                            <li><span className="text-sm text-gray-400">Berita Desa</span></li>
                            <li><span className="text-sm text-gray-400">Layanan Publik</span></li>
                            <li><span className="text-sm text-gray-400">Data Statistik</span></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Layanan Unggulan</h3>
                        <ul className="mt-4 space-y-2">
                            <li><span className="text-sm text-gray-400">Surat Keterangan Usaha</span></li>
                            <li><span className="text-sm text-gray-400">Surat Keterangan Domisili</span></li>
                            <li><span className="text-sm text-gray-400">Pendaftaran KTP</span></li>
                            <li><span className="text-sm text-gray-400">Laporan Pengaduan</span></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Kontak Kami</h3>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start"><FaMapMarkerAlt className="mt-1 mr-3 text-emerald-400 flex-shrink-0" /><span className="text-sm text-gray-400">Jl. Raya Kedungwungu No. 123, Indramayu, Jawa Barat 45258</span></li>
                            <li className="flex items-start"><FaPhone className="mt-1 mr-3 text-emerald-400" /><span className="text-sm text-gray-400">(0234) 567-890</span></li>
                            <li className="flex items-start"><FaEnvelope className="mt-1 mr-3 text-emerald-400" /><span className="text-sm text-gray-400">kontak@kedungwungu.desa.id</span></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Pemerintah Desa Kedungwungu. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}
