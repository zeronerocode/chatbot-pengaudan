import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AOSInitializer from "@/components/AOSInitializer";

export default function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
        <AOSInitializer />
        <Header />
        <main className="flex-grow bg-white pt-20">
            {children}
        </main>
        <Footer />
    </div>
  );
}
