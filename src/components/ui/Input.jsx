import { useState } from 'react'
import { motion } from 'framer-motion'

export function Input({ 
  label,
  error,
  type = 'text',
  className = '',
  required = false,
  disabled = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block mb-2">
          <span className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase ${
            error ? 'text-blood' : focused ? 'text-saffron-deep' : 'text-ink-2'
          }`}>
            {label}
            {required && <span className="text-blood ml-1">*</span>}
          </span>
        </label>
      )}
      <input
        type={type}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full bg-paper border-2 px-4 py-3 font-sans text-sm sm:text-base text-ink 
          transition-all duration-200
          ${error 
            ? 'border-blood' 
            : focused 
              ? 'border-saffron-deep shadow-[3px_3px_0_var(--saffron-deep)]' 
              : 'border-ink'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-paper-2' : ''}
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blood text-xs mt-1 block font-mono"
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}

export function Select({ 
  label,
  options,
  error,
  className = '',
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  ...props 
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block mb-2">
          <span className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase ${
            error ? 'text-blood' : focused ? 'text-saffron-deep' : 'text-ink-2'
          }`}>
            {label}
            {required && <span className="text-blood ml-1">*</span>}
          </span>
        </label>
      )}
      <div className="relative">
        <select
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full bg-paper border-2 px-4 py-3 font-sans text-sm sm:text-base text-ink 
            transition-all duration-200 appearance-none cursor-pointer
            ${error 
              ? 'border-blood' 
              : focused 
                ? 'border-saffron-deep shadow-[3px_3px_0_var(--saffron-deep)]' 
                : 'border-ink'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-paper-2' : ''}
            focus:outline-none
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blood text-xs mt-1 block font-mono"
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}

export function Textarea({ 
  label,
  error,
  className = '',
  required = false,
  disabled = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block mb-2">
          <span className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase ${
            error ? 'text-blood' : focused ? 'text-saffron-deep' : 'text-ink-2'
          }`}>
            {label}
            {required && <span className="text-blood ml-1">*</span>}
          </span>
        </label>
      )}
      <textarea
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full bg-paper border-2 px-4 py-3 font-sans text-sm sm:text-base text-ink 
          transition-all duration-200 resize-none
          ${error 
            ? 'border-blood' 
            : focused 
              ? 'border-saffron-deep shadow-[3px_3px_0_var(--saffron-deep)]' 
              : 'border-ink'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-paper-2' : ''}
          focus:outline-none
        `}
        rows={4}
        {...props}
      />
      {error && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blood text-xs mt-1 block font-mono"
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}

export function RadioGroup({ 
  label,
  name,
  options,
  value,
  onChange,
  error,
  className = '',
  required = false
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-3">
          <span className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase ${
            error ? 'text-blood' : 'text-ink-2'
          }`}>
            {label}
            {required && <span className="text-blood ml-1">*</span>}
          </span>
        </label>
      )}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label 
            key={option} 
            className={`
              flex items-center gap-2 cursor-pointer px-4 py-2 border-2 transition-all
              ${value === option 
                ? 'border-saffron-deep bg-saffron-deep/10 text-ink' 
                : 'border-ink/30 bg-paper hover:border-ink'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="w-4 h-4 accent-saffron-deep"
            />
            <span className="font-sans text-sm">{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blood text-xs mt-1 block font-mono"
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}