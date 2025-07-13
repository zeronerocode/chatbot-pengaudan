import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, type, details, ticketNumber } = body;

    // Validasi data
    if (!name || !phone || !type || !details || !ticketNumber) {
        return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    // Simpan ke database menggunakan Prisma
    const newPengaduan = await prisma.pengaduan.create({
      data: {
        name,
        phone,
        type,
        details,
        ticketNumber,
        status: 'Menunggu', // Status awal
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Pengaduan berhasil disimpan.',
      data: newPengaduan 
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Gagal menyimpan pengaduan.' 
    }, { status: 500 });
  }
}
