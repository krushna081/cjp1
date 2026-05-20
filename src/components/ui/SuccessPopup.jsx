import { motion } from 'framer-motion'

export default function SuccessPopup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed bottom-6 right-6 z-[100] bg-green text-paper p-6 border-2 border-paper shadow-[8px_8px_0_var(--ink)] max-w-sm w-[calc(100%-48px)]"
    >
      <div className="flex items-start gap-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
          className="w-12 h-12 rounded-full bg-paper text-green flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <div>
          <motion.h4 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-lg leading-none mb-2"
          >
            Membership Submitted!
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-sm text-paper/80"
          >
            Welcome to the swarm. We'll be in touch soon. 🪳
          </motion.p>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green rotate-45 border-b-2 border-r-2 border-paper" />
    </motion.div>
  )
}