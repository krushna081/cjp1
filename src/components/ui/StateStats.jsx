import { motion } from 'framer-motion'

export default function StateStats({ stats }) {
  return (
    <div className="flex flex-wrap gap-3">
      {stats.topStates.map((item, index) => (
        <motion.div
          key={item.state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-2 px-3 py-2 bg-paper-2 border border-ink/20 hover:border-saffron-deep transition-colors"
        >
          <span className="font-sans text-sm text-ink font-medium">{item.state}</span>
          <span className="font-mono text-xs text-saffron-deep">→</span>
          <span className="font-display text-sm text-ink">{item.count}</span>
        </motion.div>
      ))}
    </div>
  )
}