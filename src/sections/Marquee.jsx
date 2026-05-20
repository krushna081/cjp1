import { motion } from 'framer-motion'

const slogans = [
  'Together We Survive',
  'Stronger Together',
  'Unity · Resilience · Progress',
  'You Cannot Squash A Movement',
]

function Marquee() {
  return (
    <div className="bg-ink text-paper py-6 overflow-hidden border-t-4 border-saffron border-b-4 border-green">
      <div className="animate-marquee flex whitespace-nowrap font-display text-[32px] tracking-[0.015em]">
        {[...slogans, ...slogans, ...slogans].map((slogan, index) => (
          <motion.span 
            key={index}
            className={`mx-12 ${index % 4 === 1 || index % 4 === 3 ? 'text-green-2' : 'text-saffron-2'}`}
          >
            {slogan} <span className="text-green-2 text-2xl align-middle mx-4">✦</span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default Marquee