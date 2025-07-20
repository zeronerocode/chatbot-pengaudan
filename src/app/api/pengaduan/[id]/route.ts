import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID format (assuming UUID)
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json(
        { message: 'ID pengaduan tidak valid' }, 
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, result } = body;

    // Validate that at least one field is provided
    if (!status && !result) {
      return NextResponse.json(
        { message: 'Status atau hasil harus diisi' }, 
        { status: 400 }
      );
    }

    // Validate data types and values
    const dataToUpdate: { status?: string; result?: string } = {};
    
    if (status !== undefined) {
      if (typeof status !== 'string' || status.trim() === '') {
        return NextResponse.json(
          { message: 'Status harus berupa teks yang tidak kosong' }, 
          { status: 400 }
        );
      }
      dataToUpdate.status = status.trim();
    }

    if (result !== undefined) {
      if (typeof result !== 'string' || result.trim() === '') {
        return NextResponse.json(
          { message: 'Hasil harus berupa teks yang tidak kosong' }, 
          { status: 400 }
        );
      }
      dataToUpdate.result = result.trim();
    }

    // Check if record exists before updating
    const existingPengaduan = await prisma.pengaduan.findUnique({
      where: { id },
    });

    if (!existingPengaduan) {
      return NextResponse.json(
        { message: 'Pengaduan tidak ditemukan' }, 
        { status: 404 }
      );
    }

    // Update the record
    const updatedPengaduan = await prisma.pengaduan.update({
      where: { id },
      data: {
        ...dataToUpdate,
        updatedAt: new Date(), // Assuming you have updatedAt field
      },
    });

    return NextResponse.json({
      message: 'Pengaduan berhasil diperbarui',
      data: updatedPengaduan
    }, { status: 200 });

  } catch (error) {
    console.error('Update Error:', error);
    
    // Handle Prisma-specific errors
    if (error instanceof Error) {
      // Handle unique constraint violations, etc.
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { message: 'Data duplikat terdeteksi' }, 
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Gagal memperbarui pengaduan' }, 
      { status: 500 }
    );
  }
}