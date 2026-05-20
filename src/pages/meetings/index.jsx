import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MEETING_TYPES } from '../../constants'
import { formatDateShort } from '../../utils'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchMeetings()
  }, [])

  const fetchMeetings = async () => {
    try {
      const response = await supabase.from('meetings').select('*').order('meeting_date', { ascending: true })
      if (response.data?.length > 0) {
        setMeetings(response.data)
      } else {
        setMeetings(getDefaultMeetings())
      }
    } catch (error) {
      setMeetings(getDefaultMeetings())
    } finally {
      setLoading(false)
    }
  }

  const getDefaultMeetings = () => [
    { _id: '1', title: 'CJP Town Hall: The Unemployed Speak', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), time: '8:00 PM IST', location: 'Twitter Spaces', description: 'An open forum for all members to discuss their concerns and share experiences.', meetingType: 'twitter_space', joinLink: '#' },
    { _id: '2', title: 'Rally: Jobs for Everyone, Stairs for No One', date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), time: '10:00 AM IST', location: 'Town Hall Square, Mumbai', description: 'A peaceful protest demanding accountability from the government.', meetingType: 'rally', joinLink: '#' },
    { _id: '3', title: 'Volunteer Training: How to Rant Professionally', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), time: '6:00 PM IST', location: 'Online (Zoom)', description: 'Learn the art of productive complaining from our senior members.', meetingType: 'volunteer', joinLink: '#' },
    { _id: '4', title: 'Monthly Members Meeting', date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), time: '7:00 PM IST', location: 'Online', description: 'Regular monthly meetup to discuss party progress and upcoming plans.', meetingType: 'meeting', joinLink: '#' },
    { _id: '5', title: 'Twitter Space: The Unemployed Vote', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), time: '9:00 PM IST', location: 'Twitter Spaces', description: 'Discussion on voting rights and unemployment statistics.', meetingType: 'twitter_space', joinLink: '#' },
    { _id: '6', title: 'State-level Rally: Maharashtra', date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), time: '11:00 AM IST', location: 'Shivaji Park, Mumbai', description: 'Major rally to raise awareness about our five demands.', meetingType: 'rally', joinLink: '#' },
  ]

  const filteredMeetings = filter === 'all' 
    ? meetings 
    : meetings.filter(m => m.meetingType === filter)

  const meetingTypeOptions = [
    { value: 'all', label: 'All Events' },
    ...Object.entries(MEETING_TYPES).map(([key, { icon, label }]) => ({ 
      value: key, 
      label: `${icon} ${label}` 
    }))
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-ink text-paper border-b-4 border-saffron relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-4">
              Stay Connected
            </span>
            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[80px] leading-[0.95] tracking-[-0.01em] text-paper mb-4">
              Our Meetings.
            </h1>
            <p className="font-sans text-base sm:text-lg text-paper/70 max-w-2xl">
              Join our rallies, meetings, and Twitter Spaces. We meet wherever the wifi works.
              Be part of the movement, attend our events, and make your voice heard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 sm:py-8 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {meetingTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 font-condensed font-medium text-xs sm:text-sm tracking-[0.12em] uppercase border-2 transition-all ${
                  filter === option.value
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink bg-paper hover:bg-ink/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Meetings Grid */}
      <section className="py-10 sm:py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-ink border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredMeetings.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-ink-2 mb-4">No meetings scheduled</p>
              <p className="font-sans text-ink-3">Check back soon for upcoming events!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {filteredMeetings.map((meeting, index) => {
                const { day, month } = formatDateShort(meeting.meeting_date)
                const type = MEETING_TYPES[meeting.meeting_type] || MEETING_TYPES.meeting

                return (
                  <motion.div
                    key={meeting.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-paper border-2 border-ink shadow-[5px_5px_0_var(--ink)] hover:shadow-[8px_8px_0_var(--saffron-deep)] hover:-translate-y-1 transition-all overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 bg-ink text-paper p-5 sm:p-6 text-center sm:w-28">
                        <div className="font-display text-4xl sm:text-5xl">{day}</div>
                        <div className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-saffron-2 mt-1">{month}</div>
                      </div>
                      
                      <div className="flex-1 p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{type.icon}</span>
                          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-ink-3">{type.label}</span>
                        </div>
                        
                        <h3 className="font-display text-xl sm:text-2xl text-ink leading-tight mb-2">
                          {meeting.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] sm:text-xs text-ink-3 mb-3">
                          <span>🕐 {meeting.meeting_time}</span>
                          <span>📍 {meeting.location}</span>
                        </div>
                        
                        <p className="font-sans text-sm text-ink-2 mb-4 leading-relaxed">
                          {meeting.description}
                        </p>
                        
                        {meeting.join_link && (
                          <a
                            href={meeting.join_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-semibold text-xs tracking-[0.15em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-ink hover:bg-saffron-deep/90 transition-all"
                          >
                            Join {type.icon === '🐦' ? 'Space' : 'Event'} <span>→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12 sm:mt-16 pt-10 sm:pt-12 border-t-2 border-ink/20"
          >
            <h3 className="font-display text-2xl sm:text-3xl text-ink mb-4">Want to organize a meeting?</h3>
            <p className="font-sans text-ink-2 mb-6 max-w-lg mx-auto">
              Volunteer to host meetings in your area. Contact us to get started.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-ink text-paper font-condensed font-semibold text-sm tracking-[0.15em] uppercase px-6 sm:px-8 py-3 sm:py-4 border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all">
              Contact Us <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}