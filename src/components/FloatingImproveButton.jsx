import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function FloatingImproveButton() {
  const navigate = useNavigate()

  return (
    <motion.button
      onClick={() => navigate('/improve-cjp')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
      aria-label="Improve CJP - Share your ideas"
    >
      {/* Pulse Ring Effect */}
      <motion.span
        className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron to-saffron-deep"
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(224, 101, 30, 0.4)',
            '0 0 0 15px rgba(224, 101, 30, 0)',
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut'
        }}
      />

      {/* Main Button */}
      <div className="relative w-14 h-14 md:w-[70px] md:h-[70px] rounded-full bg-gradient-to-br from-saffron via-saffron-deep to-saffron-deep shadow-[0_8px_30px_rgba(224,101,30,0.4)] backdrop-blur-sm border-2 border-ink/20 flex items-center justify-center overflow-hidden">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon */}
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-paper drop-shadow-md" strokeWidth={2} />
        
        {/* Glow */}
        <div className="absolute -inset-1 bg-saffron/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Tooltip - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-ink text-paper font-condensed text-xs tracking-wider uppercase whitespace-nowrap rounded shadow-lg"
      >
        Improve CJP
      </motion.div>
    </motion.button>
  )
}