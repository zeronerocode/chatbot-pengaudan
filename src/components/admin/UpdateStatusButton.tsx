"use client";

import { useState, FC, useTransition } from 'react';
import type { Pengaduan } from '@prisma/client';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ReportStatus = 'Menunggu' | 'Sedang Diproses' | 'Selesai';

const statusOptions: ReportStatus[] = ['Menunggu', 'Sedang Diproses', 'Selesai'];

interface UpdateStatusButtonProps {
    pengaduan: Pengaduan;
}

const UpdateStatusButton: FC<UpdateStatusButtonProps> = ({ pengaduan }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleUpdateStatus = async (newStatus: ReportStatus) => {
        setIsOpen(false);
        startTransition(async () => {
            try {
                const response = await fetch(`/api/pengaduan/${pengaduan.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (!response.ok) {
                    throw new Error('Gagal memperbarui status');
                }
                
                // Refresh data di halaman untuk melihat perubahan
                router.refresh();

            } catch (error) {
                console.error(error);
                alert('Terjadi kesalahan saat memperbarui status.');
            }
        });
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Memperbarui...
                        </>
                    ) : (
                        <>
                            Ubah Status
                            <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                        </>
                    )}
                </button>
            </div>

            {isOpen && (
                <div 
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {statusOptions.map((status) => (
                            <button
                                key={status}
                                onClick={() => handleUpdateStatus(status)}
                                disabled={pengaduan.status === status}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                role="menuitem"
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateStatusButton;
