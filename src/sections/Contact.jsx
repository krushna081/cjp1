import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import LocationSelect from '../components/LocationSelect'

function Contact({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    taluka: '',
    village: '',
    twitterHandle: '',
    chronicallyOnline: '',
    lazy: '',
    cockroach: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.state) {
      newErrors.state = 'Please select a state'
    }
    
    if (!formData.district) {
      newErrors.district = 'Please select a district'
    }
    
    if (!formData.chronicallyOnline) {
      newErrors.chronicallyOnline = 'Please select an option'
    }
    
    if (!formData.lazy) {
      newErrors.lazy = 'Please select an option'
    }
    
    if (!formData.cockroach) {
      newErrors.cockroach = 'Please select an option'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const { error } = await supabase.from('members').insert([
        {
          full_name: formData.fullName,
          phone: formData.phone.replace(/\D/g, ''),
          email: formData.email,
          state: formData.state,
          district: formData.district,
          village: formData.village || '',
          twitter_handle: formData.twitterHandle || '',
          chronically_online: formData.chronicallyOnline,
          lazy_member: formData.lazy,
          cockroach_identity: formData.cockroach
        }
      ])
      
      if (error) throw error
      
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        state: '',
        district: '',
        taluka: '',
        village: '',
        twitterHandle: '',
        chronicallyOnline: '',
        lazy: '',
        cockroach: '',
      })
      
      onSuccess()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-paper border-b-2 border-ink">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-6">
              Get in touch
            </span>
            
            <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-ink mb-4">
              Connect<br/>with us.
            </h2>
            
            <p className="font-sans text-lg leading-relaxed text-ink-2 mb-10">
              Want to join, volunteer, complain, or send a meme? Use the form. We read everything. We reply to most things.
            </p>

            <ul className="flex flex-col gap-4 mt-10">
              <li className="grid grid-cols-[110px_1fr] gap-6 pb-4 border-b border-ink/15 items-baseline">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-3">Email</span>
                <span className="font-sans text-base text-ink font-medium">
                  hello@cockroachjantaparty.in
                </span>
              </li>
              <li className="grid grid-cols-[110px_1fr] gap-6 pb-4 border-b border-ink/15 items-baseline">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-3">Press</span>
                <span className="font-sans text-base text-ink font-medium">
                  press@cockroachjantaparty.in
                </span>
              </li>
              <li className="grid grid-cols-[110px_1fr] gap-6 pb-4 border-b border-ink/15 items-baseline">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-3">Headquarters</span>
                <span className="font-sans text-base text-ink font-medium">Wherever the wifi works.</span>
              </li>
              <li className="grid grid-cols-[110px_1fr] gap-6 pb-4 border-b border-ink/15 items-baseline">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-3">Founder</span>
                <span className="font-sans text-base text-ink font-medium flex flex-col gap-1">
                  Abhijeet Dipke
                  <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink-3 font-normal">Founder &amp; Convenor</span>
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-paper-2 border-[3px] border-ink shadow-[10px_10px_0_var(--ink)] p-8 lg:p-9 flex flex-col gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Full Name *</span>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`bg-paper border-2 ${errors.fullName ? 'border-blood' : 'border-ink'} px-3.5 py-3 font-sans text-[15px] text-ink outline-none transition-all`}
                  />
                  {errors.fullName && <span className="text-blood text-xs">{errors.fullName}</span>}
                </label>
                
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Phone Number *</span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    className={`bg-paper border-2 ${errors.phone ? 'border-blood' : 'border-ink'} px-3.5 py-3 font-sans text-[15px] text-ink outline-none transition-all`}
                  />
                  {errors.phone && <span className="text-blood text-xs">{errors.phone}</span>}
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Email Address *</span>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`bg-paper border-2 ${errors.email ? 'border-blood' : 'border-ink'} px-3.5 py-3 font-sans text-[15px] text-ink outline-none transition-all`}
                  />
                  {errors.email && <span className="text-blood text-xs">{errors.email}</span>}
                </label>
                
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Twitter/X Handle</span>
                  <input 
                    type="text" 
                    name="twitterHandle"
                    value={formData.twitterHandle}
                    onChange={handleChange}
                    placeholder="@username"
                    className="bg-paper border-2 border-ink px-3.5 py-3 font-sans text-[15px] text-ink outline-none transition-all"
                  />
                </label>
              </div>

              <LocationSelect 
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />

              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Are you chronically online? *</span>
                <div className="flex gap-3">
                  {['Yes', 'No', 'Maybe'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="chronicallyOnline"
                        value={option}
                        checked={formData.chronicallyOnline === option}
                        onChange={handleChange}
                        className="w-4 h-4 accent-saffron-deep"
                      />
                      <span className="font-sans text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.chronicallyOnline && <span className="text-blood text-xs">{errors.chronicallyOnline}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Are you lazy? *</span>
                <div className="flex gap-3">
                  {['Yes', 'No', 'Maybe'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="lazy"
                        value={option}
                        checked={formData.lazy === option}
                        onChange={handleChange}
                        className="w-4 h-4 accent-saffron-deep"
                      />
                      <span className="font-sans text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.lazy && <span className="text-blood text-xs">{errors.lazy}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2">Do you identify as a "cockroach"? *</span>
                <div className="flex gap-3">
                  {['Yes', 'No', 'Maybe'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="cockroach"
                        value={option}
                        checked={formData.cockroach === option}
                        onChange={handleChange}
                        className="w-4 h-4 accent-saffron-deep"
                      />
                      <span className="font-sans text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.cockroach && <span className="text-blood text-xs">{errors.cockroach}</span>}
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-3 bg-ink text-paper font-condensed font-bold text-sm tracking-[0.22em] uppercase px-5 py-4 border-2 border-ink transition-all hover:bg-saffron-deep hover:border-saffron-deep disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0.5 active:shadow-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Join the Party'}
              </button>

              <p className="font-sans text-xs italic text-ink-3 text-center">
                Membership is free. No fees. No verification calls.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact