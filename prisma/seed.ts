import { PrismaClient } from '@prisma/client';

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log(`Memulai proses seeding...`);

  // 1. Hapus semua berita yang ada untuk memastikan data yang bersih
  console.log('Menghapus data berita lama...');
  await prisma.berita.deleteMany({});
  console.log('Data lama berhasil dihapus.');

  // 2. Kumpulan data berita baru yang akan dimasukkan
  const allBeritaData = [
    {
      title: "Profil Gampong Lhok Awe Teungoh, Kecamatan Kota Juang",
      content: `Lhok Awe Teungoh merupakan salah satu Gampong/desa yang ada di kecamatan Kota Juang, Kabupaten Bireuen, provinsi Aceh Indonesia, yang letaknya berbatas dengan kecamatan Kuala, yang terdiri dari 3 dusun yaitu Dusun Makmur, dusun Mulia dam dusun Pante bahagia. Desa ini mempunyai satu meunasah yang letaknya persis di dusun pante bahagia. Semua kegiatan keagamaan dan rapat desa diadakan di Menasah ini. Selain itu, masjid kecamatan kota juang bireuen yang bernama Masjid Al-Furqan ada di Desa Lhok Awe Teungoh juga. Masjid Al-Furqan selalu disesaki Jamaah pada pelaksanaan Ibadah Salat Jum'at.

Letak Desa ini sangat strategis yang berada di antara daerah pesisir dan kota; kira2 2 km ke arah laut dan 2 km menuju Kota Bireuen. Dengan memiliki lahan pertanian seluas 30 Ha, desa ini diharapkan berswasembada pangan.

Suasana Desa Lhok Awe Teungoh sangat nyaman untuk ditinggali dan terkenal dengan keramahan sosial masyarakatnya. Siapa pun yang sudah pernah tinggal disini pasti ingin miliki tanah untuk dibangun rumah disana.`,
      author: "Admin Desa",
      imageUrl: "/images/berita-lhok-awe.jpg",
    },
    {
      title: "Warga Lhok Awe Teungoh Gelar Gotong Royong Jelang Musim Tanam",
      content: `Menjelang musim tanam padi tahun ini, puluhan warga Gampong Lhok Awe Teungoh antusias mengikuti kegiatan gotong royong membersihkan saluran irigasi utama desa pada hari Minggu, 13 Juli 2025. Kegiatan yang dikoordinir oleh aparatur desa ini bertujuan untuk memastikan kelancaran distribusi air ke 30 hektar lahan sawah milik warga.

Kepala Desa, Bapak Abdullah, menyatakan bahwa gotong royong ini adalah tradisi turun-temurun yang harus dijaga. "Dengan semangat kebersamaan, pekerjaan berat menjadi ringan. Alhamdulillah, saluran irigasi kini bersih dari sampah dan sedimen, siap mengairi sawah kita semua," ujarnya. Diharapkan dengan lancarnya irigasi, hasil panen tahun ini dapat meningkat secara signifikan.`,
      author: "Admin Desa",
      imageUrl: "/images/berita-gotong-royong.jpg",
    },
    {
      title: "Posyandu Bulan Juli Sukses, Puluhan Balita Dapatkan Imunisasi",
      content: `Kegiatan Posyandu (Pos Pelayanan Terpadu) 'Harapan Bunda' di Gampong Lhok Awe Teungoh kembali sukses digelar pada hari Selasa, 15 Juli 2025. Bertempat di meunasah desa, kegiatan ini berhasil melayani lebih dari 50 balita dan ibu hamil. Fokus utama kegiatan bulan ini adalah pemberian imunisasi dasar lengkap dan vitamin A.

Para kader kesehatan desa bersama tim dari Puskesmas Kota Juang dengan sigap melayani warga. Selain imunisasi, dilakukan juga penimbangan berat badan balita dan penyuluhan tentang pentingnya gizi seimbang untuk mencegah stunting. "Kami berterima kasih atas partisipasi aktif para ibu. Ini menunjukkan kesadaran akan kesehatan anak di desa kita sangat tinggi," kata Ibu Fatimah, ketua kader Posyandu.`,
      author: "Kader Posyandu",
      imageUrl: "/images/berita-posyandu.jpg",
    }
  ];

  // 3. Masukkan semua data berita baru menggunakan createMany
  console.log('Memasukkan data berita baru...');
  await prisma.berita.createMany({
    data: allBeritaData,
  });
  console.log(`Berhasil membuat ${allBeritaData.length} berita baru.`);

  console.log(`Seeding selesai.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    // Tutup koneksi Prisma
    await prisma.$disconnect();
  });
