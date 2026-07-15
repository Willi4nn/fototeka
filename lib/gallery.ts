import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

import type { Category, GalleryPhoto } from '@/lib/categories';

const FOLDER_TO_CATEGORY: Record<string, Exclude<Category, 'TODOS'>> = {
  aniversarios: 'ANIVERSÁRIOS',
  casamentos: 'CASAMENTOS',
  confraternizacoes: 'CORPORATIVOS',
  corporativos: 'CORPORATIVOS',
  debutantes: 'DEBUTANTES',
  outros: 'OUTROS',
};

const VALID_EXTENSIONS = /\.(webp|jpe?g|png)$/i;

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');

  const listsByFolder = await Promise.all(
    Object.entries(FOLDER_TO_CATEGORY).map(async ([folder, category]) => {
      let files: string[] = [];
      try {
        files = (await fs.readdir(path.join(galleryDir, folder)))
          .filter((file) => VALID_EXTENSIONS.test(file))
          .sort();
      } catch {
        return [];
      }

      return Promise.all(
        files.map(async (file): Promise<GalleryPhoto> => {
          const filePath = path.join(galleryDir, folder, file);

          let width = 4;
          let height = 5;
          let blurDataURL: string | undefined;

          try {
            const buffer = await fs.readFile(filePath);
            const image = sharp(buffer);

            const metadata = await image.metadata();
            if (metadata.width && metadata.height) {
              width = metadata.width;
              height = metadata.height;
            }

            const blurBuffer = await image.resize(10).webp({ quality: 10 }).toBuffer();
            blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
          } catch (error) {
            console.warn(`[gallery] failed to process ${filePath}:`, error);
          }

          return {
            id: `${folder}/${file}`,
            src: `/gallery/${folder}/${file}`,
            category,
            width,
            height,
            blurDataURL,
          };
        }),
      );
    }),
  );

  return listsByFolder.flat();
}
