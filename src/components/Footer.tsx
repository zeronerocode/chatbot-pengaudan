import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold">Desa Kedungwungu</h3>
                        <p className="mt-4 text-sm text-gray-400">Website resmi pemerintah Desa Kedungwungu, Kecamatan Krangkeng, Kabupaten Indramayu.</p>
                        <div className="flex space-x-4 mt-4">
                            <Link href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white"><FaTwitter /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white"><FaInstagram /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white"><FaYoutube /></Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Akses Cepat</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#profil" className="text-sm text-gray-400 hover:text-white transition">Profil Desa</Link></li>
                            <li><Link href="#berita" className="text-sm text-gray-400 hover:text-white transition">Berita Desa</Link></li>
                            <li><Link href="#layanan" className="text-sm text-gray-400 hover:text-white transition">Layanan Publik</Link></li>
                            <li><Link href="#statistik" className="text-sm text-gray-400 hover:text-white transition">Data Statistik</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Layanan Unggulan</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Surat Keterangan Usaha</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Surat Keterangan Domisili</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Pendaftaran KTP</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Laporan Pengaduan</Link></li>
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