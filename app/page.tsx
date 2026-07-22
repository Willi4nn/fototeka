import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import Contact from '@/components/sections/contact/Contact';
import GallerySection from '@/components/sections/gallery/GallerySection';
import Hero from '@/components/sections/Hero';
import Services from '@/components/services/Services';
import Testimonials from '@/components/testimonials/Testimonials';

export const dynamic = 'force-static';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['PhotographyService', 'LocalBusiness'],
    name: 'Fototeka Locações e Serviços LTDA',
    alternateName: 'Foto Teka',
    '@id': 'https://www.fototeka.com.br/#organization',
    url: 'https://www.fototeka.com.br',
    logo: 'https://www.fototeka.com.br/logos/logo-foto-teka.svg',
    image: [
      'https://www.fototeka.com.br/services/totem-retro.webp',
      'https://www.fototeka.com.br/services/espelho-magico.webp',
    ],
    description:
      'Locação de cabine de fotos em Patos de Minas e região do Alto Paranaíba. Cabines exclusivas da Fototeka com espelhos mágicos, totens e plataforma 360° aéreas.',
    telephone: '+5534996532257',
    paymentAccepted: 'Dinheiro, PIX, Cartão de Crédito',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Dr. Fábio Helvécio Ferreira Borges',
      addressLocality: 'Patos de Minas',
      addressRegion: 'MG',
      postalCode: '38706-412',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -18.596762,
      longitude: -46.485085,
    },
    hasMap: 'https://maps.app.goo.gl/xurhGvnMt9jtE4GE6',
    areaServed: [
      { '@type': 'City', name: 'Patos de Minas' },
      { '@type': 'City', name: 'Belo Horizonte' },
      { '@type': 'Region', name: 'Alto Paranaíba' },
      { '@type': 'Region', name: 'Região Metropolitana de Belo Horizonte' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '36',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    priceRange: '$$',
    sameAs: ['https://instagram.com/fototekah'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Fotografia e Lembranças',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aluguel de Plataforma 360',
            description:
              'Vídeos 360° em slow motion para casamentos e aniversários em Patos de Minas e Alto Paranaíba.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aluguel de Totem Retrô e Espelho Mágico',
            description: 'Cabine de fotos e impressão térmica na hora para eventos.',
          },
        },
      ],
    },
  };

  return (
    <main id="main-content" className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        id="json-ld-schema"
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
