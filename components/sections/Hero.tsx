'use client';

import { motion, useReducedMotion } from 'framer-motion';

import Button from '@/components/ui/Button';
import { InstagramIcon } from '@/content/data';
import { PRIMARY_SECTION_LINKS } from '@/lib/navigation';
import { INSTAGRAM_URL } from '@/lib/site';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex h-[95vh] w-full items-center overflow-hidden">
      <div className="bg-brand-darkbrown absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/hero-poster.webp"
          className="h-full w-full object-cover object-center"
        >
          <source src="/hero/hero-video.webm" type="video/webm" />
          <source src="/hero/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 md:px-8 lg:px-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="font-pesto mb-8 text-5xl leading-[1.1] text-white uppercase md:text-7xl">
            A sua história <br /> merece ser eternizada.
          </h1>

          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <Button href={PRIMARY_SECTION_LINKS.contact} variant="primary" size="hero">
              Solicitar Orçamento
            </Button>
            <Button href={PRIMARY_SECTION_LINKS.services} variant="outline" size="hero">
              Ver Serviços
            </Button>
          </div>

          <div className="flex items-center gap-3 text-white">
            <span className="font-sans text-sm tracking-wide">Siga-nos</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram da Foto Teka"
              className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold transition-transform hover:scale-105 hover:text-fuchsia-500"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>

      <div className="bg-brand-beige absolute bottom-0 left-0 h-8 w-full rounded-t-4xl md:h-10 md:rounded-t-[3rem]" />
    </section>
  );
}
