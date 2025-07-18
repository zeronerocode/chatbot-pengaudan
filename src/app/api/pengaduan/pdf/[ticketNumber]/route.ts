import { NextResponse } from 'next/server';
import {prisma} from '@/lib/db';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(
  request: Request,
  { params }: { params: { ticketNumber: string } }
) {
  try {
    const { ticketNumber } = params;
    const pengaduan = await prisma.pengaduan.findUnique({
      where: { ticketNumber },
    });

    if (!pengaduan) {
      return NextResponse.json({ message: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    // --- Pembuatan PDF ---
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let y = height - 50;

    const drawText = (text: string, x: number, yPos: number, options: { font?: any, size?: number, color?: any } = {}) => {
        page.drawText(text, {
            x,
            y: yPos,
            font: options.font || font,
            size: options.size || 11,
            color: options.color || rgb(0, 0, 0),
        });
    };

    drawText('Bukti Pengaduan Desa Lhok Awee', 50, y, { font: boldFont, size: 18 });
    y -= 30;

    page.drawLine({ start: { x: 50, y: y }, end: { x: width - 50, y: y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
    y -= 20;

    const drawField = (label: string, value: string) => {
        drawText(label, 50, y, { font: boldFont });
        drawText(value, 180, y);
        y -= 20;
    };

    drawField('Nomor Tiket', pengaduan.ticketNumber);
    drawField('Tanggal Lapor', new Date(pengaduan.createdAt).toLocaleString('id-ID'));
    drawField('Nama Pelapor', pengaduan.name);
    drawField('No. Telepon', pengaduan.phone);
    drawField('Jenis Pengaduan', pengaduan.type);
    drawField('Status', pengaduan.status);
    
    y -= 5;
    drawText('Detail Pengaduan:', 50, y, { font: boldFont });
    y -= 15;
    // Word wrapping manual
    const detailsLines = pengaduan.details.match(/.{1,80}/g) || [];
    detailsLines.forEach(line => {
        drawText(line, 50, y);
        y -= 15;
    });

    if (pengaduan.result) {
        y -= 5;
        drawText('Hasil Tindak Lanjut:', 50, y, { font: boldFont });
        y -= 15;
        const resultLines = pengaduan.result.match(/.{1,80}/g) || [];
        resultLines.forEach(line => {
            drawText(line, 50, y);
            y -= 15;
        });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="pengaduan-${ticketNumber}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ message: 'Gagal membuat PDF' }, { status: 500 });
  }
}