import Image from 'next/image';
import Link from 'next/link';

import { InstagramIcon, WhatsappIcon } from '@/content/data';
import { INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/site';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Sobre Nós', href: '#about' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Serviços', href: '#services' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contact' },
];

const AREAS = [
  'Patos de Minas',
  'Alto Paranaíba e Região',
  'Belo Horizonte',
  'Região Metropolitana',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-darkbrown text-brand-beige relative w-full pt-10 md:pt-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-block transition-opacity hover:opacity-80">
              <Image
                src="/logos/logo-foto-teka-light.svg"
                alt="Logo Foto Teka"
                width={160}
                height={64}
                style={{ width: 'auto' }}
                className="h-16 w-auto md:h-20"
              />
            </Link>

            <p className="text-brand-beige/80 max-w-xs text-[14px] leading-7 md:max-w-sm md:text-[15px]">
              Mais do que registrar imagens, criamos experiências. Lembranças inesquecíveis e
              tecnologia interativa para seu evento.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:gap-12">
            <nav>
              <h3 className="text-brand-beige mb-4 font-sans text-[13px] font-bold tracking-[0.2em] uppercase">
                Navegação
              </h3>

              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-beige/80 hover:text-brand-terracotta font-sans text-[14px] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-brand-beige mb-4 font-sans text-[13px] font-bold tracking-[0.2em] uppercase">
                Área de Atuação
              </h3>

              <ul className="space-y-3">
                {AREAS.map((area) => (
                  <li key={area} className="text-brand-beige/80 font-sans text-[14px]">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-brand-beige mb-4 font-sans text-[13px] font-bold tracking-[0.2em] uppercase">
              Social
            </h3>

            <ul className="flex flex-row gap-8 lg:flex-col lg:gap-4">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-beige/80 inline-flex items-center gap-2 text-[14px] transition-all duration-300 hover:text-fuchsia-500"
                >
                  <InstagramIcon className="h-5 w-5" />
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-beige/80 inline-flex items-center gap-2 text-[14px] transition-all duration-300 hover:text-green-400"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-brand-beige/10 mt-8 border-t py-5 md:mt-20 md:py-8">
          <div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
            <p className="text-brand-beige/50 text-[13px] md:text-sm">
              © {currentYear} Foto Teka. Todos os direitos reservados.
            </p>

            <p className="text-brand-beige/50 text-[13px] md:text-sm">
              Desenvolvido por{' '}
              <a
                href="https://wa.me/5534999903558?text=Ol%C3%A1%2C%20Willian%21%20Vi%20o%20site%20que%20voc%C3%AA%20desenvolveu%20para%20a%20Foto%20Teka%20e%20me%20interessei.%20Queria%20saber%20mais%20sobre%20como%20ter%20um%20site%20assim%20para%20o%20meu%20neg%C3%B3cio%21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-beige/80 hover:text-brand-terracotta font-semibold transition-colors duration-300"
              >
                Willian Pereira
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
