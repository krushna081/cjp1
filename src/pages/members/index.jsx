import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Select } from '../../components/ui'
import { INDIA_STATES } from '../../constants'
import { formatDate, getInitials } from '../../utils'
import api from '../../api/axios'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 847,
    states: 18,
    districts: 86
  })
  const [filters, setFilters] = useState({
    state: '',
    district: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const [membersRes, statsRes] = await Promise.all([
        api.get('/api/members'),
        api.get('/api/stats')
      ])
      
      if (membersRes.data?.data) {
        setMembers(membersRes.data.data)
        setLoading(false)
      }
      if (statsRes.data) {
        setStats({
          total: statsRes.data.totalMembers || 847,
          states: statsRes.data.statesCount || 18,
          districts: statsRes.data.districtsCount || 86
        })
      }
    } catch (error) {
      setLoading(false)
      setMembers(getDefaultMembers())
    }
  }

  const getDefaultMembers = () => {
    const defaultMembers = [
      { _id: '1', fullName: 'Rahul Sharma', state: 'Maharashtra', district: 'Mumbai', joinedAt: new Date(), twitterHandle: '@rahulS' },
      { _id: '2', fullName: 'Priya Patel', state: 'Gujarat', district: 'Ahmedabad', joinedAt: new Date(), twitterHandle: '@priyaP' },
      { _id: '3', fullName: 'Amit Singh', state: 'Delhi', district: 'New Delhi', joinedAt: new Date(), twitterHandle: '@amitS' },
      { _id: '4', fullName: 'Sneha Gupta', state: 'Karnataka', district: 'Bangalore', joinedAt: new Date(), twitterHandle: '@snehaG' },
      { _id: '5', fullName: 'Vikram Rao', state: 'Tamil Nadu', district: 'Chennai', joinedAt: new Date(), twitterHandle: '@vikramR' },
      { _id: '6', fullName: 'Anita Kumar', state: 'West Bengal', district: 'Kolkata', joinedAt: new Date(), twitterHandle: '@anitaK' },
      { _id: '7', fullName: 'Rajesh Verma', state: 'Maharashtra', district: 'Pune', joinedAt: new Date(), twitterHandle: '@rajeshV' },
      { _id: '8', fullName: 'Neha Kapoor', state: 'Delhi', district: 'South Delhi', joinedAt: new Date(), twitterHandle: '@nehaK' },
      { _id: '9', fullName: 'Vijay Kumar', state: 'Telangana', district: 'Hyderabad', joinedAt: new Date(), twitterHandle: '@vijayK' },
      { _id: '10', fullName: 'Meera Reddy', state: 'Andhra Pradesh', district: 'Visakhapatnam', joinedAt: new Date(), twitterHandle: '@meeraR' },
      { _id: '11', fullName: 'Arun Joshi', state: 'Maharashtra', district: 'Nagpur', joinedAt: new Date(), twitterHandle: '@arunJ' },
      { _id: '12', fullName: 'Sunita Devi', state: 'Rajasthan', district: 'Jaipur', joinedAt: new Date(), twitterHandle: '@sunitaD' },
      { _id: '13', fullName: 'Pankaj Bhatt', state: 'Gujarat', district: 'Surat', joinedAt: new Date(), twitterHandle: '@pankajB' },
      { _id: '14', fullName: 'Kavita Nair', state: 'Kerala', district: 'Thiruvananthapuram', joinedAt: new Date(), twitterHandle: '@kavitaN' },
      { _id: '15', fullName: 'Ravi Pandey', state: 'Uttar Pradesh', district: 'Lucknow', joinedAt: new Date(), twitterHandle: '@raviP' },
    ]
    return defaultMembers
  }

  const filteredMembers = members.filter(member => {
    if (filters.state && member.state !== filters.state) return false
    if (filters.district && member.district !== filters.district) return false
    return true
  })

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
    setCurrentPage(1)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-ink text-paper border-b-4 border-saffron relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-4">
              The Swarm
            </span>
            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[80px] leading-[0.95] tracking-[-0.01em] text-paper mb-4">
              Our Members.
            </h1>
            <p className="font-sans text-base sm:text-lg text-paper/70 max-w-2xl">
              Real people. Real stories. Real commitment to doing absolutely nothing, productively.
              Join the movement and become part of something big.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 sm:py-10 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="text-center p-4 sm:p-6 bg-paper border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="font-display text-3xl sm:text-4xl text-ink">{stats.total}+</span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mt-1 block">Total Members</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-4 sm:p-6 bg-paper border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="font-display text-3xl sm:text-4xl text-ink">{stats.states}+</span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mt-1 block">States</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-4 sm:p-6 bg-paper border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="font-display text-3xl sm:text-4xl text-ink">{stats.districts}+</span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mt-1 block">Districts</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-4 sm:p-6 bg-paper border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="font-display text-3xl sm:text-4xl text-ink">∞</span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mt-1 block">Demands</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-end">
            <div className="flex-1 w-full">
              <Select
                label="Filter by State"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                options={INDIA_STATES}
                placeholder="All States"
              />
            </div>
            <div className="flex gap-3">
              {filters.state && (
                <button
                  onClick={() => handleFilterChange('state', '')}
                  className="px-4 py-3 bg-paper-2 border-2 border-ink font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-ink hover:text-paper transition-all"
                >
                  Clear
                </button>
              )}
              <Link
                to="/join"
                className="px-6 py-3 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.15em] uppercase border-2 border-ink hover:bg-saffron-deep/90 transition-all"
              >
                Join Party →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-10 sm:py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-ink border-t-transparent rounded-full animate-spin" />
            </div>
          ) : currentMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-ink-2 mb-4">No members found</p>
              <p className="font-sans text-ink-3">Be the first to join from this state!</p>
              <Link to="/join" className="inline-flex items-center gap-2 mt-6 bg-saffron-deep text-paper font-condensed font-bold text-sm tracking-[0.15em] uppercase px-6 py-3 border-2 border-ink">
                Join Now →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {currentMembers.map((member, index) => (
                  <motion.div
                    key={member._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-paper-2 border-2 border-ink shadow-[5px_5px_0_var(--ink)] p-5 sm:p-6 group hover:shadow-[8px_8px_0_var(--saffron-deep)] hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg sm:text-xl flex-shrink-0 group-hover:bg-saffron-deep transition-colors">
                        {getInitials(member.fullName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg sm:text-xl text-ink leading-tight truncate">{member.fullName}</h3>
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-ink-3">
                          Joined {formatDate(member.joinedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-ink/20">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-saffron-deep">State</span>
                        <span className="text-ink-2 font-sans text-sm">{member.state}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-saffron-deep">District</span>
                        <span className="text-ink-2 font-sans text-sm">{member.district}</span>
                      </div>
                      {member.twitterHandle && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-saffron-deep">Twitter</span>
                          <span className="text-ink-2 font-sans text-sm">{member.twitterHandle}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 sm:mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-ink font-display text-lg hover:bg-ink hover:text-paper transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ←
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 border-2 font-display text-lg transition-all ${
                        currentPage === i + 1
                          ? 'bg-ink text-paper border-ink'
                          : 'border-ink hover:bg-ink/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-ink font-display text-lg hover:bg-ink hover:text-paper transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10 sm:mt-16"
          >
            <p className="font-sans text-ink-2 mb-4">Want to be part of our growing family?</p>
            <Link to="/join" className="inline-flex items-center gap-3 bg-saffron-deep text-paper font-condensed font-bold text-base tracking-[0.18em] uppercase px-10 py-4 border-2 border-ink shadow-[6px_6px_0_var(--ink)] hover:shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Join the Party <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}