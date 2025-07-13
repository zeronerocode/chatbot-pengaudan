import AdminDashboard from "@/components/admin/AdminDashboard";
import { prisma } from "@/lib/db";
import type { Pengaduan } from "@prisma/client";

// Fungsi untuk mengambil data statistik
async function getStats() {
    const total = await prisma.pengaduan.count();
    const proses = await prisma.pengaduan.count({ where: { status: 'Sedang Diproses' } });
    const selesai = await prisma.pengaduan.count({ where: { status: 'Selesai' } });
    
    return { total, proses, selesai };
}

// Fungsi untuk mengambil data pengaduan terbaru
async function getLatestReports(): Promise<Pengaduan[]> {
    const reports = await prisma.pengaduan.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc',
        },
    });
    return reports;
}

// Komponen Halaman Admin (Server Component)
export default async function AdminPage() {
    // Ambil data secara paralel
    const [stats, latestReports] = await Promise.all([
        getStats(),
        getLatestReports()
    ]);

    return <AdminDashboard stats={stats} latestReports={latestReports} />;
}
