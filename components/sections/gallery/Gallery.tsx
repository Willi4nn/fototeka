'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import Button from '@/components/ui/Button';
import { CATEGORIES, type Category, type GalleryPhoto } from '@/lib/categories';
import SectionHeader from '../SectionHeader';

const GalleryLightbox = dynamic(() => import('@/components/sections/gallery/GalleryLightbox'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-xl" />,
});

const WATERMARKS = [
  'left-[-9rem] bottom-[-9rem] size-[26rem] -rotate-8 opacity-30',
  'right-[-7rem] top-[-6rem] size-[20rem] rotate-10 opacity-20',
  'right-1/4 top-1/2 size-[16rem] -translate-y-1/2 rotate-4 opacity-10',
] as const;

const INITIAL_LIMIT = 8;

type GalleryProps = {
  photos: GalleryPhoto[];
};

export default function Gallery({ photos }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<Category>('TODOS');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(
    () =>
      activeFilter === 'TODOS' ? photos : photos.filter((photo) => photo.category === activeFilter),
    [photos, activeFilter],
  );

  const displayedPhotos = useMemo(
    () => filteredPhotos.slice(0, visibleCount),
    [filteredPhotos, visibleCount],
  );

  const handleFilterChange = useCallback((category: Category) => {
    setActiveFilter(category);
    setVisibleCount(INITIAL_LIMIT);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + INITIAL_LIMIT);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <section
      id="gallery"
      className="bg-brand-darkbrown relative z-10 w-full overflow-hidden py-16 md:py-24"
    >
      {WATERMARKS.map((position) => (
        <Image
          key={position}
          src="/logos/icon-circle-foto-teka-2.png"
          alt=""
          aria-hidden="true"
          width={420}
          height={420}
          className={`pointer-events-none absolute z-0 h-auto w-auto select-none ${position}`}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <SectionHeader
          subtitle="Galeria de Momentos"
          subtitleClassName="text-brand-beige"
          title="CADA EVENTO, UMA HISTÓRIA ÚNICA."
          titleClassName="text-white"
        />

        <div className="mx-auto mb-10 flex max-w-4xl flex-wrap items-center justify-center gap-2 md:mb-12 md:gap-3">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => handleFilterChange(category)}
              variant={activeFilter === category ? 'filterActive' : 'filterInactive'}
              size="tag"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mx-auto w-full max-w-7xl columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {displayedPhotos.map((photo, index) => {
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-black/20 text-left shadow-lg ring-1 ring-white/10 transition-shadow hover:shadow-xl"
                aria-label={`Ampliar foto: ${photo.category}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.category}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  quality={50}
                  placeholder={photo.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={photo.blurDataURL}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-in-out will-change-transform motion-safe:group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                  <span className="translate-y-4 font-sans text-xs font-bold tracking-widest text-white uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 motion-safe:group-hover:translate-y-0">
                    Ampliar
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredPhotos.length === 0 && (
          <p className="mt-8 text-center text-white/60">
            Ainda não há fotos publicadas nesta categoria.
          </p>
        )}

        {visibleCount < filteredPhotos.length && (
          <div className="mt-10 flex justify-center md:mt-12">
            <Button variant="outline" onClick={handleLoadMore}>
              Mostrar Mais Fotos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </Button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <GalleryLightbox
          photos={displayedPhotos}
          initialIndex={selectedIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
