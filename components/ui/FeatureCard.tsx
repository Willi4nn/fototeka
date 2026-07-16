'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import type { ElementType } from 'react';

const DEVELOP: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotate: index % 2 === 0 ? -5 : 5,
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
  index?: number;
};

export default function FeatureCard({
  title,
  description,
  features,
  image,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.li
      custom={index}
      variants={DEVELOP}
      className="group border-brand-darkbrown hover:border-brand-terracotta relative flex h-full flex-col overflow-hidden rounded-md border-2 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="bg-brand-beige/40 relative aspect-video w-full overflow-hidden">
        <motion.div variants={FOCUS} className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
        <div className="bg-brand-darkbrown/5 absolute inset-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />

        <span className="pointer-events-none absolute top-2.5 left-2.5 size-4 border-t-2 border-l-2 border-white opacity-0 transition-all delay-[0ms] duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute top-2.5 right-2.5 size-4 border-t-2 border-r-2 border-white opacity-0 transition-all delay-60 duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 size-4 border-b-2 border-l-2 border-white opacity-0 transition-all delay-60 duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-2.5 bottom-2.5 size-4 border-r-2 border-b-2 border-white opacity-0 transition-all delay-120 duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-between p-4 md:p-5">
        <h3 className="text-brand-terracotta mb-3 font-(family-name:--font-parisienne) text-[1.75rem] leading-tight md:mb-2 md:text-[2rem]">
          {title}
        </h3>

        <p className="text-brand-darkbrown/80 hidden text-[13px] leading-relaxed md:mb-5 md:block md:text-[14px]">
          {description}
        </p>

        <div aria-hidden="true" className="relative mb-4 flex w-full items-center justify-center">
          <div className="border-brand-darkbrown/10 absolute w-full border-t border-dashed" />
          <div className="relative flex gap-1 bg-white px-2">
            <span
              style={{ animationDelay: '0ms' }}
              className="bg-brand-terracotta/20 group-hover:bg-brand-terracotta size-1 rounded-full transition-colors group-hover:animate-pulse"
            />
            <span
              style={{ animationDelay: '150ms' }}
              className="bg-brand-terracotta/20 group-hover:bg-brand-terracotta size-1.5 rounded-full transition-colors group-hover:animate-pulse"
            />
            <span
              style={{ animationDelay: '300ms' }}
              className="bg-brand-terracotta/20 group-hover:bg-brand-terracotta size-1 rounded-full transition-colors group-hover:animate-pulse"
            />
          </div>
        </div>

        <ul className="flex w-full flex-col gap-1.5 text-left">
          {features.map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-center gap-2">
              <Icon
                strokeWidth={2}
                className="text-brand-terracotta/70 group-hover:text-brand-terracotta size-3.5 shrink-0 transition-colors"
              />
              <span className="text-brand-darkbrown/90 text-[9px] font-bold tracking-widest uppercase md:text-[10px]">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
