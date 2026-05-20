import { motion } from 'framer-motion'
import { MARQUEE_SLOGANS } from '../../constants'

export default function Marquee() {
  const items = [...MARQUEE_SLOGANS, ...MARQUEE_SLOGANS, ...MARQUEE_SLOGANS]

  return (
    <div className="bg-ink text-paper py-5 sm:py-6 overflow-hidden border-y-4 border-saffron">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((slogan, index) => (
          <motion.span 
            key={index}
            className={`mx-8 sm:mx-12 font-display text-xl sm:text-2xl lg:text-[28px] tracking-[0.01em] ${
              index % 4 === 1 || index % 4 === 3 ? 'text-green-2' : 'text-saffron-2'
            }`}
          >
            {slogan}
            <span className="text-green-2 text-base sm:text-lg mx-4 align-middle">✦</span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}