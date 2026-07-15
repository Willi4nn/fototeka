import { Camera, Glasses, Images, Infinity as InfinityIcon, Users } from 'lucide-react';
import Image from 'next/image';

const beneficios = [
  {
    icon: InfinityIcon,
    title: 'Fotos Ilimitadas',
    text: 'Fotos ilimitadas durante o período contratado.',
  },
  {
    icon: Users,
    title: 'Monitores Treinados',
    text: 'Monitores treinados para auxiliar os convidados.',
  },
  {
    icon: Glasses,
    title: 'Acessórios Divertidos',
    text: 'Acessórios divertidos e personalizados.',
  },
  {
    icon: Images,
    title: 'Variedade de Impressos',
    text: 'Variedade de impressos: Tirinha, Polaroide e Tradicional.',
  },
  { icon: Camera, title: 'Fotos Digitais', text: 'Fotos digitais entregues em alta qualidade.' },
] as const;

const fotosTirinha = [
  { src: '/galeria/20251201202957-1.jpg', alt: 'Tirinha 1' },
  { src: '/galeria/20251207004212-1.jpg', alt: 'Tirinha 2' },
  { src: '/galeria/20260131235920-1.jpg', alt: 'Tirinha 3' },
];

const fotosPolaroide = [
  { src: '/galeria/IMG_0102_20250906_233419_3600.jpeg', alt: 'Polaroide Destaque' },
];

export default function About() {
  return (
    <section id="about" className="bg-brand-beige relative z-10 w-full overflow-hidden py-16">
      {/* Grafismo de fundo (decorativo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -left-24 z-0 h-105 w-105 md:top-1/2 md:-left-16 md:h-160 md:w-160 md:-translate-y-1/2"
      >
        <Image
          src="/logos/icon-circle-foto-teka.png"
          alt=""
          fill
          sizes="(max-width: 768px) 420px, 640px"
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <div className="mx-auto max-w-120 lg:mx-0">
            <p className="text-brand-terracotta mb-1 text-center font-(family-name:--font-parisienne) text-4xl md:text-5xl lg:text-left">
              Nosso Propósito
            </p>

            <h2 className="text-brand-darkbrown mb-4 text-center font-sans text-[2.25rem] leading-[1.05] font-black tracking-tight uppercase md:text-[3rem] lg:text-left">
              Mais que fotos,
              <br />
              criamos experiências.
            </h2>

            <div className="bg-brand-terracotta mx-auto mb-6 h-1.25 w-25 lg:mx-0" />

            <div className="text-brand-darkbrown space-y-4 text-center text-[15px] leading-relaxed font-medium lg:text-left">
              <p>
                A Foto Teka nasceu para transformar eventos em lembranças inesquecíveis. Através de
                tecnologia, criatividade e um olhar acolhedor, proporcionamos momentos leves,
                divertidos e cheios de emoção.
              </p>
              <p>
                Acreditamos que cada história merece ser contada e eternizada de forma única e
                especial, fortalecendo laços e celebrando a vida.
              </p>
            </div>
          </div>

          {/* Coluna de fotos */}
          <div className="relative flex h-70 w-full items-center justify-center md:h-100 lg:mt-0">
            <div className="absolute top-2 left-0 z-20 hidden w-30 -rotate-6 cursor-grab rounded-sm border border-black/5 bg-white p-2 pb-5 shadow-2xl transition-transform duration-300 ease-out hover:z-50 hover:scale-105 hover:rotate-0 active:cursor-grabbing md:left-[10%] md:block md:w-30 md:p-2.5 md:pb-7">
              <div className="bg-brand-midbrown/30 absolute -top-3 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-2 shadow-sm md:h-5 md:w-14" />

              <div className="flex flex-col gap-1.5 md:gap-2">
                {fotosTirinha.map((foto, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square w-full overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div
                className="mt-2 flex w-full justify-center gap-1 text-[8px] md:mt-2.5 md:text-[10px]"
                aria-hidden="true"
              >
                <span>❤️</span>
                <span>❤️</span>
                <span>❤️</span>
              </div>
            </div>

            <div className="absolute top-10 left-1/2 z-30 w-64 -translate-x-1/2 rotate-6 cursor-grab rounded-sm border border-black/5 bg-white p-2.5 pb-10 shadow-2xl transition-transform duration-300 ease-out hover:z-50 hover:scale-105 hover:rotate-0 active:cursor-grabbing md:top-10 md:right-[5%] md:left-auto md:w-104 md:translate-x-0 md:rotate-8 md:p-3 md:pb-12">
              <div className="bg-brand-midbrown/25 absolute -top-4 left-1/2 h-5 w-14 -translate-x-1/2 rotate-3 shadow-sm md:h-6 md:w-16" />
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                <Image
                  src={fotosPolaroide[0].src}
                  alt={fotosPolaroide[0].alt}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-8 grid max-w-275 grid-cols-2 gap-3 md:mt-12 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {beneficios.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group border-brand-midbrown/25 bg-brand-beige/70 hover:border-brand-terracotta/30 relative flex flex-col items-center overflow-hidden rounded-xl border-4 p-4 text-center transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white hover:shadow-xl md:p-5"
            >
              <div className="from-brand-terracotta/5 absolute inset-0 translate-y-full bg-linear-to-t to-transparent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 group-hover:opacity-100" />

              <div className="relative mb-3 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-110">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="text-brand-darkbrown group-hover:text-brand-terracotta h-8 w-8 transition-colors duration-500 md:h-9 md:w-9"
                />
              </div>

              <h3 className="text-brand-terracotta relative z-10 mb-2 text-[14px] leading-tight font-bold tracking-widest uppercase transition-transform duration-500 md:text-[16px]">
                {title}
              </h3>

              <p className="text-brand-darkbrown/80 group-hover:text-brand-darkbrown relative z-10 text-[12px] leading-normal font-medium transition-colors duration-500 md:text-[14px]">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
