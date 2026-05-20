import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

const meetingTypes = {
  rally: { icon: '🎪', label: 'Rally' },
  meeting: { icon: '📋', label: 'Meeting' },
  twitter_space: { icon: '🐦', label: 'Twitter Space' },
  volunteer: { icon: '🤝', label: 'Volunteer Session' },
}

function Meetings() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)

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
    {
      _id: '1',
      title: 'CJP Town Hall: The Unemployed Speak',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: '8:00 PM IST',
      location: 'Twitter Spaces',
      description: 'An open forum for all members to discuss their concerns and share experiences.',
      meetingType: 'twitter_space',
      joinLink: '#',
    },
    {
      _id: '2',
      title: 'Rally: Jobs for Everyone, Stairs for No One',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      time: '10:00 AM IST',
      location: 'Town Hall Square, Mumbai',
      description: 'A peaceful protest demanding accountability from the government.',
      meetingType: 'rally',
      joinLink: '#',
    },
    {
      _id: '3',
      title: 'Volunteer Training: How to Rant Professionally',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: '6:00 PM IST',
      location: 'Online (Zoom)',
      description: 'Learn the art of productive complaining from our senior members.',
      meetingType: 'volunteer',
      joinLink: '#',
    },
    {
      _id: '4',
      title: 'Monthly Members Meeting',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      time: '7:00 PM IST',
      location: 'Online',
      description: 'Regular monthly meetup to discuss party progress and upcoming plans.',
      meetingType: 'meeting',
      joinLink: '#',
    },
  ]

  const formatDate = (date) => {
    const d = new Date(date)
    return {
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    }
  }

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-paper border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 lg:py-32 bg-paper border-b-2 border-ink">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-6">
            Stay Connected
          </span>
          <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-ink mb-6">
            Upcoming Meetings.
          </h2>
          <p className="font-sans text-lg leading-relaxed text-ink-2 max-w-[560px] mx-auto">
            Join our rallies, meetings, and Twitter Spaces. We meet wherever the wifi works.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-6">
          {meetings.slice(0, 4).map((meeting, index) => {
            const { day, month } = formatDate(meeting.meeting_date)
            const type = meetingTypes[meeting.meeting_type] || meetingTypes.meeting

            return (
              <motion.div
                key={meeting.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-paper-2 border-2 border-ink shadow-[5px_5px_0_var(--ink)] hover:shadow-[8px_8px_0_var(--saffron-deep)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-6"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="font-display text-4xl text-ink leading-none">{day}</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-saffron-deep uppercase mt-1">{month}</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{type.icon}</span>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-3">{type.label}</span>
                    </div>

                    <h3 className="font-display text-xl leading-tight text-ink mb-2 group-hover:text-saffron-deep transition-colors">
                      {meeting.title}
                    </h3>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.1em] text-ink-3 mb-3">
                      <span>🕐 {meeting.meeting_time}</span>
                      <span>📍 {meeting.location}</span>
                    </div>

                    <p className="font-sans text-sm leading-relaxed text-ink-2 mb-4">
                      {meeting.description}
                    </p>

                    {meeting.join_link && (
                      <a
                        href={meeting.join_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-condensed font-semibold text-xs tracking-[0.2em] uppercase text-paper bg-ink px-4 py-2 border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all"
                      >
                        Join {type.icon === '🐦' ? 'Space' : type.label === 'Rally' ? 'Rally' : 'Meeting'}
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Meetings