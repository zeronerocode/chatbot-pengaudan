"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaRegCalendarAlt } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

interface BeritaItem {
    img: string;
    kategori: string;
    kategoriColor: string;
    judul: string;
    tanggal: string;
}

export default function BeritaSection() {
    const berita: BeritaItem[] = [
        { img: "https://placehold.co/600x400/34d399/FFFFFF?text=Berita+1", kategori: "Kegiatan", kategoriColor: "text-emerald-600", judul: "Gotong Royong Membersihkan Saluran Irigasi", tanggal: "05 Jul 2025" },
        { img: "https://placehold.co/600x400/fbbf24/FFFFFF?text=Pengumuman", kategori: "Pengumuman", kategoriColor: "text-amber-600", judul: "Jadwal Posyandu Bulan Agustus 2025", tanggal: "02 Jul 2025" },
        { img: "https://placehold.co/600x400/60a5fa/FFFFFF?text=UMKM", kategori: "UMKM", kategoriColor: "text-blue-600", judul: "Pelatihan Pemasaran Digital untuk Pelaku UMKM", tanggal: "28 Jun 2025" },
        { img: "https://placehold.co/600x400/f87171/FFFFFF?text=Pembangunan", kategori: "Pembangunan", kategoriColor: "text-red-600", judul: "Pembangunan Jalan Usaha Tani Tahap Pertama Selesai", tanggal: "25 Jun 2025" },
    ];

    return (
        <section id="berita" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div><h2 className="text-3xl font-bold text-gray-800">Informasi Terkini</h2><p className="text-gray-500 mt-1">Berita dan kegiatan terbaru dari desa kami.</p></div>
                    <Link href="/berita" className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition">Lihat Semua &rarr;</Link>
                </div>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ el: '.berita-pagination', clickable: true }}
                    breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                >
                    {berita.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="group bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                                <div className="relative h-48 w-full">
                                    <Image src={item.img} alt={item.judul} fill style={{objectFit:"cover"}} className="transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <span className={`text-xs font-semibold ${item.kategoriColor} uppercase`}>{item.kategori}</span>
                                    <h3 className="mt-2 text-lg font-bold text-gray-800 flex-grow">{item.judul}</h3>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <span><FaRegCalendarAlt className="inline mr-1" /> {item.tanggal}</span>
                                        <Link href="#" className="group-hover:text-emerald-600 font-semibold">Baca &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-pagination berita-pagination mt-8 text-center"></div>
            </div>
        </section>
    );
}