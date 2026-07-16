'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';

import { ADDITIONALS, EQUIPMENT } from '@/content/data';
import FeatureCard from '../ui/FeatureCard';
import SectionHeader from './SectionHeader';

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
    <section id="services" className="bg-brand-beige relative z-10 w-full overflow-hidden py-16">
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
            className="h-auto w-auto md:w-150"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.div {...headerAnimProps}>
          <SectionHeader
            subtitle="Nossos Serviços"
            subtitleClassName="mb-2 text-3xl md:text-4xl"
            title="EQUIPAMENTOS QUE TRANSFORMAM SEU EVENTO."
            titleClassName="mb-4 text-2xl md:mb-5 md:text-[2.5rem] md:leading-tight"
          />
        </motion.div>

        <motion.ul {...listAnimProps} className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {EQUIPMENT.map((item, index) => (
            <FeatureCard key={index} index={index} {...item} />
          ))}
        </motion.ul>

        <div className="mt-16" />

        <motion.div {...headerAnimProps}>
          <SectionHeader title="ADICIONAIS EXCLUSIVOS" titleClassName="text-brand-darkbrown" />
        </motion.div>

        <motion.ul {...listAnimProps} className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {ADDITIONALS.map((item, index) => (
            <FeatureCard key={index} index={index} {...item} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
