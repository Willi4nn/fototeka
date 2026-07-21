import {
  Camera,
  Layers3,
  Lightbulb,
  Palette,
  Pencil,
  Pointer,
  Printer,
  QrCode,
  Signature,
  Star,
  Users,
  Video,
} from 'lucide-react';

export const EQUIPMENT = [
  {
    title: 'Totem Retrô',
    description:
      'Design clássico em madeira maciça com iluminação profissional para fotos com charme atemporal.',
    image: '/services/totem-retro.webp',
    hoverImage: '/services/totem-retro-2.webp',
    features: [
      { icon: Camera, text: 'CÂMERA PROFISSIONAL DSLR' },
      { icon: Pointer, text: 'TELA TOUCH' },
      { icon: Printer, text: 'IMPRESSORA TÉRMICA' },
      { icon: Lightbulb, text: 'LUZ DE ESTÚDIO' },
    ],
  },
  {
    title: 'Espelho Retrô',
    description:
      'Vintage e moderno. O espelho que decora o seu espaço e eterniza os seus melhores momentos.',
    image: '/services/espelho-retro.webp',
    hoverImage: '/services/espelho-retro-2.webp',
    features: [
      { icon: Camera, text: 'CÂMERA PROFISSIONAL DSLR' },
      { icon: Printer, text: 'IMPRESSORA TÉRMICA' },
      { icon: Lightbulb, text: 'LUZ DE ESTÚDIO' },
    ],
  },
  {
    title: 'Espelho Mágico',
    description:
      'Elegância que encanta, o espelho mágico traz sofisticação e muita interatividade.',
    image: '/services/espelho-magico.webp',
    hoverImage: '/services/espelho-magico-2.webp',
    features: [
      { icon: Pointer, text: 'TELA TOUCH INTERATIVA' },
      { icon: Camera, text: 'CÂMERA DSLR' },
      { icon: Printer, text: 'IMPRESSORA TÉRMICA' },
      { icon: Lightbulb, text: 'LUZ DE ESTÚDIO' },
    ],
  },
  {
    title: 'Plataforma 360° Aérea',
    description:
      'Vídeos incríveis em slow motion com movimentos aéreos e iluminação sincronizada. Impacto garantido!',
    image: '/services/360.webp',
    hoverImage: '/services/360-2.webp',
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
    //hoverImage: '/services/autografo-2.webp',
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
    hoverImage: '/services/guestbook-2.webp',
    features: [
      { icon: Layers3, text: 'CAPA DURA' },
      { icon: Camera, text: 'FOTOS COLADAS NA HORA' },
      { icon: Pencil, text: 'MENSAGENS PERSONALIZADAS' },
    ],
  },
  {
    title: 'Chaveiros',
    description:
      'Artesanal e personalizado. O chaveiro é feito com couro sintético, é leve, resistente e com aquele toque único.',
    image: '/services/chaveiro.webp',
    hoverImage: '/services/chaveiro-2.webp',
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
    //hoverImage: '/services/ima-geladeira-2.webp',
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
    hoverImage: '/services/fundo-2.webp',
    features: [
      { icon: Layers3, text: 'FUNDO LISO' },
      { icon: Camera, text: 'FOTO MARCANTE' },
      { icon: Star, text: 'IMPACTO VISUAL' },
      { icon: Palette, text: 'LAYOUT PERSONALIZADO' },
    ],
  },
] as const;
