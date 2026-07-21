'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

import { cn } from '@/lib/utils';
import SectionHeader from '../ui/SectionHeader';
import { TESTIMONIALS } from './testimonialsData';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  return (
    <section
      id="testimonials"
      className="bg-brand-midbrown/80 relative z-10 w-full overflow-hidden py-16"
    >
      <Image
        src="/logos/icon-circle-foto-teka-2.png"
        alt=""
        width={600}
        height={600}
        className="pointer-events-none absolute top-10 -right-32 z-0 h-auto w-auto opacity-40 md:top-1/4 md:-right-10"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
        <SectionHeader
          className="mb-10"
          subtitle="Depoimentos"
          subtitleClassName="text-brand-beige/90"
          title="QUEM VIVE, RECOMENDA!"
          titleClassName="text-white"
          dividerClassName="bg-brand-terracotta"
        />

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            aria-label="Ver depoimentos anteriores"
            className="border-brand-terracotta bg-brand-beige text-brand-terracotta hover:bg-brand-terracotta absolute top-1/2 -left-4 z-20 hidden -translate-y-1/2 items-center justify-center rounded-xl border p-2 shadow-sm transition-all hover:-translate-y-1/2 hover:text-white hover:shadow-md lg:flex xl:-left-12"
          >
            <ChevronLeft size={28} />
          </button>

          <motion.ul
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.1 }}
            variants={FADE_UP}
            ref={scrollRef}
            className="flex w-full snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto pt-4 pb-12 [-ms-overflow-style:none] md:gap-8 lg:px-4 [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <li
                key={index}
                className="flex w-[85%] shrink-0 snap-center flex-col justify-between md:w-87.5"
              >
                <div
                  className={cn(
                    'group relative flex h-full flex-col justify-between bg-white p-6 shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl md:p-8',
                    index % 2 === 0 ? 'rotate-1 md:rotate-2' : '-rotate-1 md:-rotate-2',
                  )}
                >
                  <Quote className="text-brand-terracotta/20 absolute top-6 right-6 h-8 w-8 md:h-10 md:w-10" />

                  <p className="text-brand-darkbrown relative z-10 mt-4 mb-8 font-sans text-sm leading-relaxed font-medium md:text-[15px]">
                    "{testimonial.text}"
                  </p>

                  <div className="border-brand-midbrown/20 flex w-full flex-col items-end border-t pt-4">
                    <span className="text-brand-terracotta font-madelyn text-2xl md:text-3xl">
                      {testimonial.name}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>

          <button
            onClick={() => scroll('right')}
            aria-label="Ver próximos depoimentos"
            className="border-brand-terracotta bg-brand-beige text-brand-terracotta hover:bg-brand-terracotta absolute top-1/2 -right-4 z-20 hidden -translate-y-1/2 items-center justify-center rounded-xl border p-2 shadow-sm transition-all hover:-translate-y-1/2 hover:text-white hover:shadow-md lg:flex xl:-right-12"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}
