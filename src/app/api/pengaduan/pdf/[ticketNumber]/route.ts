/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

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

    // --- Kop Surat dan Logo ---
    // Path logo (misal: public/logo.png)
    const logoPath = path.join(process.cwd(), 'public', '/images/logo_kab_bireuen.png');
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.15);

    // Draw logo
    page.drawImage(logoImage, {
      x: 50,
      y: height - 80,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Kop surat
    page.drawText('PEMERINTAH KABUPATEN BIREUEN', {
      x: 120,
      y: height - 50,
      font: boldFont,
      size: 13,
      color: rgb(0, 0, 0),
    });
    page.drawText('KECAMATAN KOTA JUANG', {
      x: 120,
      y: height - 68,
      font: boldFont,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText('GAMPONG LHOK AWEE', {
      x: 120,
      y: height - 86,
      font: boldFont,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText('Alamat: Jl. Banda Aceh - Meulaboh, Lhoknga, Aceh Besar', {
      x: 120,
      y: height - 104,
      font: font,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Garis bawah kop surat
    page.drawLine({
      start: { x: 50, y: height - 115 },
      end: { x: width - 50, y: height - 115 },
      thickness: 2,
      color: rgb(0, 0, 0),
    });

    let y = height - 140;

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