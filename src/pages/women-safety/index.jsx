import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const STATS = [
  { value: '31,000+', label: 'Reported Rape Cases', sub: 'Annual NCRB Data' },
  { value: '~86', label: 'Cases Per Day', sub: 'Reported daily' },
  { value: '27%', label: 'Conviction Rate', sub: 'Among charged cases' },
  { value: '90%', label: 'Underreported', sub: 'Actual vs reported' }
]

const SYSTEMIC_ISSUES = [
  { title: 'Patriarchal Mindset', description: 'Deep-rooted social norms that normalize violence against women and perpetuate gender inequality.', icon: '🏛️' },
  { title: 'Victim-Blaming Culture', description: 'Survivors face scrutiny instead of support, with society questioning their choices and actions.', icon: '👁️' },
  { title: 'Police Failures', description: 'Poor response, insensitive handling, and dismissal of complaints deter survivors from seeking help.', icon: '⚠️' },
  { title: 'Judicial Delays', description: 'Cases take years to conclude, re-traumatizing survivors and emboldening perpetrators.', icon: '⏳' },
  { title: 'Impunity for Powerful', description: 'Wealth and influence often translate to avoiding accountability in sexual violence cases.', icon: '🔒' },
  { title: 'Weak Implementation', description: 'Laws exist on paper but fail to translate into meaningful protection for women.', icon: '📋' },
  { title: 'Underreporting & Fear', description: 'Social stigma, fear of retaliation, and distrust in institutions prevent survivors from coming forward.', icon: '🤐' }
]

const WHY_NOT_REPORT = [
  { title: 'Social Stigma', description: 'Fear of being labeled, ostracized, and losing family honor prevents reporting.', quote: 'Society would rather blame the survivor than punish the perpetrator.' },
  { title: 'Retaliation Fear', description: 'Threats from perpetrators or their associates create genuine safety concerns.', quote: 'The accused walks free while the survivor lives in fear.' },
  { title: 'Family Pressure', description: 'Families often pressurize survivors to stay silent to preserve family reputation.', quote: 'Honor matters more than justice in our society.' },
  { title: 'Distrust in System', description: 'Lengthy court processes, insensitive questioning, and low conviction rates erode faith.', quote: 'The system re-traumatizes those it claims to protect.' },
  { title: 'Economic Dependency', description: 'Financial reliance on the abuser or family prevents escape and reporting.', quote: 'Survival becomes more urgent than justice.' },
  { title: 'Victim-Blaming', description: 'Investigation focuses on survivor\'s character rather than perpetrator\'s actions.', quote: 'They asked what I was wearing, not what happened.' }
]

const CASES = [
  { year: '2024', title: 'Kolkata Hospital Case', location: 'Kolkata, West Bengal', description: 'A trainee doctor was brutally assaulted and murdered at RG Kar Medical College, sparking nationwide protests demanding justice and safety reforms.', status: 'Awaiting Justice' },
  { year: '2026', title: 'NEET Aspirant Case', location: 'Kolkata, West Bengal', description: 'A young female NEET aspirant was murdered, highlighting the vulnerability of students and the failure to ensure basic safety.', status: 'Investigation Ongoing' },
  { year: '2019', title: 'Hyderabad Encounter', location: 'Hyderabad, Telangana', description: 'After the veterinary doctor case, encounter killings sparked debate on extrajudicial measures vs proper justice system.', status: 'Controversial' },
  { year: '2012', title: 'Nirbhaya Case', location: 'Delhi', description: 'The brutal gang rape sparked nationwide protests and led to changes in criminal law, though implementation remains challenged.', status: 'Delays Continue' }
]

