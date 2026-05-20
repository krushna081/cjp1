import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const PROBLEM_CATEGORIES = [
  {
    id: 'economic',
    title: 'Economic Problems',
    icon: '📊',
    color: 'saffron-deep',
    issues: [
      { title: 'Unemployment Crisis', description: 'Youth unemployment rate at historic highs with millions seeking stable jobs.', impact: 'Critical' },
      { title: 'Inflation Pressures', description: 'Rising costs of essential goods affecting daily life for common citizens.', impact: 'High' },
      { title: 'Weak Manufacturing', description: 'Industrial growth stagnating, failing to create enough employment opportunities.', impact: 'High' },
      { title: 'Informal Economy', description: 'Majority of workforce in unorganized sector without benefits or security.', impact: 'Critical' }
    ]
  },
  {
    id: 'social',
    title: 'Social Problems',
    icon: '👥',
    color: 'green',
    issues: [
      { title: 'Education Crisis', description: 'Quality education remains inaccessible to majority of rural population.', impact: 'Critical' },
      { title: 'Healthcare Access', description: 'Public healthcare infrastructure failing to serve rural and urban poor.', impact: 'High' },
      { title: 'Gender Inequality', description: 'Women continue to face barriers in workforce participation and opportunities.', impact: 'High' },
      { title: 'Caste Discrimination', description: 'Social inequalities persists affecting opportunities for marginalized communities.', impact: 'Critical' }
    ]
  },
  {
    id: 'environmental',
    title: 'Environmental Problems',
    icon: '🌍',
    color: 'green',
    issues: [
      { title: 'Air Pollution', description: 'Delhi and other cities among world\'s most polluted. Public health emergency.', impact: 'Critical' },
      { title: 'Water Scarcity', description: 'Groundwater depletion threatening agricultural and domestic water supply.', impact: 'Critical' },
      { title: 'Climate Change', description: 'Extreme weather events affecting farmers and rural communities severely.', impact: 'High' },
      { title: 'Deforestation', description: 'Rapid ecological degradation impacting biodiversity and climate patterns.', impact: 'High' }
    ]
  },
  {
    id: 'agricultural',
    title: 'Agricultural Problems',
    icon: '🌾',
    color: 'saffron-deep',
    issues: [
      { title: 'Farmer Distress', description: 'Thousands of farmers in debt, unable to meet rising production costs.', impact: 'Critical' },
      { title: 'Market Failures', description: 'Farmers forced to sell produce below cost due to lack of fair marketplace.', impact: 'High' },
      { title: 'Land Degradation', description: 'Soil infertility increasing due to excessive chemical use and water mismanagement.', impact: 'High' },
      { title: 'Agricultural Youth Exodus', description: 'Young generation leaving farming for non-existent city jobs.', impact: 'Critical' }
    ]
  },
  {
    id: 'governance',
    title: 'Governance Problems',
    icon: '🏛️',
    color: 'ink',
    issues: [
      { title: 'Corruption', description: 'Bureaucratic hurdles preventing efficient delivery of public services.', impact: 'High' },
      { title: 'Policy Implementation', description: 'Schemes failing to reach intended beneficiaries due to poor execution.', impact: 'High' },
      { title: 'Lack of Accountability', description: 'Elected representatives immune from consequences of broken promises.', impact: 'Critical' },
      { title: 'Centralization', description: 'Power concentrated in few hands, ignoring local needs and solutions.', impact: 'High' }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Problems',
    icon: '🏗️',
    color: 'ink',
    issues: [
      { title: 'Rural Connectivity', description: 'Millions without proper roads, electricity, and digital connectivity.', impact: 'High' },
      { title: 'Urban Chaos', description: 'Traffic, pollution, and inadequate public transport in major cities.', impact: 'High' },
      { title: 'Digital Divide', description: 'Internet access remains luxury for rural and poor urban population.', impact: 'Critical' },
      { title: 'Housing Crisis', description: 'Affordable housing shortage forcing millions to live in inadequate conditions.', impact: 'High' }
    ]
  },
  {
    id: 'security',
    title: 'Security Problems',
    icon: '⚔️',
    color: 'blood',
    issues: [
      { title: 'Border Tensions', description: 'Ongoing conflicts affecting border communities and national security.', impact: 'Critical' },
      { title: 'Internal Conflicts', description: 'Regional tensions and communal divisions threatening social harmony.', impact: 'High' },
      { title: 'Cyber Threats', description: 'Increasing digital security risks affecting national and personal data.', impact: 'Medium' },
      { title: 'Radicalization', description: 'Youth vulnerable to radical ideologies due to lack of opportunities.', impact: 'High' }
    ]
  },
  {
    id: 'women-safety',
    title: "Women's Safety",
    icon: '🔔',
    color: 'blood',
    link: '/women-safety',
    issues: [
      { title: 'Violence Against Women', description: 'Rising cases of sexual violence and assault against women across India.', impact: 'Critical' },
      { title: 'Justice System Failures', description: 'Low conviction rates and delayed trials deny justice to survivors.', impact: 'Critical' },
      { title: 'Underreporting', description: '90% of cases go unreported due to stigma, fear, and distrust.', impact: 'Critical' },
      { title: 'Daily Safety Fear', description: 'Women face harassment in workplaces, public transport, and public spaces.', impact: 'High' }
    ]
  }
]

const STATS = [
  { value: '50+', label: 'Million Unemployed', sub: 'Youth job seekers' },
  { value: '180+', label: 'Days Poor Air Quality', sub: 'Delhi residents' },
  { value: '2.5x', label: 'Price Rise', sub: 'Essential commodities' },
  { value: '60%', label: 'Farmers in Debt', sub: 'Average ₹2+ lakh' }
]

const TIMELINE_ISSUES = [
  { title: 'Poor Education', desc: 'Inadequate school infrastructure & outdated curriculum' },
  { title: 'Skill Gaps', desc: 'Mismatch between education & industry requirements' },
  { title: 'Youth Unemployment', desc: '12%+ graduate unemployment rate' },
  { title: 'Economic Frustration', desc: 'Depression & migration to cities' },
  { title: 'Social Polarization', desc: 'Divisive politics exploiting desperation' }
]

const VOICES = [
  { name: 'Rahul, 24', location: 'Bhopal', role: 'Unemployed Graduate', quote: 'Four years of engineering, now I deliver food. The system gave me a degree but no future.' },
  { name: 'Sunita Devi, 38', location: 'Maharashtra', role: 'Farmer', quote: 'I grow crops but cannot afford to eat them. The middlemen take everything.' },
  { name: 'Vikram, 32', location: 'Delhi', role: 'Auto Driver', quote: 'I have two degrees but drive auto. The city has jobs, just not for people like me.' },
  { name: 'Priya, 21', location: 'Rajasthan', role: 'College Student', quote: 'My parents pawned jewelry for my education. Now I understand why they say knowledge is expensive.' }
]

export default function IndiaProblemsPage() {
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      <section className="relative bg-ink text-paper min-h-screen flex items-center overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-2 to-ink" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
          {[...Array(10)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-saffron-2/30 rounded-full hidden sm:block" initial={{ x: Math.random() * 100 + '%', y: '100%' }} animate={{ y: ['100%', '-10%'] }} transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: 'linear' }} style={{ left: Math.random() * 100 + '%' }} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-4 sm:mb-6">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-saffron-2 border border-saffron-2/50 px-3 sm:px-4 py-1.5 sm:py-2">Campaign 2026</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-display text-[32px] xs:text-[38px] sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[88px] leading-[1] sm:leading-[0.95] mb-4 sm:mb-6 px-2">India's Problem<span className="block sm:inline"><br className="hidden sm:block" /></span><span className="text-saffron-2">Statement — 2026</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-sans text-sm sm:text-base md:text-lg text-paper/70 max-w-xl mx-auto mb-6 sm:mb-10 px-4">A generation connected to the internet, but disconnected from opportunity.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="overflow-hidden bg-saffron-deep/20 py-2 sm:py-3 mb-6 sm:mb-10 -mx-4">
              <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                {[...Array(10)].map((_, i) => (<span key={i} className="font-mono text-[10px] sm:text-sm tracking-wider mx-4 sm:mx-8">UNEMPLOYMENT INFLATION FARMER DISTRESS CORRUPTION POLLUTION INEQUALITY ✦</span>))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/join" className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-ink shadow-[4px_4px_0_var(--saffron)] hover:shadow-[2px_2px_0_var(--saffron)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">Join Movement <span>→</span></Link>
              <Link to="/improve-cjp" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-paper/50 hover:border-paper transition-all">Share Ideas</Link>
            </motion.div>
          </div>
        </div>
        <motion.div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-paper/50 rounded-full flex justify-center pt-1.5 sm:pt-2"><div className="w-1 h-1.5 sm:w-1 sm:h-2 bg-paper/50 rounded-full" /></div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep">By The Numbers</span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">The Reality in <span className="text-saffron-deep">2026</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-paper border-2 border-ink p-6 text-center shadow-[4px_4px_0_var(--ink)]">
                <div className="font-display text-4xl sm:text-5xl text-saffron-deep mb-2">{stat.value}</div>
                <div className="font-condensed text-sm tracking-wider uppercase text-ink mb-1">{stat.label}</div>
                <div className="font-mono text-[10px] tracking-wider text-ink-3">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-green">Understanding The Crisis</span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">India's <span className="text-green">Challenges</span></h2>
          </motion.div>
          <div className="space-y-16">
            {PROBLEM_CATEGORIES.map((category, catIndex) => (
              <motion.div key={category.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-b-2 border-ink/20 pb-12 last:border-0">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">{category.title}</h3>
                  </div>
                  {category.link && <Link to={category.link} className="font-mono text-[10px] tracking-wider text-saffron-deep hover:text-blood transition-colors">Learn More →</Link>}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.issues.map((issue, issueIndex) => (
                    <motion.div key={issue.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: issueIndex * 0.1 }} whileHover={{ y: -5 }} className="bg-paper-2 border-2 border-ink p-5 cursor-pointer hover:shadow-[6px_6px_0_var(--saffron-deep)] transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-display text-lg text-ink group-hover:text-saffron-deep transition-colors">{issue.title}</h4>
                        <span className={`font-mono text-[10px] tracking-wider px-2 py-1 ${issue.impact === 'Critical' ? 'bg-blood text-paper' : 'bg-saffron-deep text-paper'}`}>{issue.impact}</span>
                      </div>
                      <p className="font-sans text-sm text-ink-2 leading-relaxed">{issue.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2">The Vicious Cycle</span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mt-2">How It <span className="text-saffron-2">Connects</span></h2>
          </motion.div>
          <div className="flex flex-col items-center">
            {TIMELINE_ISSUES.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="flex flex-col items-center w-full max-w-md">
                <div className="bg-saffron-deep/20 border-2 border-saffron-2/50 p-6 w-full text-center">
                  <h4 className="font-display text-xl text-paper mb-2">{item.title}</h4>
                  <p className="font-sans text-sm text-paper/70">{item.desc}</p>
                </div>
                {index < TIMELINE_ISSUES.length - 1 && <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} className="w-0.5 h-12 bg-saffron-2" />}
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12 font-display text-2xl text-saffron-2">→ Every issue is connected to the next →</motion.p>
        </div>
      </section>

      {/* Voices */}
      <section className="py-16 sm:py-20 bg-paper-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-green">Real Stories</span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] text-ink mt-2">Voices of <span className="text-green">India</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {VOICES.map((voice, index) => (
              <motion.div key={voice.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-paper border-2 border-ink p-6 shadow-[4px_4px_0_var(--ink)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg">{voice.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-display text-lg text-ink">{voice.name}</h4>
                    <span className="font-mono text-[10px] tracking-wider text-ink-3">{voice.location} · {voice.role}</span>
                  </div>
                </div>
                <p className="font-serif text-lg text-ink-2 italic leading-relaxed">"{voice.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-saffron-deep text-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2">Take Action</span>
            <h2 className="font-display text-[32px] sm:text-[48px] leading-[0.95] mt-2 mb-6">Change Begins with <span className="text-ink">Awareness</span></h2>
            <p className="font-sans text-lg text-paper/80 mb-8 max-w-xl mx-auto">The problems are real. The solutions exist. What we need is a movement that demands accountability.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join" className="inline-flex items-center gap-2 bg-ink text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-ink hover:bg-paper hover:text-ink transition-all">Join Membership <span>→</span></Link>
              <Link to="/manifesto" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">Read Manifesto</Link>
              <Link to="/improve-cjp" className="inline-flex items-center gap-2 bg-transparent text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/50 hover:border-paper transition-all">Share Ideas</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}