'use client';

import { WhatsappIcon } from '@/components/ui/Icons';
import { WHATSAPP_URL } from '@/lib/site';

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Foto Teka no WhatsApp"
      className="group fixed right-6 bottom-6 z-40 flex items-center overflow-hidden rounded-full bg-[#25D366] p-4 text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a]"
    >
      <WhatsappIcon className="h-7 w-7 shrink-0 text-white" />
    </a>
  );
}
