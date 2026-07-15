export const HEADER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'Sobre Nós' },
  { href: '#gallery', label: 'Galeria' },
  { href: '#services', label: 'Serviços' },
  { href: '#contact', label: 'Contato' },
] as const;

export const PRIMARY_SECTION_LINKS = {
  services: '#services',
  contact: '#contact',
  gallery: '#gallery',
} as const;
