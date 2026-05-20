import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Marquee, StateAnalytics, CompactFounder } from '../../components/ui'
import { MANIFESTO_DEMANDS, ELIGIBILITY_CRITERIA, MEETING_TYPES } from '../../constants'
import { formatDateShort } from '../../utils'
import { supabase } from '../../lib/supabase'
import { useState, useEffect } from 'react'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function HomePage() {
  const [stats, setStats] = useState({
    totalMembers: 847,
    totalMeetings: 12,
    activeVolunteers: 156,
    statesWithMembers: 14,
    nationalReach: 52,
    topStates: []
  })
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const TOTAL_INDIAN_STATES = 28
      
      const [membersResult, meetingsResult] = await Promise.all([
        supabase.from('members').select('state'),
        supabase.from('meetings').select('*').order('meeting_date', { ascending: true }).limit(3)
      ])
      
      if (membersResult.data) {
        const totalMembers = membersResult.data.length
        
        const stateCounts = membersResult.data.reduce((acc, member) => {
          if (member.state) {
            acc[member.state] = (acc[member.state] || 0) + 1
          }
          return acc
        }, {})
        
        const stateStats = Object.entries(stateCounts)
          .map(([state, count]) => ({ state, count }))
          .sort((a, b) => b.count - a.count)
        
        const statesWithMembers = stateStats.length
        const nationalReach = Math.round((statesWithMembers / TOTAL_INDIAN_STATES) * 100)
        
        setStats({
          totalMembers,
          totalMeetings: 0,
          activeVolunteers: Math.floor(totalMembers * 0.1),
          statesWithMembers,
          nationalReach,
          topStates: stateStats.slice(0, 6).map(s => ({
            state: s.state,
            count: s.count,
            percentage: totalMembers > 0 ? Math.round((s.count / totalMembers) * 100) : 0
          }))
        })
      }
      
      if (meetingsResult.data) setMeetings(meetingsResult.data.slice(0, 3))
    } catch (error) {
      console.log('Using default data')
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative bg-paper border-b-2 border-ink overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-saffron/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <div className="max-w-xl">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-blood border border-blood rounded-full px-3 py-1.5 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blood animate-livepulse" />
                  Party Launch · Live since yesterday
                </motion.div>

                <motion.h1 variants={itemVariants} className="font-display text-[36px] sm:text-[48px] lg:text-[72px] xl:text-[88px] leading-[0.95] tracking-[-0.01em] text-ink mb-4">
                  Voice of the<br />
                  <span className="text-saffron-deep">Lazy</span> &<br />
                  <span className="text-green italic font-serif">Unemployed.</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="font-sans text-base leading-relaxed text-ink-2 max-w-lg mb-6">
                  A political party for the people the system forgot to count.
                  Five demands. Zero sponsors. One large, stubborn swarm.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-8">
                  <Link to="/join" className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-5 py-2.5 border-2 border-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    Join the Party <span>→</span>
                  </Link>
                  <Link to="/manifesto" className="font-condensed font-medium text-xs tracking-[0.18em] uppercase text-ink border-b-2 border-ink pb-1 hover:text-saffron-deep hover:border-saffron-deep transition-colors">
                    Read Manifesto
                  </Link>
                </motion.div>

                {/* Hero Stats Strip */}
                <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4 pt-6 border-t border-ink/20">
                  <div><span className="font-display text-2xl lg:text-3xl text-ink">5</span><span className="block font-mono text-[10px] tracking-wider uppercase text-ink-3">Demands</span></div>
                  <div><span className="font-display text-2xl lg:text-3xl text-ink">0</span><span className="block font-mono text-[10px] tracking-wider uppercase text-ink-3">Sponsors</span></div>
                  <div><span className="font-display text-2xl lg:text-3xl text-ink">∞</span><span className="block font-mono text-[10px] tracking-wider uppercase text-ink-3">Patience</span></div>
                  <div><span className="font-display text-2xl lg:text-3xl text-ink">1</span><span className="block font-mono text-[10px] tracking-wider uppercase text-ink-3">Founder</span></div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Poster Frame */}
            <div className="hidden lg:block relative">
              <div className="relative transform rotate-[1.5deg] bg-paper-2 border-[3px] border-ink shadow-[12px_12px_0_var(--ink)] shadow-[12px_12px_0_4px_var(--saffron-deep)] overflow-hidden">
                <div className="flex justify-between items-center bg-saffron-deep text-paper px-4 py-2 border-b-2 border-ink">
                  <span className="font-mono text-[10px] tracking-wider uppercase">Official Poster · No. 001</span>
                  <span className="text-[10px]">★ ★ ★</span>
                </div>
                <img 
                  src="/img/banner-1.webp" 
                  alt="The Founder addresses the swarm" 
                  className="w-full h-auto object-cover"
                />
                <div className="bg-ink text-paper px-6 py-5 text-center">
                  <p className="font-mono text-[10px] tracking-wider uppercase text-saffron-2 mb-2">Together · Resilient · Unstoppable</p>
                  <p className="font-display text-lg leading-tight">"They tried to step on us.<br/>We came back."</p>
                </div>
                <span className="absolute top-10 -right-6 bg-blood text-paper font-condensed font-bold text-xs tracking-wider uppercase px-4 py-1 border-2 border-paper rotate-[15deg]">
                  Approved
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* State Membership Statistics */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep mb-4">
              National Reach
            </span>
            <StateAnalytics />
          </motion.div>
        </div>
      </section>

      {/* Manifesto Preview */}
      <section className="py-10 sm:py-12 lg:py-16 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2 mb-2">
              The Five Demands
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[48px] leading-[0.95] tracking-[-0.01em] text-paper">
              The Manifesto.
            </h2>
          </motion.header>

          <div className="space-y-2 max-w-3xl">
            {MANIFESTO_DEMANDS.slice(0, 3).map((demand, index) => (
              <motion.div
                key={demand.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 p-3 hover:bg-white/5 -mx-3 px-3 transition-colors cursor-pointer"
              >
                <span className="font-display text-[28px] sm:text-[36px] text-saffron-2 leading-none flex-shrink-0 w-12">
                  {demand.num}
                </span>
                <p 
                  className="font-sans text-sm sm:text-base leading-relaxed text-paper/80 pt-1"
                  dangerouslySetInnerHTML={{ 
                    __html: demand.text.replace(/<strong>/g, '<span class="text-paper font-semibold">').replace(/<\/strong>/g, '</span>')
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <Link to="/manifesto" className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-5 py-2.5 border-2 border-paper/30 hover:border-paper transition-all">
              Read All 5 Demands <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Meetings */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep mb-2">
              Stay Connected
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[48px] leading-[0.95] tracking-[-0.01em] text-ink">
              Upcoming Meetings.
            </h2>
          </motion.header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {meetings.length > 0 ? meetings.map((meeting, index) => {
              const { day, month } = formatDateShort(meeting.meeting_date)
              const type = MEETING_TYPES[meeting.meeting_type] || MEETING_TYPES.meeting

              return (
                <motion.div
                  key={meeting.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-paper-2 border border-ink/30 p-4 hover:border-saffron-deep transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-center min-w-[50px]">
                      <div className="font-display text-2xl text-ink">{day}</div>
                      <div className="font-mono text-[10px] tracking-wider text-saffron-deep uppercase">{month}</div>
                    </div>
                    <div>
                      <span className="text-sm mr-1">{type.icon}</span>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-ink-3">{type.label}</span>
                      <h3 className="font-display text-base text-ink leading-tight mt-1">{meeting.title}</h3>
                      <p className="font-mono text-[10px] text-ink-3 mt-1">
                        🕐 {meeting.meeting_time} · 📍 {meeting.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            }) : (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-8">
                <p className="font-sans text-ink-2 text-sm">No upcoming meetings scheduled.</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Link to="/meetings" className="inline-flex items-center gap-2 bg-ink text-paper font-condensed font-semibold text-xs tracking-[0.15em] uppercase px-4 py-2 border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all">
              View All Meetings <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep mb-2">
              Membership
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[48px] leading-[0.95] tracking-[-0.01em] text-ink">
              Are you eligible?
            </h2>
          </motion.header>

          <div className="flex flex-wrap gap-2 mb-6">
            {ELIGIBILITY_CRITERIA.map((item, index) => (
              <motion.div
                key={item.req}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex items-center gap-2 px-3 py-2 bg-paper border border-ink/30 hover:border-saffron-deep transition-colors"
              >
                <span className="font-display text-base text-ink">{item.title}</span>
                <span className="text-green text-sm">✓</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/join" className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-5 py-2.5 border-2 border-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Join the Party <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      

      {/* Founder Section - Compact */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep mb-4">
              The Founder
            </span>
            <CompactFounder />
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-8 sm:py-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/img/banner-1.webp" alt="CJP Banner" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-saffron-deep/90 to-green/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <img src="/img/logo.jpeg" alt="CJP" className="w-16 h-16 rounded-full border-2 border-paper object-cover" />
            </div>
            <h3 className="font-display text-[28px] sm:text-[36px] lg:text-[48px] leading-[0.95] text-paper mb-3">
              STRONGER TOGETHER
            </h3>
            <p className="font-condensed text-xs tracking-[0.2em] uppercase text-paper/80 mb-5">
              Become a Member of the Cockroach Janta Party
            </p>
            <Link to="/join" className="inline-flex items-center gap-2 bg-paper text-ink font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper hover:bg-saffron-deep hover:text-paper transition-all">
              Join Now <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}