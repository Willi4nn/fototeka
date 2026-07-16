import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
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

async function processImage(
  folder: string,
  file: string,
  category: Exclude<Category, 'TODOS'>,
): Promise<GalleryPhoto | null> {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  const filePath = path.join(galleryDir, folder, file);

  try {
    const buffer = await fs.readFile(filePath);

    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) return null;

    const blurBuffer = await sharp(buffer)
      .resize(8, Math.round(8 * (metadata.height / metadata.width)))
      .webp({ quality: 20 })
      .toBuffer();

    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

    return {
      id: `${folder}/${file}`,
      src: `/gallery/${folder}/${file}`,
      category,
      width: metadata.width,
      height: metadata.height,
      blurDataURL,
    };
  } catch (error) {
    console.warn(`[gallery] failed to process ${filePath}:`, error);
    return null;
  }
}

export const getGalleryPhotos = cache(async (): Promise<GalleryPhoto[]> => {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  const allPhotos: GalleryPhoto[] = [];

  for (const [folder, category] of Object.entries(FOLDER_TO_CATEGORY)) {
    try {
      const folderPath = path.join(galleryDir, folder);

      try {
        await fs.access(folderPath);
      } catch {
        continue;
      }

      const files = await fs.readdir(folderPath);
      const validFiles = files.filter((file) => VALID_EXTENSIONS.test(file)).sort();

      const folderPhotos = await Promise.all(
        validFiles.map((file) => processImage(folder, file, category)),
      );

      for (const photo of folderPhotos) {
        if (photo) allPhotos.push(photo);
      }
    } catch (error) {
      console.warn(`[gallery] failed to read folder ${folder}:`, error);
    }
  }

  return allPhotos;
});
