import Image from 'next/image';
import Link from 'next/link';

import { InstagramIcon, WhatsappIcon } from '@/components/ui/Icons';
import { NAV_LINKS } from '@/lib/navigation';
import { INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/site';

const AREAS = [
  'Patos de Minas',
  'Alto Paranaíba e Região',
  'Belo Horizonte',
  'Região Metropolitana',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-darkbrown text-brand-beige relative w-full pt-12 sm:pt-16 md:pt-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1">
            <Link
              href="/"
              className="mb-6 inline-block transition-transform duration-300 hover:scale-105 hover:opacity-90"
            >
              <Image
                src="/logos/logo-foto-teka-light.svg"
                alt="Logo Foto Teka"
                width={200}
                height={80}
                className="h-auto w-36 sm:w-40 md:w-48"
                priority
              />
            </Link>

            <p className="text-brand-beige/70 max-w-xs font-sans text-[14px] leading-relaxed sm:max-w-sm md:text-[15px]">
              Mais do que registrar imagens, criamos experiências. Lembranças inesquecíveis e
              tecnologia interativa para seu evento.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 lg:col-span-2 lg:gap-12 lg:px-8">
            <nav>
              <h3 className="mb-5 font-sans text-[11px] font-bold tracking-[0.25em] text-white uppercase opacity-90 sm:mb-6">
                Navegação
              </h3>
              <ul className="flex flex-col space-y-3 sm:space-y-3.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group text-brand-beige/70 hover:text-brand-terracotta inline-flex items-center text-[14px] transition-all duration-300"
                    >
                      <span className="bg-brand-terracotta h-px w-0 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="mb-5 font-sans text-[11px] font-bold tracking-[0.25em] text-white uppercase opacity-90 sm:mb-6">
                Área de Atuação
              </h3>
              <ul className="flex flex-col space-y-3 sm:space-y-3.5">
                {AREAS.map((area) => (
                  <li key={area} className="text-brand-beige/70 flex items-start text-[14px]">
                    <span className="bg-brand-terracotta/60 mt-2 mr-2.5 h-1 w-1 shrink-0 rounded-full" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1">
            <h3 className="mb-5 font-sans text-[11px] font-bold tracking-[0.25em] text-white uppercase opacity-90 sm:mb-6">
              Fale Conosco
            </h3>
            <ul className="flex flex-col items-center gap-4 sm:items-start">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-brand-beige/70 inline-flex items-center gap-3 text-[14px] transition-all duration-300 hover:text-white"
                >
                  <span className="bg-brand-beige/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-brand-beige/70 inline-flex items-center gap-3 text-[14px] transition-all duration-300 hover:text-white"
                >
                  <span className="bg-brand-beige/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-green-500/20 group-hover:text-green-400">
                    <WhatsappIcon className="h-5 w-5" />
                  </span>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-brand-beige/10 mt-10 flex flex-col items-center justify-between gap-4 border-t py-6 text-center sm:mt-16 sm:py-8 md:mt-24 md:flex-row md:text-left">
          <p className="text-brand-beige/40 text-[13px]">
            © {currentYear} Foto Teka. Todos os direitos reservados.
          </p>

          <p className="text-brand-beige/40 text-[13px]">
            Desenvolvido por{' '}
            <a
              href="https://wa.me/5534999903558?text=Ol%C3%A1%2C%20Willian%21%20Vi%20o%20site%20que%20voc%C3%AA%20desenvolveu%20para%20a%20Foto%20Teka%20e%20me%20interessei.%20Queria%20saber%20mais%20sobre%20como%20ter%20um%20site%20assim%20para%20o%20meu%20neg%C3%B3cio%21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-beige/60 hover:text-brand-terracotta font-medium underline transition-colors duration-300"
            >
              Willian Pereira
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
