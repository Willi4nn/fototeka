export const formatPhone = (d: string) => {
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
};

const validators: Record<string, (fd: FormData, phone: string) => string | null> = {
  fnome: (fd) => {
    const nome = ((fd.get('fnome') as string) || '').trim();
    return nome.length < 4 || nome.split(/\s+/).length < 2 ? 'Informe seu nome e sobrenome.' : null;
  },
  femail: (fd) => {
    const email = (fd.get('femail') as string) || '';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : 'Insira um e-mail válido.';
  },
  fcelular: (_fd, phone) => (phone.length < 10 ? 'Telefone incompleto (Faltam dígitos).' : null),
  fdata: (fd) => {
    const data = (fd.get('fdata') as string) || '';
    if (!data) return 'Data obrigatória.';
    const [y, m, d] = data.split('-').map(Number);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(y, m - 1, d) < today ? 'Não permitimos datas no passado.' : null;
  },
  fhora: (fd) => ((fd.get('fhora') as string) ? null : 'Horário obrigatório.'),
  ftipo: (fd) => ((fd.get('ftipo') as string) ? null : 'Selecione uma opção.'),
  flocalevento: (fd) =>
    ((fd.get('flocalevento') as string) || '').trim().length < 3
      ? 'Informe um local ou cidade válido.'
      : null,
  fconheceu2: (fd) => ((fd.get('fconheceu2') as string) ? null : 'Selecione uma opção.'),
};

export const validateForm = (formData: FormData, phone: string) => {
  const newErrors: Record<string, string> = {};
  for (const field in validators) {
    const msg = validators[field](formData, phone);
    if (msg) newErrors[field] = msg;
  }
  return newErrors;
};
