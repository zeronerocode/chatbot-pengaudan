"use client";

import { useState, FC, useTransition, Fragment } from 'react';
import type { Pengaduan } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Loader2, Edit } from 'lucide-react';

interface UpdateResultModalProps {
    pengaduan: Pengaduan;
}

const UpdateResultModal: FC<UpdateResultModalProps> = ({ pengaduan }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [resultText, setResultText] = useState(pengaduan.result || '');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                const response = await fetch(`/api/pengaduan/${pengaduan.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ result: resultText }),
                });

                if (!response.ok) throw new Error('Gagal menyimpan hasil');
                
                setIsOpen(false);
                router.refresh();
            } catch (error) {
                console.error(error);
                alert('Terjadi kesalahan');
            }
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                <Edit size={16} className="mr-2" />
                Hasil
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Update Hasil Pengaduan</h3>
                        <p className="text-sm text-gray-500 mt-1">No. Tiket: {pengaduan.ticketNumber}</p>
                        
                        <form onSubmit={handleSubmit} className="mt-4">
                            <textarea
                                value={resultText}
                                onChange={(e) => setResultText(e.target.value)}
                                rows={5}
                                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Tuliskan hasil atau tindak lanjut dari pengaduan ini..."
                            />
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300"
                                >
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Simpan Hasil
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateResultModal;