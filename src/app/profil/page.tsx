import type { NextPage } from "next";
import Header from "@/components/Header";

const ProfilPage: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white/90 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto mt-10 mb-10 border border-blue-100">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-8 border-b-2 border-blue-200 pb-4 text-center tracking-wide drop-shadow">
            Profil Instansi
          </h1>
          <div className="space-y-10 text-gray-700">
            <section className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-blue-800">
                  Tentang Kami
                </h2>

                <p className="mt-2 leading-relaxed text-justify">
                  Lhok Awe Teungoh merupakan salah satu Gampong/desa yang ada di
                  kecamatan Kota Juang, Kabupaten Bireuen, provinsi Aceh
                  Indonesia, yang letaknya berbatas dengan kecamatan Kuala, yang
                  terdiri dari 3 dusun yaitu Dusun Makmur, dusun Mulia dam dusun
                  Pante bahagia. Desa ini mempunyai satu meunasah yang letaknya
                  persis di dusun pante bahagia. Semua kegiatan keagamaan dan
                  rapat desa diadakan di Menasah ini. Selain itu, masjid
                  kecamatan kota juang bireuen yang bernama Masjid Al-Furqan ada
                  di Desa Lhok Awe Teungoh juga. Masjid Al-Furqan selalu
                  disesaki Jamaah pada pelaksanaan Ibadah Salat Jum'at. Letak
                  Desa ini sangat strategis yang berada di antara daerah pesisir
                  dan kota; kira2 2 km ke arah laut dan 2 km menuju Kota
                  Bireuen. Dengan memiliki lahan pertanian seluas 30 Ha, desa
                  ini diharapkan berswasembada pangan. Suasana Desa Lhok Awe
                  Teungoh sangat nyaman untuk ditinggali dan terkenal dengan
                  keramahan sosial masyarakatnya. Siapa pun yang sudah pernah
                  tinggal disini pasti ingin miliki tanah untuk dibangun rumah
                  disana.
                </p>
              </div>
            </section>
            <section className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-green-800">
                  Visi & Misi
                </h2>
                <p className="mt-2">
                  <span className="font-bold text-green-700">Visi:</span>{" "}
                  Menjadi lembaga pelayanan publik yang transparan, responsif,
                  dan akuntabel.
                </p>
                <p className="mt-1">
                  <span className="font-bold text-green-700">Misi:</span>{" "}
                  Menyediakan sarana pengaduan yang mudah diakses, memproses
                  setiap pengaduan dengan cepat dan tepat, serta memberikan
                  solusi yang memuaskan bagi masyarakat.
                </p>
              </div>
            </section>
            <section className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100">
                  <svg
                    className="h-8 w-8 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 2v2a4 4 0 01-8 0V2m8 0a4 4 0 00-8 0m8 0v2a4 4 0 01-8 0V2m8 0a4 4 0 00-8 0m8 0v2a4 4 0 01-8 0V2m8 0a4 4 0 00-8 0M4 22h16M4 22v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-yellow-800">
                  Kontak Kami
                </h2>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>
                    <span className="font-semibold text-yellow-700">
                      Alamat:
                    </span>{" "}
                    Jl. Merdeka No. 123, Lhokseumawe, Aceh
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-700">
                      Email:
                    </span>{" "}
                    <a
                      href="mailto:kontak@pengaduandesa.id"
                      className="underline hover:text-yellow-900"
                    >
                      kontak@pengaduandesa.id
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-700">
                      Telepon:
                    </span>{" "}
                    <a
                      href="tel:06451234567"
                      className="underline hover:text-yellow-900"
                    >
                      (0645) 123-4567
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilPage;
