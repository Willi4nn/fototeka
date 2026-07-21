'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { ChangeEvent, useState } from 'react';

import Button from '@/components/ui/Button';
import SectionHeader from '../../ui/SectionHeader';

import { contactMethods, eventTypes, howKnowOptions } from './contactData';
import { Field, SelectField } from './FormFields';
import { formatPhone, validateForm } from './validation';

export default function Contact() {
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('WhatsApp');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (name: string) =>
    setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 11));
    clearError('fcelular');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    clearError(e.target.name);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors = validateForm(new FormData(form), phone);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStatus('submitting');
      form.submit();
    }
  };

  const handleIframeLoad = () => {
    if (status === 'submitting') setStatus('success');
  };

  const resetForm = () => {
    setStatus('idle');
    setPhone('');
    setErrors({});
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="contact" className="bg-brand-beige relative z-10 w-full overflow-hidden py-16">
      <SectionHeader subtitle="Vamos Conversar" title="Solicite seu Orçamento." />

      <div className="relative mx-auto max-w-3xl px-6 md:px-8">
        <iframe
          name="hidden_iframe"
          id="hidden_iframe"
          title="hidden_iframe"
          style={{ display: 'none' }}
          onLoad={handleIframeLoad}
          suppressHydrationWarning
        />

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
                <Button variant="primary" size="header" onClick={resetForm}>
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
                noValidate
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

                <Field
                  colSpan="md:col-span-6"
                  label="Nome Completo"
                  name="fnome"
                  type="text"
                  placeholder="Nome e Sobrenome"
                  onChange={handleChange}
                  error={errors.fnome}
                />

                <Field
                  colSpan="md:col-span-6"
                  label="E-mail"
                  name="femail"
                  type="email"
                  placeholder="seu@melhoremail.com"
                  onChange={handleChange}
                  error={errors.femail}
                />

                <Field
                  colSpan="md:col-span-4"
                  label="WhatsApp"
                  type="tel"
                  placeholder="(34) 99999-9999"
                  value={formatPhone(phone)}
                  onChange={handlePhone}
                  error={errors.fcelular}
                />

                <Field
                  colSpan="md:col-span-4"
                  label="Data do Evento"
                  name="fdata"
                  type="date"
                  min={todayStr}
                  onChange={handleChange}
                  error={errors.fdata}
                />

                <Field
                  colSpan="md:col-span-4"
                  label="Início (Hora)"
                  name="fhora"
                  type="time"
                  onChange={handleChange}
                  error={errors.fhora}
                />

                <SelectField
                  colSpan="md:col-span-6"
                  label="Tipo de Evento"
                  name="ftipo"
                  placeholder="Selecione..."
                  options={eventTypes}
                  onChange={handleChange}
                  error={errors.ftipo}
                />

                <SelectField
                  colSpan="md:col-span-6"
                  label="Como nos conheceu?"
                  name="fconheceu2"
                  placeholder="Conta pra gente..."
                  options={howKnowOptions}
                  onChange={handleChange}
                  error={errors.fconheceu2}
                />

                <Field
                  colSpan="md:col-span-12"
                  label="Local / Cidade"
                  name="flocalevento"
                  type="text"
                  placeholder="Nome do salão ou cidade"
                  onChange={handleChange}
                  error={errors.flocalevento}
                />

                <div className="mt-2 flex flex-col items-center md:col-span-12">
                  <label className="text-brand-darkbrown/60 mb-3 text-center font-sans text-[10px] font-bold tracking-widest uppercase">
                    Como prefere receber o orçamento?
                  </label>

                  <div className="border-brand-darkbrown/50 bg-brand-beige/20 flex w-full overflow-hidden border sm:w-auto">
                    {contactMethods.map((m) => (
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
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
