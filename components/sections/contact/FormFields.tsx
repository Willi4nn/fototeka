import { motion } from 'framer-motion';
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

const labelClass =
  'mb-1.5 ml-1 block font-sans text-[10px] font-bold uppercase tracking-widest text-brand-darkbrown/60';

const getBaseInputClass = (hasError: boolean) =>
  `w-full min-w-0 appearance-none rounded-none border px-4 py-2.5 font-sans text-[14px] outline-none transition-all duration-300 ${
    hasError
      ? 'border-red-500 bg-red-50 text-red-900 placeholder:text-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
      : 'border-brand-darkbrown/50 bg-brand-beige/20 text-brand-darkbrown placeholder:text-brand-darkbrown/50 hover:border-brand-terracotta/50 focus:border-brand-terracotta focus:bg-white focus:ring-2 focus:ring-brand-terracotta/20'
  }`;

const SelectIcon = ({ hasError }: { hasError: boolean }) => (
  <svg
    className={`pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 ${
      hasError ? 'text-red-500' : 'text-brand-darkbrown/40'
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);

const ErrorMsg = ({ msg }: { msg?: string }) => {
  if (!msg) return null;
  return (
    <motion.span
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 ml-1 block font-sans text-[10px] font-bold tracking-widest text-red-500 uppercase"
    >
      {msg}
    </motion.span>
  );
};

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  colSpan: string;
  label: string;
  error?: string;
};

export function Field({ colSpan, label, error, ...inputProps }: FieldProps) {
  return (
    <div className={colSpan}>
      <label className={labelClass}>{label}</label>
      <input {...inputProps} className={getBaseInputClass(!!error)} suppressHydrationWarning />
      <ErrorMsg msg={error} />
    </div>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  colSpan: string;
  label: string;
  error?: string;
  placeholder: string;
  options: { id: string; label: string }[];
};

export function SelectField({
  colSpan,
  label,
  error,
  placeholder,
  options,
  ...selectProps
}: SelectFieldProps) {
  return (
    <div className={colSpan}>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          {...selectProps}
          defaultValue=""
          className={`${getBaseInputClass(!!error)} cursor-pointer pr-10`}
          suppressHydrationWarning
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <SelectIcon hasError={!!error} />
      </div>
      <ErrorMsg msg={error} />
    </div>
  );
}
