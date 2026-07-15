import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import GallerySection from '@/components/sections/gallery/GallerySection';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Foto Teka',
    image: 'https://www.fototeka.com.br/logos/logo-foto-teka.svg',
    description:
      'Mais do que registrar imagens, a Foto Teka cria experiências. Aluguel de Totem Retrô, Espelho Mágico e Plataforma 360.',
    '@id': 'https://www.fototeka.com.br',
    url: 'https://www.fototeka.com.br',
    telephone: '+5534996532257',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Patos de Minas',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -18.5788,
      longitude: -46.5181,
    },
    priceRange: '$$',
  };

  return (
    <main className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <Hero />
      <About />
      <GallerySection />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
