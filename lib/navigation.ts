export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'Sobre Nós' },
  { href: '#gallery', label: 'Galeria' },
  { href: '#services', label: 'Serviços' },
  { href: '#testimonials', label: 'Depoimentos' },
  { href: '#contact', label: 'Contato' },
] as const;

export const HEADER_LINKS = NAV_LINKS.filter((link) => link.label !== 'Contato');

export const PRIMARY_SECTION_LINKS = {
  services: '#services',
  contact: '#contact',
  gallery: '#gallery',
  testimonials: '#testimonials',
} as const;
