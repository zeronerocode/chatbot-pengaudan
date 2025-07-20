"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard,LogOut } from 'lucide-react';

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col h-screen fixed">
            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                Admin Desa
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map(item => (
                    <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href ? 'bg-slate-700 font-semibold' : 'hover:bg-slate-700'}`}>
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors">
                    <LogOut size={20} />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}