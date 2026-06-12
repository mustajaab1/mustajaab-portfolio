'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Building Public', target: 'building-in-public' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    if (pathname === '/') {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${target}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-bg-primary/80 backdrop-blur-md border-b border-border-color shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group font-semibold text-lg tracking-tight hover:text-accent-teal transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-accent-teal/10 text-accent-teal group-hover:bg-accent-teal/20 transition-all duration-300">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="bg-gradient-to-r from-text-primary via-accent-teal to-accent-cyan bg-clip-text text-transparent font-bold">
              Mustajaab Qadri
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.target)}
                  className="text-sm font-medium text-text-secondary hover:text-accent-teal cursor-pointer transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-teal hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith('/blog') ? 'text-accent-teal' : 'text-text-secondary hover:text-accent-teal'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/recruiter"
                className="flex items-center gap-1 text-sm font-semibold text-accent-teal hover:text-accent-cyan transition-colors"
              >
                Recruiter Hub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="h-5 w-px bg-border-color" />
            <ThemeToggle />
          </div>

          {/* Mobile Hamburguer & ThemeToggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-border-color text-text-secondary hover:text-accent-teal transition-all cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-border-color absolute top-full left-0 w-full py-6 px-4 flex flex-col gap-4 shadow-xl z-50">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.target)}
              className="w-full text-left py-2 px-3 text-base font-medium rounded-lg text-text-secondary hover:text-accent-teal hover:bg-accent-teal/5 transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 px-3 text-base font-medium rounded-lg text-text-secondary hover:text-accent-teal hover:bg-accent-teal/5 transition-all"
          >
            Blog
          </Link>
          <Link
            href="/recruiter"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-between py-2.5 px-3 text-base font-bold rounded-lg text-accent-teal bg-accent-teal/5 hover:bg-accent-teal/10 transition-all"
          >
            Recruiter Hub
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
