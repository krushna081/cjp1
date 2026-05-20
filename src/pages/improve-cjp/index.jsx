import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { INDIA_STATES } from '../../constants'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const ISSUE_CATEGORIES = [
  'Education', 'Employment', 'Women\'s Safety', 'Corruption', 
  'Environment', 'Governance', 'Healthcare', 'Rural Development', 
  'Digital Rights', 'Youth Opportunities'
]

const SAMPLE_FEEDBACK = [
  { id: 1, state: 'Maharashtra', issue: 'Employment', text: 'Need more job opportunities for fresh graduates. The unemployment rate is alarming.', time: '2 hours ago' },
  { id: 2, state: 'Delhi', issue: 'Education', text: 'Quality education should be accessible to all, not just the privileged.', time: '5 hours ago' },
  { id: 3, state: 'Karnataka', issue: 'Corruption', text: 'Bureaucratic corruption needs to be addressed at grassroot level.', time: '1 day ago' },
  { id: 4, state: 'West Bengal', issue: 'Healthcare', text: 'Public hospitals need better infrastructure and staff.', time: '1 day ago' },
  { id: 5, state: 'Gujarat', issue: 'Environment', text: 'Clean energy initiatives should be prioritized for sustainable future.', time: '2 days ago' },
  { id: 6, state: 'Tamil Nadu', issue: 'Youth Opportunities', text: 'Young people need platforms to showcase their skills and talent.', time: '3 days ago' },
]

const VISION_ITEMS = [
  { title: 'Better Governance', description: 'Transparent, accountable, and people-centric administration', icon: '🏛️' },
  { title: 'Employment Opportunities', description: 'Quality jobs for every qualified citizen', icon: '💼' },
  { title: 'Safer Society', description: 'Protection for all, especially the vulnerable', icon: '🛡️' },
  { title: 'Stronger Education', description: 'World-class learning for every child', icon: '📚' },
  { title: 'Cleaner Environment', description: 'Sustainable development for future generations', icon: '🌱' },
  { title: 'Digital Equality', description: 'Technology access for all, not just a few', icon: '💻' },
]

const WHY_I_AM_CJP = [
  { question: 'Why are you part of CJP?', placeholder: 'Share why you joined this movement...' },
  { question: 'What problems frustrate you most?', placeholder: 'What issues make you angry?' },
  { question: 'What changes do you want in India?', placeholder: 'What should change in our country?' },
  { question: 'What should CJP improve?', placeholder: 'How can we make CJP better?' },
]

