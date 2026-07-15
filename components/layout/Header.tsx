'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { HEADER_LINKS } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 border-b border-transparent transition-all duration-300',
        isScrolled ? 'bg-black/80 py-3 backdrop-blur-md' : 'bg-transparent py-5',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 md:px-8 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logos/logo-foto-teka.svg"
            alt="Logo Foto Teka"
            width={140}
            height={60}
            priority
            className="h-18 w-auto transition-opacity hover:opacity-80"
          />
        </Link>

        <nav className="text-md hidden items-center gap-5 font-sans tracking-wide text-white md:flex lg:gap-8">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-brand-terracotta font-semibold whitespace-nowrap transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 md:block">
          <Button href="#contact" variant="primary" size="header">
            Solicitar Orçamento
          </Button>
        </div>

        <button
          className="shrink-0 text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full left-0 flex w-full flex-col items-center gap-4 border-t border-white/10 bg-black/95 py-6 backdrop-blur-xl md:hidden"
        >
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