const JUSTICE_CHALLENGES = [
  { title: 'Low Conviction Rate', value: '27%', description: 'Only about quarter of charged cases result in conviction, far below global standards.' },
  { title: 'Trial Delays', value: '5+ Years', description: 'Average time for case conclusion, creating secondary trauma for survivors.' },
  { title: 'Forensic Gaps', value: '40%', description: 'Cases lost due to inadequate forensic evidence collection and testing delays.' },
  { title: 'Case Backlog', value: '2M+', description: 'Pending cases in courts across India, with new cases added daily.' },
  { title: 'Witness Intimidation', value: 'High', description: 'Witnesses often turn hostile or refuse to testify due to pressure.' }
]

const DAILY_SAFETY = [
  { title: 'Workplace Safety', description: 'Sexual harassment at workplaces remains underreported despite legal protections.', icon: '🏢' },
  { title: 'Public Transport Fear', description: 'Women face harassment on trains, buses, and metros, limiting their mobility.', icon: '🚌' },
  { title: 'Online Harassment', description: 'Cyberbullying, revenge porn, and online stalking affect women\'s digital safety.', icon: '💻' },
  { title: 'Rural Vulnerabilities', description: 'Limited police presence and judicial access leave rural women without recourse.', icon: '🌾' },
  { title: 'Night Safety', description: 'Fear of being outdoors after dark restricts women\'s participation in society.', icon: '🌙' },
  { title: 'Domestic Violence', description: 'The most common form of violence, often hidden behind closed doors.', icon: '🏠' }
]

const REFORMS = [
  { title: 'Faster Justice', description: 'Special fast-track courts and time-bound investigations to ensure timely justice.' },
  { title: 'Police Reforms', description: 'Sensitivity training, better response times, and accountability mechanisms.' },
  { title: 'Education Change', description: 'Gender sensitization from school level to create a more equal society.' },
  { title: 'Stronger Laws', description: 'Effective implementation of existing laws and stricter penalties for perpetrators.' },
  { title: 'Support Systems', description: 'Better shelters, counseling, and rehabilitation for survivors.' },
  { title: 'Societal Shift', description: 'Challenging toxic masculinity and changing attitudes toward women.' }
]

