import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input, Textarea, Button } from '../../components/ui'
import SocialLinks from '../../components/ui/SocialLinks'
import { PARTY_INFO } from '../../constants'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
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
        <div className="absolute top-0 left-0 w-80 h-80 bg-saffron/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-4">
              Get in touch
            </span>
            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[80px] leading-[0.95] tracking-[-0.01em] text-paper mb-4">
              Contact Us.
            </h1>
            <p className="font-sans text-base sm:text-lg text-paper/70 max-w-2xl">
              Want to join, volunteer, complain, or send a meme? Use the form. We read everything. We reply to most things.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 sm:py-16 lg:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[0.95] tracking-[-0.005em] text-ink mb-6 sm:mb-8">
                Connect<br/>with us.
              </h2>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ink-3 mb-2">Email</h4>
                  <a href={`mailto:${PARTY_INFO.email}`} className="font-sans text-base sm:text-lg text-ink font-medium hover:text-saffron-deep transition-colors">
                    {PARTY_INFO.email}
                  </a>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ink-3 mb-2">Press</h4>
                  <a href={`mailto:${PARTY_INFO.pressEmail}`} className="font-sans text-base sm:text-lg text-ink font-medium hover:text-saffron-deep transition-colors">
                    {PARTY_INFO.pressEmail}
                  </a>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ink-3 mb-2">Headquarters</h4>
                  <p className="font-sans text-base sm:text-lg text-ink font-medium">
                    {PARTY_INFO.headquarters}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ink-3 mb-2">Founder</h4>
                  <p className="font-sans text-base sm:text-lg text-ink font-medium">Abhijeet Dipke</p>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-ink-3">Founder & Convenor</span>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-ink/20">
                <h4 className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ink-3 mb-4">Follow the Party</h4>
                <SocialLinks 
                  variant="default"
                  links={{
                    twitter: { url: '#', label: 'Twitter/X' },
                    instagram: { url: '#', label: 'Instagram' },
                    telegram: { url: '#', label: 'Telegram' },
                    youtube: { url: '#', label: 'YouTube' }
                  }}
                />
              </div>

              <div className="mt-8 sm:mt-10">
                <Link to="/join" className="inline-flex items-center gap-3 bg-saffron-deep text-paper font-condensed font-bold text-sm tracking-[0.18em] uppercase px-6 sm:px-8 py-3 sm:py-4 border-2 border-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  Join the Party <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green text-paper p-8 sm:p-10 border-[3px] border-paper shadow-[10px_10px_0_var(--ink)] text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-paper text-green flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl mb-3">Message Sent!</h3>
                  <p className="font-sans text-paper/80 mb-6">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-paper text-ink font-condensed font-bold text-sm tracking-[0.15em] uppercase border-2 border-paper hover:bg-paper/90 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-paper-2 border-[3px] border-ink shadow-[10px_10px_0_var(--ink)] p-6 sm:p-8 lg:p-10">
                  <div className="space-y-5 sm:space-y-6">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      error={errors.name}
                      required
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      error={errors.email}
                      required
                    />

                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                    />

                    <Textarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      error={errors.message}
                      required
                      rows={5}
                    />

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    <p className="font-sans text-xs italic text-ink-3 text-center">
                      We read everything. We reply to most things. Usually within 48 hours.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}