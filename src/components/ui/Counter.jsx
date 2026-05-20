import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function Counter({ value = 0, suffix = '', className = '' }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  const spring = useSpring(0, { stiffness: 40, damping: 15 })
  const display = useTransform(spring, (val) => Math.floor(val).toLocaleString())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
          spring.set(value)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated, spring])

  useEffect(() => {
    if (isVisible && hasAnimated) {
      spring.set(value)
    }
  }, [value, isVisible, hasAnimated, spring])

  return (
    <motion.span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  )
}

export function StatCard({ value, label, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center p-4 sm:p-6 bg-paper border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
    >
      {icon && <span className="text-2xl sm:text-3xl mb-2 block">{icon}</span>}
      <Counter value={value} suffix="+" className="font-display text-3xl sm:text-4xl text-ink block" />
      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mt-1 block">{label}</span>
    </motion.div>
  )
}