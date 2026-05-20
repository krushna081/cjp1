import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Input, RadioGroup, Button } from '../../components/ui'
import LocationSelect from '../../components/ui/LocationSelect'
import SuccessPopup from '../../components/ui/SuccessPopup'
import api from '../../api/axios'
import { validateEmail, validatePhone } from '../../utils'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    village: '',
    twitterHandle: '',
    chronicallyOnline: '',
    lazy: '',
    cockroach: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
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
      await api.post('/api/members', {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''),
        joinedAt: new Date().toISOString()
      })
      
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        state: '',
        district: '',
        village: '',
        twitterHandle: '',
        chronicallyOnline: '',
        lazy: '',
        cockroach: ''
      })
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Submission error:', error)
      errors.submit = 'Something went wrong. Please try again.'
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

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-4">
              Membership
            </span>
            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[80px] xl:text-[96px] leading-[0.95] tracking-[-0.01em] text-paper mb-6">
              Join the Party.
            </h1>
            <p className="font-sans text-base sm:text-lg text-paper/70 max-w-2xl mx-auto">
              Fill out the form below to become a member of the Cockroach Janta Party.
              Membership is free, lifelong, and revocable only by you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 sm:py-16 lg:py-20 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-paper-2 border-[3px] border-ink shadow-[10px_10px_0_var(--ink)] p-6 sm:p-8 lg:p-12"
          >
            {/* Personal Information */}
            <div className="mb-8 sm:mb-10">
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-1">Personal Information</h2>
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mb-6">Step 1 of 2</p>
              
              <div className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    error={errors.fullName}
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    error={errors.phone}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
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
                    label="Twitter/X Handle"
                    name="twitterHandle"
                    value={formData.twitterHandle}
                    onChange={handleChange}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8 sm:mb-10 pt-8 sm:pt-10 border-t border-ink/20">
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-1">Your Location</h2>
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mb-6">Where are you from?</p>
              
              <LocationSelect 
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </div>

            {/* Eligibility Questions */}
            <div className="mb-8 sm:mb-10 pt-8 sm:pt-10 border-t border-ink/20">
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-1">Eligibility Check</h2>
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-ink-3 mb-6">Step 2 of 2 · All questions required</p>
              
              <div className="space-y-6 sm:space-y-8">
                <RadioGroup
                  label="Are you chronically online?"
                  name="chronicallyOnline"
                  options={['Yes', 'No', 'Maybe']}
                  value={formData.chronicallyOnline}
                  onChange={(value) => handleRadioChange('chronicallyOnline', value)}
                  error={errors.chronicallyOnline}
                  required
                />

                <RadioGroup
                  label="Are you lazy?"
                  name="lazy"
                  options={['Yes', 'No', 'Maybe']}
                  value={formData.lazy}
                  onChange={(value) => handleRadioChange('lazy', value)}
                  error={errors.lazy}
                  required
                />

                <RadioGroup
                  label={"Do you identify yourself as a \"cockroach\" as defined by the Hon'ble CJI?"}
                  name="cockroach"
                  options={['Yes', 'No', 'Maybe']}
                  value={formData.cockroach}
                  onChange={(value) => handleRadioChange('cockroach', value)}
                  error={errors.cockroach}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8 sm:pt-10 border-t border-ink/20">
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="xl"
              >
                {isLoading ? 'Submitting...' : 'Join the Party →'}
              </Button>

              <p className="font-sans text-xs sm:text-sm italic text-ink-3 text-center mt-4 sm:mt-6 leading-relaxed">
                Membership is free. No fees. No verification calls. No spam.
                <br />
                By submitting, you agree to receive occasional updates from CJP.
              </p>
            </div>
          </motion.form>

          {/* Already a member? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <p className="font-sans text-ink-2 mb-3">Already a member?</p>
            <Link to="/members" className="inline-flex items-center gap-2 bg-ink text-paper font-condensed font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase px-6 sm:px-8 py-3 sm:py-4 border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all">
              View Members <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccess && <SuccessPopup />}
    </motion.div>
  )
}