export default function ImproveCJPPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    state: '',
    district: '',
    village: '',
    email: '',
    twitterHandle: '',
    whyCJP: '',
    cjpImprovements: '',
    indiaChanges: '',
    mainIssue: '',
    additionalFeedback: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from('cjp_feedback').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          state: formData.state,
          district: formData.district,
          village: formData.village,
          twitter_handle: formData.twitterHandle,
          why_cjp: formData.whyCJP,
          cjp_improvements: formData.cjpImprovements,
          india_changes: formData.indiaChanges,
          main_issue: formData.mainIssue,
          additional_feedback: formData.additionalFeedback
        }
      ])

      if (error) throw error

      setShowSuccess(true)
      setFormData({
        fullName: '', state: '', district: '', village: '', email: '',
        twitterHandle: '', whyCJP: '', cjpImprovements: '', indiaChanges: '',
        mainIssue: '', additionalFeedback: ''
      })
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsLoading(false)
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
      <section className="relative bg-ink text-paper overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-2 to-ink" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-saffron-2/30 rounded-full"
              initial={{ x: Math.random() * 100 + '%', y: '100%' }}
              animate={{
                y: ['100%', '-10%'],
                x: [Math.random() * 100 + '%', Math.random() * 100 + '%']
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2 border border-saffron-2/50 px-4 py-2">
                Community Voice
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-[36px] sm:text-[48px] lg:text-[72px] xl:text-[80px] leading-[0.95] tracking-[-0.01em] mb-6"
            >
              Help Shape The<br />
              <span className="text-saffron-2">Future Of CJP</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-lg sm:text-xl text-paper/70 mb-10"
            >
              A movement built by people must evolve with people.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#feedback-form" className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-ink shadow-[4px_4px_0_var(--saffron)] hover:shadow-[2px_2px_0_var(--saffron)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                Share Feedback <span>→</span>
              </a>
              <a href="#community-ideas" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">
                View Ideas
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-paper/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-paper/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Why I Am CJP Section */}
      <section className="py-16 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-green">
              Community Stories
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              Why I Am <span className="text-green">CJP</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_I_AM_CJP.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper-2 border-2 border-ink p-5 hover:shadow-[6px_6px_0_var(--green)] transition-all"
              >
                <h4 className="font-display text-lg text-ink mb-3">{item.question}</h4>
                <textarea
                  placeholder={item.placeholder}
                  className="w-full h-20 bg-paper border border-ink/30 p-2 font-sans text-sm text-ink resize-none focus:border-green outline-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Ideas Section */}
      <section id="community-ideas" className="py-16 sm:py-20 bg-paper-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep">
              Community Voice
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              What Should <span className="text-saffron-deep">Change?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {ISSUE_CATEGORIES.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-paper border border-ink/30 px-4 py-3 font-condensed text-sm tracking-wider uppercase hover:bg-saffron-deep hover:text-paper hover:border-saffron-deep transition-all"
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_FEEDBACK.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper border-2 border-ink p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-wider text-saffron-deep bg-saffron-deep/10 px-2 py-1">
                    {feedback.issue}
                  </span>
                  <span className="font-mono text-[10px] text-ink-3">{feedback.time}</span>
                </div>
                <p className="font-sans text-sm text-ink-2 mb-3">{feedback.text}</p>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xs">
                    {feedback.state.charAt(0)}
                  </span>
                  <span className="font-mono text-[10px] text-ink-3">{feedback.state}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section id="feedback-form" className="py-16 sm:py-20 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-green">
              Your Voice Matters
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              Share Your <span className="text-green">Feedback</span>
            </h2>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-paper-2 border-[3px] border-ink shadow-[8px_8px_0_var(--ink)] p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
                >
                  <option value="">Select State</option>
                  {INDIA_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
                  placeholder="District"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Village</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
                  placeholder="Village (optional)"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Twitter/X Handle</label>
              <input
                type="text"
                name="twitterHandle"
                value={formData.twitterHandle}
                onChange={handleChange}
                className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
                placeholder="@username"
              />
            </div>

            <div className="mb-4">
              <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Which issue matters most to you?</label>
              <select
                name="mainIssue"
                value={formData.mainIssue}
                onChange={handleChange}
                className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green"
              >
                <option value="">Select an issue</option>
                {ISSUE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Why are you part of CJP?</label>
                <textarea
                  name="whyCJP"
                  value={formData.whyCJP}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green resize-none"
                  placeholder="Share your reason..."
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">What should CJP improve?</label>
                <textarea
                  name="cjpImprovements"
                  value={formData.cjpImprovements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green resize-none"
                  placeholder="Your suggestions..."
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">What changes should India focus on?</label>
              <textarea
                name="indiaChanges"
                value={formData.indiaChanges}
                onChange={handleChange}
                rows={3}
                className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green resize-none"
                placeholder="India's priorities..."
              />
            </div>

            <div className="mb-6">
              <label className="block font-mono text-[10px] tracking-wider uppercase text-ink-2 mb-2">Additional suggestions</label>
              <textarea
                name="additionalFeedback"
                value={formData.additionalFeedback}
                onChange={handleChange}
                rows={2}
                className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-ink outline-none focus:border-green resize-none"
                placeholder="Anything else?"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-saffron-deep text-paper font-condensed font-bold text-sm tracking-[0.18em] uppercase px-6 py-4 border-2 border-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Feedback →'}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-16 sm:py-20 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2">
              Our Vision
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mt-2">
              The Future We <span className="text-saffron-2">Imagine</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISION_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper/5 border border-paper/20 p-6"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="font-display text-xl text-paper mb-2">{item.title}</h4>
                <p className="font-sans text-sm text-paper/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-saffron-deep text-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mb-6">
              Together We <span className="text-ink">Build</span>
            </h2>
            <p className="font-sans text-lg text-paper/80 mb-8 max-w-xl mx-auto">
              Your ideas shape our movement. Join thousands in building a better India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join" className="inline-flex items-center gap-2 bg-ink text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-ink hover:bg-paper hover:text-ink transition-all">
                Join Movement <span>→</span>
              </Link>
              <Link to="/manifesto" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">
                Read Manifesto
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuccess(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-paper border-3 border-ink p-8 max-w-md text-center shadow-[12px_12px_0_var(--saffron-deep)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-display text-2xl text-ink mb-2">Thank You!</h3>
            <p className="font-sans text-ink-2 mb-6">Your voice has been added to the movement.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-saffron-deep text-paper font-condensed font-bold text-sm tracking-wider uppercase px-6 py-3 border-2 border-ink hover:shadow-[4px_4px_0_var(--ink)] hover:translate-y-0.5 transition-all"
            >
              Back to Page
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}