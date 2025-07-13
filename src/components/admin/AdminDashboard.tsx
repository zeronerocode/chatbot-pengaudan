"use client";

import React from 'react';
import { Inbox, Loader2, CheckCircle2 } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import type { Pengaduan } from '@prisma/client';
import UpdateStatusButton from './UpdateStatusButton'; // Impor komponen baru

// --- Tipe Data ---
interface StatCardProps {
    title: string;
    value: string;
    icon: ReactNode;
    color: string;
}

export type ReportStatus = 'Menunggu' | 'Sedang Diproses' | 'Selesai';

interface StatusBadgeProps {
    status: ReportStatus;
}

interface AdminDashboardProps {
    stats: {
        total: number;
        proses: number;
        selesai: number;
    };
    latestReports: Pengaduan[];
}

// --- Komponen Anak ---
const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
    const baseClasses = "px-3 py-1 rounded-full font-medium text-sm";
    const statusMap: Record<ReportStatus, string> = {
        "Menunggu": "bg-yellow-100 text-yellow-800",
        "Sedang Diproses": "bg-orange-100 text-orange-800",
        "Selesai": "bg-green-100 text-green-800",
    };
    return <span className={`${baseClasses} ${statusMap[status]}`}>{status}</span>;
};

const StatCard: FC<StatCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
        <div className={`text-white p-4 rounded-lg ${color}`}>{icon}</div>
        <div>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-gray-500">{title}</p>
        </div>
    </div>
);

const DataTable: FC<{ data: Pengaduan[] }> = ({ data }) => (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Pengaduan Terbaru</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b-2 border-gray-200">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600">No. Tiket</th>
                        <th className="p-4 font-semibold text-gray-600">Nama Pelapor</th>
                        <th className="p-4 font-semibold text-gray-600">Kontak</th>
                        <th className="p-4 font-semibold text-gray-600">Tanggal</th>
                        <th className="p-4 font-semibold text-gray-600">Jenis</th>
                        <th className="p-4 font-semibold text-gray-600">Status</th>
                        <th className="p-4 font-semibold text-gray-600 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 font-mono text-xs">{row.ticketNumber}</td>
                            <td className="p-4">{row.name}</td>
                            <td className="p-4">{row.phone}</td>
                            <td className="p-4">{new Date(row.createdAt).toLocaleDateString('id-ID')}</td>
                            <td className="p-4">{row.type}</td>
                            <td className="p-4"><StatusBadge status={row.status as ReportStatus} /></td>
                            <td className="p-4 text-center">
                                <UpdateStatusButton pengaduan={row} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Komponen Utama Dashboard ---
const AdminDashboard: FC<AdminDashboardProps> = ({ stats, latestReports }) => {
    
    const statCardsData: StatCardProps[] = [
        { title: "Total Pengaduan", value: stats.total.toString(), icon: <Inbox size={32} />, color: "bg-blue-500" },
        { title: "Sedang Diproses", value: stats.proses.toString(), icon: <Loader2 size={32} className="animate-spin" />, color: "bg-orange-500" },
        { title: "Selesai", value: stats.selesai.toString(), icon: <CheckCircle2 size={32} />, color: "bg-green-500" },
    ];

    return (
        <>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {statCardsData.map(card => (
                    <StatCard 
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                    />
                ))}
            </div>
            <DataTable data={latestReports} />
        </>
    );
}

export default AdminDashboard;