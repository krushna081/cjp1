import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  to,
  onClick,
  ...props 
}) {
  const Component = to ? Link : 'div'
  
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '8px 8px 0 var(--saffron-deep)' } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`
        bg-paper border-2 border-ink shadow-[5px_5px_0_var(--ink)] 
        ${hover ? 'hover:shadow-[8px_8px_0_var(--saffron-deep)]' : ''}
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {to ? (
        <Link to={to} className="block">
          {children}
        </Link>
      ) : onClick ? (
        <div onClick={onClick} className="cursor-pointer">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-5 border-b border-ink/20 ${className}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-4 bg-paper-2 border-t border-ink/20 ${className}`}>
      {children}
    </div>
  )
}