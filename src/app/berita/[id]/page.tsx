import {prisma} from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';

async function getBeritaById(id: string) {
    const berita = await prisma.berita.findUnique({
        where: { id },
    });
    if (!berita) {
        notFound();
    }
    return berita;
}

export default async function BeritaDetailPage({ params }: { params: { id: string } }) {
    const berita = await getBeritaById(params.id);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{berita.title}</h1>
                <div className="flex items-center gap-6 text-sm text-gray-500 mt-4 mb-6 border-b pb-4">
                    <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{berita.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(berita.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
                
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                    <Image 
                        src={berita.imageUrl || '/images/berita-placeholder.jpg'} 
                        alt={berita.title}
                        fill
                        style={{objectFit: 'cover'}}
                        priority
                    />
                </div>

                <div className="prose max-w-none">
                    {/* Menggunakan dangerouslySetInnerHTML jika kontennya adalah HTML, atau render biasa jika teks biasa */}
                    <p>{berita.content}</p>
                </div>
            </article>
        </div>
    );
}