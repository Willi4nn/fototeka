import React from 'react';
import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

type BaseProps = {
  variant?: 'primary' | 'outline' | 'filterActive' | 'filterInactive';
  size?: 'hero' | 'header' | 'tag';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> &
  LinkProps & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE_CLASSES =
  'relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap border font-sans font-semibold uppercase tracking-[0.18em] transition duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darkbrown disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASSES: Record<NonNullable<BaseProps['variant']>, string> = {
  primary:
    'border-brand-terracotta bg-brand-terracotta text-white shadow-lg shadow-brand-terracotta/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-terracotta/40 hover:brightness-105',

  outline:
    'border-2 border-brand-beige bg-transparent text-brand-beige hover:-translate-y-0.5 hover:bg-brand-beige hover:text-brand-darkbrown hover:shadow-xl hover:shadow-black/20',

  filterActive:
    'border-brand-terracotta bg-brand-terracotta text-white shadow-lg shadow-brand-terracotta/30',

  filterInactive:
    'border-brand-beige/60 bg-brand-darkbrown/40 text-brand-beige backdrop-blur-sm hover:-translate-y-0.5 hover:border-brand-beige hover:bg-brand-beige/10 hover:text-white hover:shadow-lg hover:shadow-black/20',
};

const SIZE_CLASSES: Record<NonNullable<BaseProps['size']>, string> = {
  hero: 'min-h-[52px] px-8 text-sm md:text-base',
  header: 'min-h-[42px] px-6 text-xs md:text-sm',
  tag: 'min-h-[40px] px-5 text-[11px] md:text-xs',
};

export default function Button({
  variant = 'primary',
  size = 'hero',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const finalClasses = cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={finalClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={finalClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
