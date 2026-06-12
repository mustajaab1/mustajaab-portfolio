'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Send, ArrowUp } from 'lucide-react';
import { subscribeNewsletter } from '@/app/actions';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage('');
    setSuccess(null);

    try {
      const res = await subscribeNewsletter(email);
      setSuccess(res.success);
      setMessage(res.message);
      if (res.success) setEmail('');
    } catch (err) {
      setSuccess(false);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-auto bg-bg-secondary border-t border-border-color py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Info */}
          <div>
            <h3 className="font-bold text-lg text-text-primary mb-3">Mustajaab Qadri</h3>
            <p className="text-sm text-text-secondary max-w-sm mb-4">
              AI Engineer building Generative AI applications, agentic workflows, and RAG systems that deliver real-world business impact.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://github.com/mustajaab1"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-bg-tertiary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mustajaab/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-bg-tertiary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="mailto:mustajaabx@gmail.com"
                className="p-2 rounded-lg bg-bg-tertiary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="md:pl-10">
            <h4 className="font-semibold text-sm text-text-primary uppercase tracking-wider mb-4">Links</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/recruiter" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                Recruiter Portal
              </Link>
              <Link href="/blog" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                Technical Blog
              </Link>
              <Link href="/admin" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="font-semibold text-sm text-text-primary uppercase tracking-wider mb-3">
              Subscribe to Newsletter
            </h4>
            <p className="text-xs text-text-secondary mb-4">
              Get updates on Generative AI tutorials, agentic workflow concepts, and monthly project summaries.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 rounded-lg bg-bg-tertiary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-sm text-text-primary transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? '...' : <Send className="w-4 h-4" />}
              </button>
            </form>
            {message && (
              <p className={`text-xs mt-2 font-medium ${success ? 'text-accent-teal' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-color flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
          <p>© {new Date().getFullYear()} Mustajaab Qadri. All rights reserved.</p>
          <p>Built with Next.js 15, Tailwind CSS, Prisma & Neon</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-accent-teal text-white shadow-lg cursor-pointer hover:bg-accent-teal/80 z-40 transition-all duration-300 ${
          showScrollTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
