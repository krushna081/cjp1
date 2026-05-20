import { motion } from 'framer-motion'

function SuccessPopup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[100] bg-green text-paper p-6 border-2 border-paper shadow-[8px_8px_0_var(--ink)] max-w-sm"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-paper text-green flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h4 className="font-display text-lg leading-none mb-2">Membership Submitted!</h4>
          <p className="font-sans text-sm text-paper/80">
            Welcome to the swarm. We'll be in touch soon. 🪳
          </p>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green rotate-45 border-b-2 border-r-2 border-paper" />
    </motion.div>
  )
}

export default SuccessPopup