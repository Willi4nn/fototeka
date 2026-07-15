'use client';

import { AnimatePresence, motion, type PanInfo, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { GalleryPhoto } from '@/lib/categories';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

function getSwipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

const sliderVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
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

  const currentPhoto = photos[index];

  const requestClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
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
      if (event.key === 'Escape') {
        requestClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        paginate(1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        paginate(-1);
        return;
      }
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

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização de foto ampliada"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={requestClose}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:top-8 md:right-8"
            aria-label="Fechar galeria"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="absolute top-4 left-4 z-10 rounded-full bg-white/10 px-4 py-2 font-sans text-sm tracking-widest text-white md:top-8 md:left-8">
            {index + 1} / {photos.length}
          </div>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 z-10 hidden rounded-full bg-white/10 p-4 text-white transition-colors hover:bg-white/20 md:left-8 md:block"
                onClick={(event) => {
                  event.stopPropagation();
                  paginate(-1);
                }}
                aria-label="Foto anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                className="absolute right-2 z-10 hidden rounded-full bg-white/10 p-4 text-white transition-colors hover:bg-white/20 md:right-8 md:block"
                onClick={(event) => {
                  event.stopPropagation();
                  paginate(1);
                }}
                aria-label="Próxima foto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentPhoto.id}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-16 lg:p-24"
              >
                <div
                  className="relative h-full w-full max-w-7xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.category}
                    fill
                    sizes="100vw"
                    quality={100}
                    priority
                    className="pointer-events-none object-contain select-none"
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
