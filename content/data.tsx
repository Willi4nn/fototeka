import {
  Camera,
  Layers3,
  Lightbulb,
  MapPin,
  Pencil,
  QrCode,
  Share2,
  Signature,
  Star,
  Sun,
  Users,
  Video,
} from 'lucide-react';

export const InstagramIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const WhatsappIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const EQUIPMENT = [
  {
    title: 'Totem Retrô',
    description:
      'Design clássico em madeira maciça com iluminação profissional para fotos com charme atemporal.',
    image: '/services/totem-retro.webp',
    features: [
      { icon: Camera, text: 'CÂMERA DSLR PROFISSIONAL' },
      { icon: Layers3, text: 'IMPRESSÃO TÉRMICA RÁPIDA' },
      { icon: Lightbulb, text: 'ILUMINAÇÃO BEAUTY DISH' },
    ],
  },
  {
    title: 'Espelho Retrô',
    description:
      'Vintage e moderno. O espelho que decora o seu espaço e eterniza os seus melhores momentos.',
    image: '/services/espelho-retro.webp',
    features: [
      { icon: MapPin, text: 'TELA TOUCH INTERATIVA' },
      { icon: Sun, text: 'ILUMINAÇÃO EM LED' },
      { icon: Camera, text: 'FOTOS EM ALTA RESOLUÇÃO' },
    ],
  },
  {
    title: 'Espelho Mágico',
    description:
      'Elegância que encanta, o espelho mágico traz sofisticação e muita interatividade.',
    image: '/services/espelho-magico.webp',
    features: [
      { icon: Star, text: 'ANIMAÇÕES PERSONALIZADAS' },
      { icon: Signature, text: 'ASSINATURA DIGITAL' },
      { icon: Share2, text: 'COMPARTILHAMENTO ONLINE' },
    ],
  },
  {
    title: 'Plataforma 360° Aérea',
    description:
      'Vídeos incríveis em slow motion com movimentos aéreos e iluminação sincronizada. Impacto garantido!',
    image: '/services/360.webp',
    features: [
      { icon: Video, text: 'VÍDEOS 360° SLOW MOTION' },
      { icon: Layers3, text: 'ESTRUTURA EM ALUMÍNIO' },
      { icon: Lightbulb, text: 'ILUMINAÇÃO LED RGB' },
    ],
  },
  {
    title: 'Autógrafo Móvel',
    description:
      'As lembranças ganham voz e uma linda assinatura. A interação de vídeo perfeita para seus convidados.',
    image: '/services/autografo.webp',
    features: [
      { icon: Users, text: 'TELA TOUCH INTERATIVA' },
      { icon: Pencil, text: 'DESENHOS E MENSAGENS' },
      { icon: QrCode, text: 'ENVIO POR QR CODE' },
    ],
  },
] as const;

export const ADDITIONALS = [
  {
    title: 'Guestbook',
    description: 'Álbum de memórias personalizado com fotos e mensagens dos convidados.',
    image: '/services/guestbook.webp',
    features: [
      { icon: Layers3, text: 'CAPA EM MADEIRA OU COURO' },
      { icon: Camera, text: 'FOTOS COLADAS NA HORA' },
      { icon: Pencil, text: 'MENSAGENS PERSONALIZADAS' },
    ],
  },
  {
    title: 'Chaveiros',
    description:
      'Artesanal e personalizado. O chaveiro é feito com couro sintético, é leve, resistente e com aquele toque único.',
    image: '/services/chaveiros.webp',
    features: [
      { icon: Layers3, text: 'COURO SINTÉTICO' },
      { icon: Star, text: 'LEVE E RESISTENTE' },
      { icon: Signature, text: 'TOQUE ARTESANAL' },
    ],
  },
  {
    title: 'Ímã de Geladeira',
    description:
      'Uma lembrança que te encontra todo dia. Sua foto com o destaque que merece no lugar mais visitado da casa.',
    image: '/services/ima-geladeira.webp',
    features: [
      { icon: Camera, text: 'ACABAMENTO PREMIUM' },
      { icon: Layers3, text: 'FIXAÇÃO MAGNÉTICA' },
      { icon: Star, text: 'DESTAQUE DIÁRIO' },
    ],
  },
  {
    title: 'Fundo Fotográfico',
    description: 'O detalhe que transforma. Fundo liso, foto marcante. Impacto no primeiro clique.',
    image: '/services/fundo.webp',
    features: [
      { icon: Layers3, text: 'FUNDO LISO' },
      { icon: Camera, text: 'FOTO MARCANTE' },
      { icon: Star, text: 'IMPACTO VISUAL' },
    ],
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Aline Oliveira',
    text: 'Fotos impressas na hora, com qualidade profissional. Cada clique virou uma memória que nunca mais se apaga. Como vale a pena contratar a Fototeka. 🥰',
  },
  {
    name: 'Cecilia Oliveira',
    text: 'Simplesmente apaixonada pelas fotos! Equipamentos maravilhosos, equipe atenciosa e uma ótima recordação para levar para casa. Recomendo de olhos fechados!',
  },
  {
    name: 'Eveny Daniele',
    text: 'A Tekka foi a sensação do nosso casamento! Os convidados amaram e os chaveirinhos fizeram o maior sucesso. Atendimento maravilhoso do início ao fim com muita simpatia. Recomendamos muito!',
  },
  {
    name: 'Amanda Caroline',
    text: 'Trabalho de excelência e com um carisma incrível! A Fototeka esteve no aniversário de 15 anos da minha sobrinha e foi perfeito. Terão uma experiência inesquecível!',
  },
  {
    name: '@kamilamfreitag',
    text: 'Amei demais vcs aqui!! Foi sensacional!!! Obrigada por tudo... você é um amor de pessoa!! Super indico ❤️❤️',
  },
  {
    name: '@alvinadornelashordones',
    text: 'E o seu trabalho impecável! Que álbum lindo, tudo perfeito 😍 Valeu muito a pena ter contratado vocês, todo mundo adorou!',
  },
] as const;
