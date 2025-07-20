import Sidebar from "@/components/admin/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard ",
    description: "Halaman administrasi untuk website Desa Lhok Awe Teungoh.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}