export default function WomenSafetyPage() {
  const [counters, setCounters] = useState({})

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section')
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setCounters({ animated: true })
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />
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
                Awareness Campaign
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-[36px] sm:text-[48px] lg:text-[72px] xl:text-[80px] leading-[0.95] tracking-[-0.01em] mb-6"
            >
              Women's Safety &<br />
              <span className="text-saffron-2">Justice Crisis</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-lg sm:text-xl text-paper/70 mb-10"
            >
              Justice delayed. Fear normalized. Voices still fighting to be heard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-ink shadow-[4px_4px_0_var(--saffron)] hover:shadow-[2px_2px_0_var(--saffron)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                Explore Issues <span>→</span>
              </button>
              <Link to="/manifesto" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">
                Read Manifesto
              </Link>
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

      {/* Statistics Section */}
      <section id="stats-section" className="py-16 sm:py-20 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-blood">
              The Reality
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              By The <span className="text-blood">Numbers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper border-2 border-ink p-6 text-center shadow-[4px_4px_0_var(--ink)]"
              >
                <div className="font-display text-3xl sm:text-4xl text-blood mb-2">
                  {stat.value}
                </div>
                <div className="font-condensed text-sm tracking-wider uppercase text-ink mb-1">
                  {stat.label}
                </div>
                <div className="font-mono text-[10px] tracking-wider text-ink-3">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 font-sans text-sm text-ink-2 italic"
          >
            * Data from NCRB and official government reports. Actual numbers believed to be significantly higher due to massive underreporting.
          </motion.p>
        </div>
      </section>

      {/* Systemic Issues */}
      <section className="py-16 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep">
              Root Causes
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              Systemic <span className="text-saffron-deep">Issues</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SYSTEMIC_ISSUES.map((issue, index) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-paper-2 border-2 border-ink p-5 hover:shadow-[6px_6px_0_var(--saffron-deep)] transition-all"
              >
                <span className="text-3xl mb-3 block">{issue.icon}</span>
                <h4 className="font-display text-lg text-ink mb-2">{issue.title}</h4>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">
                  {issue.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Survivors Don't Report */}
      <section className="py-16 sm:py-20 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2">
              The Hidden Truth
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mt-2">
              Why Survivors <span className="text-saffron-2">Don't Report</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_NOT_REPORT.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper/5 border border-paper/20 p-6"
              >
                <h4 className="font-display text-xl text-paper mb-3">{item.title}</h4>
                <p className="font-sans text-sm text-paper/70 mb-4">{item.description}</p>
                <p className="font-serif text-sm text-saffron-2 italic border-l-2 border-saffron-2 pl-3">
                  "{item.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Timeline */}
      <section className="py-16 sm:py-20 bg-paper-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-blood">
              Public Awareness
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              Cases That <span className="text-blood">Shook India</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-ink/20 sm:-translate-x-1/2" />
            
            <div className="space-y-8">
              {CASES.map((caseItem, index) => (
                <motion.div
                  key={caseItem.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row gap-4 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-blood rounded-full -translate-x-1/2 mt-2 z-10" />
                  
                  <div className="ml-12 sm:ml-0 sm:w-1/2">
                    <div className={`bg-paper border-2 border-ink p-5 shadow-[4px_4px_0_var(--ink)] ${
                      index % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs tracking-wider text-saffron-deep bg-saffron-deep/10 px-2 py-1">
                          {caseItem.year}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-ink-3">
                          {caseItem.location}
                        </span>
                      </div>
                      <h4 className="font-display text-lg text-ink mb-2">{caseItem.title}</h4>
                      <p className="font-sans text-sm text-ink-2 mb-3">{caseItem.description}</p>
                      <span className="font-mono text-[10px] tracking-wider text-blood uppercase">
                        {caseItem.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Justice System Challenges */}
      <section className="py-16 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-green">
              The System Fails
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              Justice <span className="text-green">Challenges</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JUSTICE_CHALLENGES.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper-2 border-2 border-ink p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display text-lg text-ink">{challenge.title}</h4>
                  <span className="font-display text-2xl text-saffron-deep">{challenge.value}</span>
                </div>
                <p className="font-sans text-sm text-ink-2">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Life Safety */}
      <section className="py-16 sm:py-20 bg-paper-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-3">
              Everyday Fear
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">
              Women's Safety in <span className="text-saffron-deep">Daily Life</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAILY_SAFETY.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-paper border border-ink/30 p-5 hover:border-saffron-deep transition-colors"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h4 className="font-display text-lg text-ink mb-2">{item.title}</h4>
                <p className="font-sans text-sm text-ink-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hope & Reform */}
      <section className="py-16 sm:py-20 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-green">
              Moving Forward
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mt-2">
              The Path to <span className="text-green">Reform</span>
            </h2>
            <p className="font-sans text-paper/70 mt-4 max-w-2xl mx-auto">
              Awareness alone is not enough. Reform must follow.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REFORMS.map((reform, index) => (
              <motion.div
                key={reform.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-paper/5 border border-paper/20 p-5"
              >
                <h4 className="font-display text-lg text-paper mb-2">{reform.title}</h4>
                <p className="font-sans text-sm text-paper/70">{reform.description}</p>
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
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2">
              Take Action
            </span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mt-2 mb-6">
              Together We Can <span className="text-ink">Demand Change</span>
            </h2>
            <p className="font-sans text-lg text-paper/80 mb-8 max-w-xl mx-auto">
              The fight for women's safety is a fight for humanity. Join the movement for a safer India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join" className="inline-flex items-center gap-2 bg-ink text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-ink hover:bg-paper hover:text-ink transition-all">
                Join Movement <span>→</span>
              </Link>
              <Link to="/manifesto" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">
                Read Manifesto
              </Link>
              <Link to="/india-problems" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">
                Explore Issues
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}