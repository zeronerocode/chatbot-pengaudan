"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // --- Simulasi Logika Autentikasi ---
        // Di aplikasi nyata, di sini Anda akan memanggil API
        // untuk memverifikasi kredensial pengguna.
        setTimeout(() => {
            if (email === 'admin@desa.id' && password === 'password') {
                // Jika berhasil, arahkan ke dashboard admin
                router.push('/admin');
            } else {
                setError('Email atau password salah.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <Link href="/">
                        <Image src="/vercel.svg" alt="Logo Desa" width={200} height={50} className="mx-auto" />
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        Masuk ke Panel Admin
                    </h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="admin@desa.id"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="password"
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-400"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <LogIn className="mr-2" />}
                            Masuk
                        </button>
                    </div>
                </form>
                 <p className="text-sm text-center text-gray-500">
                    Kembali ke <Link href="/" className="font-medium text-emerald-600 hover:text-emerald-500">Beranda</Link>
                </p>
            </div>
        </div>
    );
}