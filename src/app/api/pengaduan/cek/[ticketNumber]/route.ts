import { NextResponse } from 'next/server';
import {prisma} from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { ticketNumber: string } }
) {
  try {
    const { ticketNumber } = params;

    if (!ticketNumber) {
      return NextResponse.json({ message: 'Nomor tiket diperlukan' }, { status: 400 });
    }

    const pengaduan = await prisma.pengaduan.findUnique({
      where: { ticketNumber },
    });

    if (!pengaduan) {
      return NextResponse.json({ message: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(pengaduan, { status: 200 });
  } catch (error) {
    console.error('Cek Pengaduan Error:', error);
    return NextResponse.json({ message: 'Gagal mencari pengaduan' }, { status: 500 });
  }
}