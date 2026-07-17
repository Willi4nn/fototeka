import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import localFont from 'next/font/local';

import WhatsAppButton from '@/components/layout/WhatsAppButton';

import './globals.css';

const pestoMafio = localFont({
  src: '../public/fonts/PestoMafio-Regular.woff2',
  variable: '--font-pesto',
  display: 'swap',
});

const madelyn = localFont({
  src: '../public/fonts/Madelyn_Regular.woff2',
  variable: '--font-madelyn',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fototeka.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Foto Teka | Locações e Serviços LTDA',
    template: '%s | Foto Teka',
  },
  description:
    'Mais do que registrar imagens, a Foto Teka cria experiências. Aluguel de Totem Retrô, Espelho Mágico e Plataforma 360 para eventos em Patos de Minas e região.',
  keywords: [
    'Totem fotográfico Patos de Minas',
    'Cabine de fotos Patos de Minas',
    'Plataforma 360',
    'Espelho Mágico',
    'Lembrancinha de casamento',
    'Totem retrô',
    'Foto lembrança',
    'Eventos corporativos',
  ],
  authors: [{ name: 'Foto Teka' }],
  creator: 'Foto Teka',
  publisher: 'Foto Teka',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Foto Teka | Experiências Fotográficas',
    description: 'Totem Retrô, Espelho Mágico e Plataforma 360 em Patos de Minas.',
    url: baseUrl,
    siteName: 'Foto Teka',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/20251130003147-2.webp',
        width: 1200,
        height: 630,
        alt: 'Convidados se divertindo com o Totem da Foto Teka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foto Teka | Experiências Fotográficas',
    description: 'Totem Retrô, Espelho Mágico e Plataforma 360 em Patos de Minas.',
    images: ['/espelho-magico.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${pestoMafio.variable} ${jost.variable} ${madelyn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero/hero-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className="bg-brand-beige text-brand-darkbrown flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
