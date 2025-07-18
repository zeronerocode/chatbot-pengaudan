import { forwardRef } from 'react';
import type { Pengaduan } from '@prisma/client';

type Props = {
  pengaduan: Pengaduan;
};

const CleanPengaduanPDF = forwardRef<HTMLDivElement, Props>(({ pengaduan }, ref) => (
  <div
    ref={ref}
    style={{
      padding: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#000',
      backgroundColor: '#fff',
      borderRadius: '8px',
      maxWidth: '800px',
      width: '100%',
    }}
  >
    <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Detail Pengaduan</h2>
    <p><strong>Nomor Tiket:</strong> {pengaduan.ticketNumber}</p>
    <p><strong>Nama:</strong> {pengaduan.name}</p>
    <p><strong>No. Telepon:</strong> {pengaduan.phone}</p>
    <p><strong>Jenis Pengaduan:</strong> {pengaduan.type}</p>
    <p><strong>Tanggal:</strong> {new Date(pengaduan.createdAt).toLocaleDateString('id-ID')}</p>
    <p><strong>Detail:</strong> {pengaduan.details}</p>
    {pengaduan.result && (
      <p><strong>Hasil:</strong> {pengaduan.result}</p>
    )}
  </div>
));

CleanPengaduanPDF.displayName = 'CleanPengaduanPDF';
export default CleanPengaduanPDF;
