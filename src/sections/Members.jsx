import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'

function Members() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await api.get('/api/members')
      if (response.data?.data?.length > 0) {
        setMembers(response.data.data)
      } else {
        setMembers(getDefaultMembers())
      }
    } catch (error) {
      setMembers(getDefaultMembers())
    } finally {
      setLoading(false)
    }
  }

  const getDefaultMembers = () => [
    { _id: '1', fullName: 'Rahul Sharma', state: 'Maharashtra', district: 'Mumbai', joinedAt: new Date() },
    { _id: '2', fullName: 'Priya Patel', state: 'Gujarat', district: 'Ahmedabad', joinedAt: new Date() },
    { _id: '3', fullName: 'Amit Singh', state: 'Delhi', district: 'New Delhi', joinedAt: new Date() },
    { _id: '4', fullName: 'Sneha Gupta', state: 'Karnataka', district: 'Bangalore', joinedAt: new Date() },
    { _id: '5', fullName: 'Vikram Rao', state: 'Tamil Nadu', district: 'Chennai', joinedAt: new Date() },
    { _id: '6', fullName: 'Anita Kumar', state: 'West Bengal', district: 'Kolkata', joinedAt: new Date() },
    { _id: '7', fullName: 'Rajesh Verma', state: 'Maharashtra', district: 'Pune', joinedAt: new Date() },
    { _id: '8', fullName: 'Neha Kapoor', state: 'Delhi', district: 'South Delhi', joinedAt: new Date() },
  ]

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 lg:py-32 bg-paper-2 border-b-2 border-ink overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-6">
            The Swarm
          </span>
          <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-ink mb-6">
            Latest Members.
          </h2>
          <p className="font-sans text-lg leading-relaxed text-ink-2 max-w-[560px] mx-auto">
            Real people. Real stories. Real commitment to doing absolutely nothing, productively.
          </p>
        </motion.header>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-ink text-paper border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all flex items-center justify-center shadow-[4px_4px_0_var(--ink)]"
          >
            <span className="text-xl">←</span>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-ink text-paper border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all flex items-center justify-center shadow-[4px_4px_0_var(--ink)]"
          >
            <span className="text-xl">→</span>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {members.slice(0, 8).map((member, index) => (
              <motion.div
                key={member._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-shrink-0 w-[280px] bg-paper border-2 border-ink shadow-[5px_5px_0_var(--ink)] hover:shadow-[8px_8px_0_var(--saffron-deep)] hover:-translate-y-1 transition-all p-5 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg">
                    {getInitials(member.fullName)}
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-ink leading-tight group-hover:text-saffron-deep transition-colors">
                      {member.fullName}
                    </h4>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-3">
                      {formatDate(member.joinedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-ink/20">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-saffron-deep">
                    {member.state}
                  </span>
                  <span className="text-ink/30">·</span>
                  <span className="font-sans text-xs text-ink-2">
                    {member.district}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-3">
            Total Members: <span className="font-display text-2xl text-ink">{members.length}+</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Members