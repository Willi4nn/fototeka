'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
            className="h-auto w-24 object-contain transition-opacity hover:opacity-80 lg:w-28"
          />
        </Link>

        <nav className="text-md hidden items-center gap-5 font-sans tracking-wide lg:flex lg:gap-8">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative font-semibold whitespace-nowrap text-white/90 transition-colors duration-300 hover:text-white"
            >
              {link.label}
              <span className="bg-brand-terracotta absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href="#contact" variant="primary" size="header">
            Solicitar Orçamento
          </Button>
        </div>

        <button
          className="shrink-0 text-white lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 flex w-full flex-col items-center gap-6 border-t border-white/10 bg-black/95 py-8 backdrop-blur-xl lg:hidden"
          >
            {HEADER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative text-lg font-semibold text-white/90 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="bg-brand-terracotta absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}

            <div className="mt-2 w-[80%] max-w-sm">
              <Button
                href="#contact"
                variant="primary"
                size="header"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitar Orçamento
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
