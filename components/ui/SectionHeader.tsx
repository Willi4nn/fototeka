import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  subtitle?: string;
  title: string;
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  dividerClassName?: string;
};

export default function SectionHeader({
  subtitle,
  title,
  className,
  subtitleClassName,
  titleClassName,
  dividerClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('mx-auto mb-8 flex flex-col items-center text-center md:mb-12', className)}>
      {subtitle && (
        <p
          className={cn(
            'text-brand-terracotta font-madelyn mb-1 text-5xl md:text-6xl',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}

      <h2
        className={cn(
          'mb-3 font-sans font-black tracking-wide uppercase md:mb-4 md:text-3xl md:text-[2.5rem] md:leading-tight',
          titleClassName,
        )}
      >
        {title}
      </h2>

      <div className={cn('bg-brand-terracotta h-1 w-16 md:w-20', dividerClassName)} />
    </div>
  );
}
