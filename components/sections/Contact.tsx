'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Button from '@/components/ui/Button';
import SectionHeader from './SectionHeader';

const inputClass =
  'w-full min-w-0 appearance-none rounded-none border border-brand-darkbrown/50 bg-brand-beige/20 px-4 py-2.5 font-sans text-[14px] text-brand-darkbrown outline-none transition-all duration-300 placeholder:text-brand-darkbrown/50 hover:border-brand-terracotta/50 focus:border-brand-terracotta focus:bg-white focus:ring-2 focus:ring-brand-terracotta/20';
const labelClass =
  'mb-1.5 ml-1 block font-sans text-[10px] font-bold uppercase tracking-widest text-brand-darkbrown/60';
const selectIcon = (
  <svg
    className="text-brand-darkbrown/40 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);

const formatPhone = (d: string) => {
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const eventTypes = [
  { id: '4', label: 'Aniversário' },
  { id: '9', label: 'Bodas' },
  { id: '1', label: 'Casamento' },
  { id: '6', label: 'Confraternização' },
  { id: '8', label: 'Congresso' },
  { id: '5', label: 'Corporativo' },
  { id: '2', label: 'Debutante' },
  { id: '7', label: 'Diversos' },
  { id: '3', label: 'Formatura' },
  { id: '12', label: 'Seminário' },
  { id: '11', label: 'Simpósio' },
  { id: '10', label: 'Workshop' },
];

const howKnowOptions = [
  { id: '6', label: 'Não Informado' },
  { id: '8', label: 'Anúncio Casamentos.com.br' },
  { id: '5', label: 'Anúncio em Revistas/Jornais' },
  { id: '9878', label: 'Anúncio ZankYou.com.br' },
  { id: '3', label: 'Em outros Eventos' },
  { id: '4', label: 'Feiras' },
  { id: '2', label: 'Google' },
  { id: '9879', label: 'Grupos de WhatsApp' },
  { id: '9877', label: 'Indicação de Cliente' },
  { id: '1', label: 'Indicação de Fornecedor/Parceiro' },
  { id: '9', label: 'Instagram' },
  { id: '7', label: 'Já era Cliente' },
];

export default function Contact() {
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('WhatsApp');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(raw);
  };

  const handleSubmit = () => {
    setTimeout(() => setStatus('submitting'), 10);
  };

  const handleIframeLoad = () => {
    if (status === 'submitting') {
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="bg-brand-beige relative z-10 w-full overflow-hidden py-16">
      <SectionHeader subtitle="Vamos Conversar" title="Solicite seu Orçamento." />

      <div className="relative mx-auto max-w-3xl px-6 md:px-8">
        <iframe
          name="hidden_iframe"
          id="hidden_iframe"
          style={{ display: 'none' }}
          onLoad={handleIframeLoad}
          suppressHydrationWarning
        ></iframe>

        <div className="shadow-brand-darkbrown/10 relative mx-auto bg-white p-6 shadow-xl sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center md:py-12"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-brand-darkbrown mb-2 font-sans text-xl font-bold md:text-2xl">
                  Proposta a caminho!
                </h3>
                <p className="text-brand-darkbrown/70 mb-8 max-w-sm font-sans text-sm leading-relaxed">
                  Detalhes recebidos. Nossa equipe entrará em contato rapidamente!
                </p>
                <Button
                  variant="primary"
                  size="header"
                  onClick={() => {
                    setStatus('idle');
                    setPhone('');
                  }}
                >
                  Nova Solicitação
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action="https://app7.meeventos.com.br/fototekkah/?x=5&c=J90K7M8&tipo=formorc"
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                className="grid grid-cols-1 gap-4 md:grid-cols-12"
                suppressHydrationWarning
              >
                <input type="hidden" name="fcelular" value={phone} suppressHydrationWarning />
                <input
                  type="hidden"
                  name="full_fcelular"
                  value={`+55${phone}`}
                  suppressHydrationWarning
                />
                <input type="hidden" name="fcomo" value={method} suppressHydrationWarning />
                <input type="hidden" name="fid" value="" suppressHydrationWarning />

                <div className="md:col-span-6">
                  <label className={labelClass}>Nome Completo</label>
                  <input
                    required
                    name="fnome"
                    type="text"
                    placeholder="Como te chamamos?"
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
                <div className="md:col-span-6">
                  <label className={labelClass}>E-mail</label>
                  <input
                    required
                    name="femail"
                    type="email"
                    placeholder="seu@melhoremail.com"
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>

                <div className="md:col-span-4">
                  <label className={labelClass}>WhatsApp</label>
                  <input
                    required
                    type="tel"
                    placeholder="(34) 99999-9999"
                    value={formatPhone(phone)}
                    onChange={handlePhone}
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
                <div className="md:col-span-4">
                  <label className={labelClass}>Data do Evento</label>
                  <input
                    required
                    name="fdata"
                    type="date"
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
                <div className="md:col-span-4">
                  <label className={labelClass}>Início (Hora)</label>
                  <input name="fhora" type="time" className={inputClass} suppressHydrationWarning />
                </div>

                <div className="md:col-span-6">
                  <label className={labelClass}>Tipo de Evento</label>
                  <div className="relative">
                    <select
                      required
                      name="ftipo"
                      defaultValue=""
                      className={`${inputClass} cursor-pointer pr-10`}
                      suppressHydrationWarning
                    >
                      <option value="" disabled hidden>
                        Selecione...
                      </option>
                      {eventTypes.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {selectIcon}
                  </div>
                </div>
                <div className="md:col-span-6">
                  <label className={labelClass}>Local / Cidade</label>
                  <input
                    name="flocalevento"
                    type="text"
                    placeholder="Nome do salão ou cidade"
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>

                <div className="md:col-span-12">
                  <label className={labelClass}>Como nos conheceu?</label>
                  <div className="relative">
                    <select
                      required
                      name="fconheceu2"
                      defaultValue=""
                      className={`${inputClass} cursor-pointer pr-10`}
                      suppressHydrationWarning
                    >
                      <option value="" disabled hidden>
                        Conta pra gente...
                      </option>
                      {howKnowOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {selectIcon}
                  </div>
                </div>

                <div className="mt-1 flex flex-col items-center md:col-span-12">
                  <label className="text-brand-darkbrown/60 mb-3 text-center font-sans text-[10px] font-bold tracking-widest uppercase">
                    Como prefere receber o orçamento?
                  </label>

                  <div className="border-brand-darkbrown/50 bg-brand-beige/20 flex w-full overflow-hidden border sm:w-auto">
                    {['WhatsApp', 'E-mail', 'Telefone'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMethod(m)}
                        className={`border-brand-darkbrown/50 flex-1 border-r px-5 py-2 font-sans text-xs font-semibold transition-all last:border-r-0 sm:flex-none ${
                          method === m
                            ? 'bg-brand-terracotta text-white shadow-inner'
                            : 'text-brand-darkbrown/60 hover:bg-brand-beige/50 hover:text-brand-darkbrown'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-center md:col-span-12">
                  <Button
                    type="submit"
                    variant="primary"
                    size="header"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Solicitação'
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
