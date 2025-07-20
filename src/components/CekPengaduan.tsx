"use client";

import { useState, FC, FormEvent } from 'react';
import type { Pengaduan } from '@prisma/client';
import { Loader2, Download, XCircle, Search, Ticket } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const StatusBadge: FC<{ status: string }> = ({ status }) => {
    const baseClasses = "px-3 py-1 rounded-full font-medium text-sm inline-block";
    const statusMap: Record<string, string> = {
        "Menunggu": "bg-yellow-100 text-yellow-800",
        "Sedang Diproses": "bg-orange-100 text-orange-800",
        "Selesai": "bg-green-100 text-green-800",
    };
    return <span className={`${baseClasses} ${statusMap[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};


export default function CekPengaduan() {
    const [ticketNumber, setTicketNumber] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);
    const [pengaduan, setPengaduan] = useState<Pengaduan | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleCekPengaduan = async (e: FormEvent) => {
        e.preventDefault();
        if (!ticketNumber) return;

        setStatus('loading');
        setError(null);
        setPengaduan(null);

        try {
            const response = await fetch(`/api/pengaduan/cek/${ticketNumber}`);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Pengaduan tidak ditemukan.');
            }
            const data: Pengaduan = await response.json();
            setPengaduan(data);
            setStatus('success');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
            setStatus('error');
        }
    };
    
    const handleDownloadPDF = async () => {
        if (!ticketNumber) return;
        setIsDownloading(true);
        try {
            const response = await fetch(`/api/pengaduan/pdf/${ticketNumber}`);
            if (!response.ok) {
                throw new Error('Gagal mengunduh PDF.');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pengaduan-${ticketNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat mengunduh PDF.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg max-w-xl mx-auto lg:mx-0">
            <h3 className="font-bold text-lg text-white mb-3">Lacak Pengaduan Anda</h3>
            <form onSubmit={handleCekPengaduan} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    placeholder="Masukkan nomor tiket..."
                    className="w-full p-3 bg-white/20 text-white placeholder-white/70 border-0 rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex items-center justify-center bg-white text-emerald-700 font-bold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-400"
                >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                    <span className="ml-2">Cek Status</span>
                </button>
            </form>

            {status === 'error' && (
                <div className="mt-4 bg-red-100/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-md flex items-center gap-3">
                    <XCircle />
                    <span>{error}</span>
                </div>
            )}

            {status === 'success' && pengaduan && (
                <div className="mt-6">
                    <div className="p-6 bg-white text-gray-800 rounded-lg">
                        <div className="flex justify-between items-start pb-4 border-b">
                            <div>
                                <h4 className="font-bold text-xl">Detail Pengaduan</h4>
                                <p className="text-sm text-gray-500 font-mono flex items-center gap-2"><Ticket size={14} />{pengaduan.ticketNumber}</p>
                            </div>
                            <StatusBadge status={pengaduan.status} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                            <div><strong className="block text-gray-500">Nama Pelapor</strong>{pengaduan.name}</div>
                            <div><strong className="block text-gray-500">No. Telepon</strong>{pengaduan.phone}</div>
                            <div><strong className="block text-gray-500">Jenis Pengaduan</strong>{pengaduan.type}</div>
                            <div><strong className="block text-gray-500">Tanggal Lapor</strong>{new Date(pengaduan.createdAt).toLocaleDateString('id-ID')}</div>
                        </div>
                        <div className="mt-4">
                            <strong className="block text-gray-500 text-sm">Detail Laporan</strong>
                            <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md border">{pengaduan.details}</p>
                        </div>
                        {pengaduan.result && (
                            <div className="mt-4">
                                <strong className="block text-gray-500 text-sm">Hasil Tindak Lanjut</strong>
                                <p className="text-sm mt-1 p-3 bg-emerald-50 rounded-md border border-emerald-200">{pengaduan.result}</p>
                            </div>
                        )}
                    </div>
                     <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="w-full mt-4 flex items-center justify-center bg-emerald-600 text-white font-bold px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors disabled:bg-emerald-400"
                    >
                        {isDownloading ? <Loader2 className="animate-spin mr-2" /> : <Download size={20} className="mr-2" />}
                        Download sebagai PDF
                    </button>
                </div>
            )}
        </div>
    );
}