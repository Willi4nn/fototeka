import Gallery from '@/components/sections/gallery/Gallery';
import { getGalleryPhotos } from '@/lib/gallery';

export default async function GallerySection() {
  const photos = await getGalleryPhotos();
  return <Gallery photos={photos} />;
}
