'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if already logged in
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="w-8 h-8 border-4 border-accent-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4 grid-bg">
      <div className="w-full max-w-md p-8 rounded-3xl bg-bg-tertiary border border-border-color shadow-2xl glass-panel">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="p-3 rounded-2xl bg-accent-teal/10 text-accent-teal mb-3">
            <Cpu className="w-8 h-8 animate-pulse" />
          </Link>
          <h1 className="font-extrabold text-xl text-text-primary">Admin Control Center</h1>
          <p className="text-xs text-text-secondary mt-1">Provide credential keys to establish admin session</p>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-text-secondary">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-text-tertiary" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mustajaab.dev"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-text-secondary">Password Key</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-text-tertiary" />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-teal hover:bg-accent-teal/80 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-accent-teal/10 hover:shadow-accent-teal/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-semibold text-text-tertiary hover:text-accent-teal transition-colors">
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
