"use client";

import Link from "next/link";
import {
  FaIdCard,
  FaServer,
  FaNewspaper,
  FaChevronRight,
} from "react-icons/fa";
import CekPengaduan from "./CekPengaduan"; // Impor komponen baru

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/wall.jpg')" }}
    >
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-screen grid grid-cols-1 lg:grid-cols-5 items-center">
        {/* Kiri: Teks Hero */}
        <div className="lg:col-span-3 text-white text-center lg:text-left">
          <span className="inline-block bg-emerald-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            DESA DIGITAL
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Desa Lhok Awe Teungoh
          </h1>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
            Kecamatan Kota Juang, Kabupaten Biruen, Provinsi Aceh
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/profil"
              className="flex items-center space-x-2 bg-green-600 px-5 py-3 font-semibold rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg"
            >
              <FaIdCard />
              <span>Profil Desa</span>
            </Link>
          </div>
          <div className="mt-10" data-aos="fade-up" data-aos-delay="300">
            <CekPengaduan />
          </div>
        </div>

        {/* Kanan: Fitur Unggulan */}
        <div className="lg:col-span-2 w-full max-w-sm mx-auto lg:mx-0 lg:justify-self-end hidden lg:block">
          <div className="bg-gray-900/50 border border-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
            <h2 className="text-lg font-bold text-center mb-5">
              FITUR UNGGULAN
            </h2>
            <div className="space-y-3">
              <Link
                href="/pengaduan"
                className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-600 p-3 rounded-md text-white">
                    <FaServer className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Layanan ChatBot</h3>
                    <p className="text-xs text-white/60">Layanan Chat Bot</p>
                  </div>
                </div>
                <FaChevronRight className="text-white/30 group-hover:text-white transition-colors" />
              </Link>

              <Link
                href="/berita"
                className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-600 p-3 rounded-md text-white">
                    <FaNewspaper className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Berita Desa</h3>
                    <p className="text-xs text-white/60">Informasi terkini</p>
                  </div>
                </div>
                <FaChevronRight className="text-white/30 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
