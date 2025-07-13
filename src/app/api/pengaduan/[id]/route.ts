import { NextResponse } from 'next/server';
import {prisma} from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ message: 'Status diperlukan' }, { status: 400 });
    }

    const updatedPengaduan = await prisma.pengaduan.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedPengaduan, { status: 200 });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ message: 'Gagal memperbarui status' }, { status: 500 });
  }
}