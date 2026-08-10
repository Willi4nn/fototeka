import { motion } from 'framer-motion';
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

const labelClass =
  'mb-1.5 ml-1 block font-sans text-xs font-bold uppercase tracking-widest text-brand-darkbrown/70';

const getBaseInputClass = (hasError: boolean) =>
  `w-full min-w-0 appearance-none border px-4 py-3 font-sans text-[15px] outline-none transition-all duration-300 ${
    hasError
      ? 'border-red-500 bg-red-50 text-red-900 placeholder:text-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
      : 'border-brand-darkbrown/50 bg-brand-beige/20 text-brand-darkbrown placeholder:text-brand-darkbrown/50 hover:border-brand-terracotta/50 focus:border-brand-terracotta focus:bg-white focus:ring-2 focus:ring-brand-terracotta/20'
  }`;

const SelectIcon = ({ hasError }: { hasError: boolean }) => (
  <svg
    className={`pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 ${
      hasError ? 'text-red-500' : 'text-brand-darkbrown/50'
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
      <label className={labelClass} htmlFor={inputProps.name}>
        {label}
      </label>
      <input
        {...inputProps}
        id={inputProps.name}
        className={getBaseInputClass(!!error)}
        aria-invalid={!!error}
        suppressHydrationWarning
      />
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
      <label className={labelClass} htmlFor={selectProps.name}>
        {label}
      </label>
      <div className="relative">
        <select
          {...selectProps}
          id={selectProps.name}
          defaultValue=""
          className={`${getBaseInputClass(!!error)} cursor-pointer pr-10`}
          aria-invalid={!!error}
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
