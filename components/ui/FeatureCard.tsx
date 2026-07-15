'use client';

import type { ElementType } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};

type FeatureCardProps = {
  title: string;
  description: string;
  features: readonly { icon: ElementType; text: string }[];
  image: string;
};

export default function FeatureCard({ title, description, features, image }: FeatureCardProps) {
  return (
    <motion.li
      variants={FADE_UP}
      className="group border-brand-darkbrown hover:border-brand-terracotta relative flex flex-col overflow-hidden rounded-md border-4 bg-white text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full md:aspect-4/3">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col items-center p-4">
        <h3 className="text-brand-terracotta font-(family-name:--font-parisienne) text-3xl md:text-4xl">
          {title}
        </h3>

        <p className="text-brand-darkbrown my-4 text-[14px] leading-snug md:text-[16px]">
          {description}
        </p>

        <div className="bg-brand-beige mb-4 h-1 w-full" />

        <ul className="mt-auto flex w-full flex-col gap-2 text-left md:gap-2.5">
          {features.map(({ icon: Icon, text }, index) => (
            <li key={index} className="flex items-center gap-2">
              <Icon
                strokeWidth={1.5}
                className="text-brand-darkbrown size-4 shrink-0 md:size-4.5"
              />
              <span className="text-brand-darkbrown text-[9px] font-bold tracking-wider uppercase md:text-[10px]">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
