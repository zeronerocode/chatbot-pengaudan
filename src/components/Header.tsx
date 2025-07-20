"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks: NavLink[] = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Berita', href: '/berita' }
  ];

  // Fungsi untuk cek apakah link aktif
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:-translate-y-0.5 duration-200">
            <Image src="/images/logo_kab_bireuen.png" alt="Logo Desa Kedungwungu" width={160} height={40} className="h-10 w-auto"/>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium pb-1 ${
                  isActive(link.href)
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-gray-600 hover:text-emerald-600 border-b-2 border-transparent hover:border-emerald-300 transition-all'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/pengaduan" className="text-sm font-medium px-5 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all">Pengaduan</Link>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-emerald-600 hover:bg-emerald-50 transition">
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 p-2">
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-2">
            {navLinks.map((link) => (
               <Link
                 key={link.name}
                 href={link.href}
                 className={`block px-4 py-2 text-base font-medium rounded-md ${
                   isActive(link.href)
                     ? 'text-emerald-700 bg-emerald-50'
                     : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-700'
                 }`}
                 onClick={() => setMobileMenuOpen(false)}
               >
                {link.name}
              </Link>
            ))}
            <div className="border-t pt-4 mt-2 space-y-2">
              <Link href="/pengaduan" className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-emerald-600 rounded-md">Pengaduan</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}