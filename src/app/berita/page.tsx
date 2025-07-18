import {prisma} from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

async function getAllBerita() {
    const berita = await prisma.berita.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return berita;
}

export default async function BeritaPage() {
    const allBerita = await getAllBerita();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12" data-aos="fade-down">
                <h1 className="text-4xl font-bold text-gray-800">Arsip Berita Desa</h1>
                <p className="mt-2 text-lg text-gray-600">Ikuti perkembangan dan informasi terbaru dari Desa Kedungwungu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allBerita.map((item) => (
                    <Link href={`/berita/${item.id}`} key={item.id} className="group block bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-48 w-full">
                            <Image 
                                src={item.imageUrl || '/images/berita-placeholder.jpg'} 
                                alt={item.title} 
                                fill 
                                style={{objectFit: 'cover'}}
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                {item.content.substring(0, 100)}...
                            </p>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-xs text-gray-500">
                                <Calendar size={14} className="mr-2" />
                                <span>{new Date(item.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}