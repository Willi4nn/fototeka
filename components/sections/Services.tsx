'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

import { ADDITIONALS, EQUIPMENT } from '@/content/data';
import FeatureCard from '../ui/FeatureCard';
import SectionHeader from './SectionHeader';

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Services() {
  const reduceMotion = useReducedMotion();

  const animProps = {
    initial: reduceMotion ? undefined : 'hidden',
    whileInView: reduceMotion ? undefined : 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: STAGGER,
  };

  return (
    <section id="services" className="bg-brand-beige relative z-10 w-full overflow-hidden py-16">
      <Image
        src="/logos/icon-circle-foto-teka.png"
        alt=""
        width={500}
        height={500}
        priority
        className="pointer-events-none absolute top-20 -left-20 z-0 h-auto w-auto opacity-50 md:top-1/3 md:-left-10 md:w-150"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        <SectionHeader
          subtitle="Nossos Serviços"
          title="EQUIPAMENTOS QUE TRANSFORMAM SEU EVENTO."
        />

        <motion.ul {...animProps} className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {EQUIPMENT.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </motion.ul>

        <div className="mt-16" />

        <SectionHeader title="ADICIONAIS EXCLUSIVOS" titleClassName="text-brand-darkbrown" />

        <motion.ul {...animProps} className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {ADDITIONALS.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
