import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'

export default function CompactFounder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg">
          AD
        </div>
        
        <div className="flex-1">
          <h3 className="font-display text-xl text-ink">Abhijeet Dipke</h3>
          <p className="font-mono text-[10px] uppercase tracking-wider text-saffron-deep mb-2">
            Founder & Convenor
          </p>
          
          <p className="font-sans text-sm text-ink-2 leading-relaxed mb-4 italic">
            "They tried to step on us. We came back — louder, angrier, and with better graphics."
          </p>
          
          <div className="flex items-center gap-4 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3">
              HQ: Wherever the wifi works.
            </span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-ink/10">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block mb-2">
              Follow
            </span>
            <SocialLinks 
              variant="icons"
              showLabels={false}
              links={{
                twitter: { url: '#', label: 'Twitter/X' },
                instagram: { url: '#', label: 'Instagram' }
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}