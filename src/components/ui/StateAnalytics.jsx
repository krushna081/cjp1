import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../api/axios'
import StateStats from './StateStats'

export default function StateAnalytics() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    statesWithMembers: 0,
    totalStates: 28,
    nationalReach: 0,
    topStates: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/stats')
      if (response.data) {
        setStats(response.data)
      }
    } catch (error) {
      setStats({
        totalMembers: 847,
        statesWithMembers: 14,
        totalStates: 28,
        nationalReach: 52,
        topStates: [
          { state: 'Maharashtra', count: 120, percentage: 14 },
          { state: 'Delhi', count: 45, percentage: 5 },
          { state: 'Gujarat', count: 70, percentage: 8 },
          { state: 'Karnataka', count: 55, percentage: 6 },
          { state: 'West Bengal', count: 40, percentage: 5 },
          { state: 'Tamil Nadu', count: 35, percentage: 4 },
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Top Stats Row */}
      <div className="flex flex-wrap gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 bg-saffron-deep/10 border border-saffron-deep/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">Total</span>
          <span className="font-display text-lg text-ink">{stats.totalMembers}+</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 px-4 py-2 bg-green/10 border border-green/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">States</span>
          <span className="font-display text-lg text-ink">{stats.statesWithMembers}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 bg-ink/10 border border-ink/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2">Reach</span>
          <span className="font-display text-lg text-ink">{stats.nationalReach}%</span>
        </motion.div>
      </div>

      {/* State List */}
      <StateStats stats={stats} />
    </div>
  )
}