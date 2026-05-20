import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

function Counter({ value = 0, suffix = '', className = '' }) {
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
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

export default Counter