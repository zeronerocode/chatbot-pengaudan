"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FaIdCard, FaHandHoldingHeart, FaServer, FaStore, FaNewspaper, FaChevronRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Slide {
  image: string;
}

export default function Hero() {
const slides: Slide[] = [
    { image: '/wall.jpg' },
    { image: 'https://placehold.co/1920x1080/059669/FFFFFF?text=Potensi+Desa' },
    { image: 'https://placehold.co/1920x1080/10b981/FFFFFF?text=Kegiatan+Warga' }
];

  return (
    <section className="relative overflow-hidden min-h-screen">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        loop={true}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        className="absolute inset-0 w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide.image} alt={`Slide ${index + 1}`} fill style={{ objectFit: 'cover' }} priority={index === 0} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-screen grid grid-cols-1 lg:grid-cols-5 items-center">
        <div className="lg:col-span-3 text-white text-center lg:text-left">
          <span className="inline-block bg-emerald-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4" data-aos="fade-down">DESA DIGITAL</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight" data-aos="fade-up">Desa Lhok Awe Teungoh</h1>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto lg:mx-0" data-aos="fade-up" data-aos-delay="100">Kecamatan Kota Juang, Kabupaten Biruen, Provinsi Aceh</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="200">
            <Link href="/profil" className="flex items-center space-x-2 bg-green-600 px-5 py-3 font-semibold rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg"><FaIdCard /><span>Profil Desa</span></Link>
          </div>
        </div>
        <div className="lg:col-span-2 w-full max-w-sm mx-auto lg:mx-0 lg:justify-self-end hidden lg:block" data-aos="fade-left">
          <div className="bg-gray-900/50 border border-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
            <h2 className="text-lg font-bold text-center mb-5">FITUR UNGGULAN</h2>
            <div className="space-y-3">
              <Link href="#layanan" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"><div className="flex items-center space-x-4"><div className="bg-green-600 p-3 rounded-md text-white"><FaServer className="text-lg" /></div><div><h3 className="font-semibold">Layanan ChatBot</h3><p className="text-xs text-white/60">Layanan Chat Bot</p></div></div><FaChevronRight className="text-white/30 group-hover:text-white transition-colors" /></Link>
              <Link href="#berita" className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"><div className="flex items-center space-x-4"><div className="bg-green-600 p-3 rounded-md text-white"><FaNewspaper className="text-lg" /></div><div><h3 className="font-semibold">Berita Desa</h3><p className="text-xs text-white/60">Informasi terkini</p></div></div><FaChevronRight className="text-white/30 group-hover:text-white transition-colors" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2"></div>
    </section>
  );
}