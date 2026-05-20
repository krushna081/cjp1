import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-saffron-deep text-paper border-ink shadow-[6px_6px_0_var(--ink)] hover:shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5',
  secondary: 'bg-ink text-paper border-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5',
  outline: 'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-paper',
  ghost: 'bg-transparent text-ink border-2 border-transparent hover:border-ink'
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
  xl: 'px-8 py-5 text-lg'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  ...props 
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        font-condensed font-bold tracking-[0.18em] uppercase border-2 
        transition-all duration-200 inline-flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
          {!loading && !icon && (
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          )}
        </>
      )}
    </motion.button>
  )
}