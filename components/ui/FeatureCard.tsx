'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import type { ElementType } from 'react';

const DEVELOP: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotate: index % 2 === 0 ? -6 : 6,
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      rotate: { type: 'spring', stiffness: 140, damping: 14 },
    },
  },
};

const FOCUS: Variants = {
  hidden: { filter: 'blur(14px) grayscale(1) contrast(0.9) brightness(1.2)' },
  visible: {
    filter: 'blur(0px) grayscale(0) contrast(1) brightness(1)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

type FeatureCardProps = {
  title: string;
  description: string;
  features: readonly { icon: ElementType; text: string }[];
  image: string;
  hoverImage?: string;
  index?: number;
};

export default function FeatureCard({
  title,
  description,
  features,
  image,
  hoverImage,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.li
      custom={index}
      variants={DEVELOP}
      className="group relative flex aspect-4/5 w-full flex-col justify-end overflow-hidden bg-black text-left shadow-lg transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:shadow-2xl sm:aspect-3/4 md:aspect-4/5"
    >
      <motion.div variants={FOCUS} className="absolute inset-0 h-full w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={60}
          loading="lazy"
          decoding="async"
          suppressHydrationWarning
          className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${
            hoverImage ? 'group-hover:opacity-0' : ''
          }`}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={50}
            loading="lazy"
            decoding="async"
            suppressHydrationWarning
            className="scale-110 object-cover opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/5 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/70" />

      <div className="relative z-10 flex flex-col p-6 transition-transform duration-500 group-hover:-translate-y-2 md:p-8">
        <h3 className="font-madelyn mb-3 text-4xl leading-none text-white drop-shadow-md sm:text-[2.75rem] md:text-5xl">
          {title}
        </h3>

        <p className="mb-6 text-[14px] leading-relaxed text-white/90 drop-shadow-sm">
          {description}
        </p>

        <ul className="flex flex-col gap-3">
          {features.map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="group-hover:bg-brand-terracotta flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-300">
                <Icon strokeWidth={2.5} className="size-3.5 text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-white/95 uppercase drop-shadow-sm md:text-[11px]">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-5 right-5 size-6 border-t-[3px] border-r-[3px] border-white/80 opacity-0 transition-all delay-75 duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
      />
    </motion.li>
  );
}
