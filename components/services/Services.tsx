'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';

import FeatureCard from '../ui/FeatureCard';
import SectionHeader from '../ui/SectionHeader';
import { ADDITIONALS, EQUIPMENT } from './servicesData';

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const FOCUS_IN: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function FilmDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto my-16 flex w-full max-w-xs items-center justify-center gap-3 md:max-w-sm"
    >
      <span className="bg-brand-darkbrown/15 h-0.5 flex-1" />
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="border-brand-darkbrown/30 size-2.5 rounded-sm border-[1.5px] bg-transparent"
          />
        ))}
      </div>
      <span className="bg-brand-darkbrown/15 h-0.5 flex-1" />
    </div>
  );
}

export default function Services() {
  const reduceMotion = useReducedMotion();

  const listAnimProps = {
    initial: reduceMotion ? undefined : 'hidden',
    whileInView: reduceMotion ? undefined : 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: STAGGER,
  };

  const headerAnimProps = {
    initial: reduceMotion ? undefined : 'hidden',
    whileInView: reduceMotion ? undefined : 'visible',
    viewport: { once: true, amount: 0.3 },
    variants: FOCUS_IN,
  };

  return (
    <section
      id="services"
      className="bg-brand-beige relative z-10 w-full overflow-hidden py-16 md:py-24"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -left-20 z-0 md:top-1/3 md:-left-10"
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.75, rotate: -25 }}
        whileInView={reduceMotion ? undefined : { opacity: 0.5, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={reduceMotion ? undefined : { duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <Image
            src="/logos/icon-circle-foto-teka.png"
            alt=""
            width={500}
            height={500}
            priority
            className="h-auto w-auto opacity-80 md:w-150"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div {...headerAnimProps}>
          <SectionHeader
            subtitle="Nossos Serviços"
            title="EQUIPAMENTOS QUE TRANSFORMAM SEU EVENTO."
          />
        </motion.div>

        <motion.ul
          {...listAnimProps}
          className="mx-auto flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {EQUIPMENT.map((item, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]">
              <FeatureCard index={index} {...item} />
            </div>
          ))}
        </motion.ul>

        <FilmDivider />

        <motion.div {...headerAnimProps}>
          <SectionHeader title="ADICIONAIS EXCLUSIVOS" titleClassName="text-brand-darkbrown" />
        </motion.div>

        <motion.ul
          {...listAnimProps}
          className="mx-auto flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {ADDITIONALS.map((item, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]">
              <FeatureCard index={index} {...item} />
            </div>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
