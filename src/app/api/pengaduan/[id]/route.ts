import { NextResponse } from 'next/server';
import {prisma} from '@/lib/db'; // Pastikan prisma diimpor dari lokasi yang benar

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, result } = body;

    if (!status && !result) {
      return NextResponse.json({ message: 'Status atau Hasil diperlukan' }, { status: 400 });
    }
    
    const dataToUpdate: { status?: string; result?: string } = {};
    if (status) dataToUpdate.status = status;
    if (result) dataToUpdate.result = result;

    const updatedPengaduan = await prisma.pengaduan.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedPengaduan, { status: 200 });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ message: 'Gagal memperbarui pengaduan' }, { status: 500 });
  }
}