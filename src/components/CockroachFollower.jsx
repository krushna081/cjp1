import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CockroachSVG({ moving }) {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full">
      <ellipse cx="30" cy="30" rx="12" ry="8" fill="rgba(0,0,0,0.25)" filter="url(#blur)" />
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
      <ellipse cx="30" cy="24" rx="14" ry="10" fill="#3D2814" />
      <ellipse cx="30" cy="22" rx="12" ry="8" fill="#4A3420" />
      <ellipse cx="30" cy="14" rx="8" ry="6" fill="#3D2814" />
      <ellipse cx="30" cy="13" rx="6" ry="4" fill="#5C4228" />
      <motion.path
        d="M22 10 Q18 2 14 0"
        stroke="#2A1A0A" strokeWidth="1.5" fill="none" strokeLinecap="round"
        animate={{
          d: moving ? "M22 10 Q15 3 11 1" : "M22 10 Q18 2 14 0"
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M38 10 Q42 2 46 0"
        stroke="#2A1A0A" strokeWidth="1.5" fill="none" strokeLinecap="round"
        animate={{
          d: moving ? "M38 10 Q45 3 49 1" : "M38 10 Q42 2 46 0"
        }}
        transition={{ duration: 0.2 }}
      />
      <circle cx="25" cy="13" r="2" fill="#1a1a1a" />
      <circle cx="35" cy="13" r="2" fill="#1a1a1a" />
      <circle cx="25.5" cy="12.5" r="0.8" fill="#fff" opacity="0.3" />
      <circle cx="35.5" cy="12.5" r="0.8" fill="#fff" opacity="0.3" />
      {[0, 1, 2].map((i) => (
        <motion.line
          key={`l${i}`}
          x1={18 + i * 2} y1={20 + i * 4}
          x2={10 + i * 2} y2={28 + i * 4}
          stroke="#2A1A0A" strokeWidth="2" strokeLinecap="round"
          animate={moving ? {
            x2: [10 + i * 2, 4 + i * 2, 10 + i * 2],
            y2: [28 + i * 4, 34 + i * 4, 28 + i * 4]
          } : {}}
          transition={{ duration: 0.12, repeat: moving ? Infinity : 0, ease: "easeInOut", delay: i * 0.04 }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={`r${i}`}
          x1={42 - i * 2} y1={20 + i * 4}
          x2={50 - i * 2} y2={28 + i * 4}
          stroke="#2A1A0A" strokeWidth="2" strokeLinecap="round"
          animate={moving ? {
            x2: [50 - i * 2, 56 - i * 2, 50 - i * 2],
            y2: [28 + i * 4, 34 + i * 4, 28 + i * 4]
          } : {}}
          transition={{ duration: 0.12, repeat: moving ? Infinity : 0, ease: "easeInOut", delay: i * 0.04 }}
        />
      ))}
    </svg>
  )
}

export default function CockroachFollower() {
  const [{ x, y }, setPos] = useState({ x: -100, y: -100 })
  const [moving, setMoving] = useState(false)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [showToggle, setShowToggle] = useState(false)

  const posRef = useRef({ x: -100, y: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const movingRef = useRef(false)
  const rafRef = useRef(null)
  const moveTimerRef = useRef(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setEnabled(!mq.matches)
    const handler = (e) => setEnabled(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let lastTime = 0

    function lerp(current, target, speed) {
      return current + (target - current) * speed
    }

    function animate(time) {
      if (time - lastTime < 16) { rafRef.current = requestAnimationFrame(animate); return }
      lastTime = time

      const t = targetRef.current
      const p = posRef.current

      const dx = t.x - p.x
      const dy = t.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      const speed = dist > 100 ? 0.12 : dist > 30 ? 0.08 : 0.06
      const close = dist < 5

      p.x = close ? t.x : lerp(p.x, t.x, speed)
      p.y = close ? t.y : lerp(p.y, t.y, speed)

      setPos({ x: p.x, y: p.y })
      setMoving(dist > 3)

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [enabled])

  const handleMouse = useCallback((e) => {
    if (!enabled) return
    const margin = 40
    targetRef.current = {
      x: Math.max(margin, Math.min(window.innerWidth - margin, e.clientX)),
      y: Math.max(margin, Math.min(window.innerHeight - margin, e.clientY))
    }
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current)
    moveTimerRef.current = setTimeout(() => { movingRef.current = false }, 200)
  }, [enabled])

  const handleTouch = useCallback((e) => {
    if (!enabled) return
    const t = e.touches[0]
    if (!t) return
    const margin = 40
    targetRef.current = {
      x: Math.max(margin, Math.min(window.innerWidth - margin, t.clientX)),
      y: Math.max(margin, Math.min(window.innerHeight - margin, t.clientY))
    }
  }, [enabled])

  const handleScroll = useCallback(() => {
    if (!enabled) return
    const delta = window.scrollY - scrollYRef.current
    scrollYRef.current = window.scrollY
    if (Math.abs(delta) > 3) {
      targetRef.current = {
        x: targetRef.current.x,
        y: targetRef.current.y - delta * 0.3
      }
    }
  }, [enabled])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    setTimeout(() => setVisible(true), 300)
    setTimeout(() => setShowToggle(true), 3000)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('scroll', handleScroll)
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current)
    }
  }, [handleMouse, handleTouch, handleScroll])

  if (!enabled || !visible) {
    return showToggle ? (
      <motion.button
        onClick={() => setEnabled(e => !e)}
        className="fixed bottom-4 left-4 z-[1000] bg-ink text-paper rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-saffron-2 transition-colors"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} whileHover={{ opacity: 1 }}
        aria-label="Toggle cockroach companion"
      >
        <svg viewBox="0 0 60 40" className="w-4 h-3" fill="currentColor">
          <ellipse cx="30" cy="24" rx="14" ry="10" />
          <ellipse cx="30" cy="14" rx="8" ry="6" />
        </svg>
      </motion.button>
    ) : null
  }

  const tilt = Math.max(-10, Math.min(10, (targetRef.current.x - posRef.current.x) * 0.5))

  return (
    <>
      {showToggle && (
        <motion.button
          onClick={() => setEnabled(e => !e)}
          className="fixed bottom-4 left-4 z-[1000] bg-ink text-paper rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-saffron-2 transition-colors"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} whileHover={{ opacity: 1 }}
          aria-label="Toggle cockroach companion"
        >
          <svg viewBox="0 0 60 40" className="w-4 h-3" fill="currentColor">
            <ellipse cx="30" cy="24" rx="14" ry="10" />
            <ellipse cx="30" cy="14" rx="8" ry="6" />
          </svg>
        </motion.button>
      )}
      <motion.div
        className="fixed pointer-events-none z-[999]"
        style={{
          left: x - 30, top: y - 20,
          width: 'clamp(40px, 8vw, 60px)',
          height: 'clamp(27px, 5.3vw, 40px)',
          rotate: `${tilt}deg`,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            scaleX: moving ? [1, 0.93, 1] : [1, 1.02, 1],
          }}
          transition={{
            duration: moving ? 0.1 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CockroachSVG moving={moving} />
        </motion.div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-black/20 rounded-full blur-sm"
          style={{ opacity: moving ? 0.3 : 0.2 }}
        />
      </motion.div>
    </>
  )
}