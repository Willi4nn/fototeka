'use client';

import { AnimatePresence, motion, type PanInfo, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { GalleryPhoto } from '@/lib/categories';
import { cn } from '@/lib/utils';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

function getSwipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

const sliderVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
};

type GalleryLightboxProps = {
  photos: GalleryPhoto[];
  initialIndex: number;
  onClose: () => void;
};

export default function GalleryLightbox({ photos, initialIndex, onClose }: GalleryLightboxProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [[index, direction], setIndexState] = useState<[number, number]>([initialIndex, 0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const lastPaginateTime = useRef(0);

  const currentPhoto = photos[index];

  const requestClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      const now = performance.now();

      if (now - lastPaginateTime.current < 40) return;
      lastPaginateTime.current = now;

      setIndexState(([current]) => {
        const next = (current + newDirection + photos.length) % photos.length;
        return [next, newDirection];
      });
    },
    [photos.length],
  );

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const power = getSwipePower(info.offset.x, info.velocity.x);
      if (power < -SWIPE_CONFIDENCE_THRESHOLD) paginate(1);
      else if (power > SWIPE_CONFIDENCE_THRESHOLD) paginate(-1);
    },
    [paginate],
  );

  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = 'hidden';
    return () => {
      style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
      if (event.key === 'ArrowRight') paginate(1);
      if (event.key === 'ArrowLeft') paginate(-1);

      if (event.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll<HTMLButtonElement>('button');
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [paginate, requestClose]);

  if (!currentPhoto) return null;

  const btnClass =
    'absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:ring-offset-2 focus:ring-offset-black';

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização de foto ampliada"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95"
        >
          {photos.length > 1 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -z-50 h-px w-px overflow-hidden opacity-0"
            >
              {[-2, -1, 1, 2, 3].map((offset) => {
                const preIndex = (index + offset + photos.length) % photos.length;
                const photo = photos[preIndex];

                if (!photo) return null;

                return (
                  <Image
                    key={`preload-${photo.id}`}
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    unoptimized
                    loading="eager"
                    decoding="async"
                    alt=""
                  />
                );
              })}
            </div>
          )}

          <div className="absolute inset-0 z-0 cursor-pointer" onClick={requestClose} />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            className={cn(btnClass, 'top-4 right-4 md:top-8 md:right-8')}
            aria-label="Fechar galeria"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          <div className="pointer-events-none absolute top-4 left-4 z-20 flex h-10 items-center justify-center rounded-full border border-white/10 bg-black/40 px-5 font-sans text-xs font-bold tracking-[0.2em] text-white/80 backdrop-blur-md md:top-8 md:left-8 md:text-sm">
            {index + 1} <span className="mx-2 text-white/40">/</span> {photos.length}
          </div>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                className={cn(btnClass, 'left-4 hidden md:flex lg:left-8')}
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                aria-label="Foto anterior"
              >
                <ChevronLeft size={28} strokeWidth={2.5} className="-ml-0.5" />
              </button>

              <button
                type="button"
                className={cn(btnClass, 'right-4 hidden md:flex lg:right-8')}
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                aria-label="Próxima foto"
              >
                <ChevronRight size={28} strokeWidth={2.5} className="-mr-0.5" />
              </button>
            </>
          )}

          <div className="relative flex h-full w-full max-w-7xl items-center justify-center overflow-hidden px-4 py-20 md:px-24">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentPhoto.id}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                }}
                style={{ willChange: 'transform, opacity' }}
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-16 lg:p-24"
              >
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.category}
                    width={currentPhoto.width}
                    height={currentPhoto.height}
                    unoptimized
                    priority
                    decoding="async"
                    className="pointer-events-none max-h-[85vh] w-auto max-w-full object-contain drop-shadow-2xl select-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
