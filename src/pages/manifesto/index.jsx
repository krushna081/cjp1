import { motion } from 'framer-motion'
import { MANIFESTO_DEMANDS, ELIGIBILITY_CRITERIA } from '../../constants'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function ManifestoPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-ink text-paper border-b-4 border-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-4">
              The Five Demands
            </span>
            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[80px] xl:text-[100px] leading-[0.95] tracking-[-0.01em] text-paper mb-6">
              Our Manifesto.
            </h1>
            <p className="font-sans text-base sm:text-lg text-paper/70 max-w-2xl mx-auto">
              Read it once. Read it twice. Then send it to someone who needs to read it.
              Five demands. Zero compromises. One large, stubborn swarm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demands */}
      <section className="py-12 sm:py-16 lg:py-24 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {MANIFESTO_DEMANDS.map((demand, index) => (
              <motion.div
                key={demand.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 sm:gap-12 py-8 sm:py-10 border-b border-paper/20 group hover:bg-saffron-deep/5 -mx-4 sm:-mx-8 px-4 sm:px-8 transition-colors cursor-pointer"
              >
                <span className="font-display text-[56px] sm:text-[80px] lg:text-[96px] leading-[0.9] text-saffron-2 tracking-[-0.02em] group-hover:translate-x-2 transition-transform">
                  {demand.num}
                </span>
                <div className="pt-4 sm:pt-6">
                  <p 
                    className="font-sans text-lg sm:text-xl lg:text-2xl leading-[1.5] text-paper/90"
                    dangerouslySetInnerHTML={{ 
                      __html: demand.text.replace(/<strong>/g, '<span class="text-paper font-bold bg-gradient-to-b from-transparent to-saffron-deep/40 px-0.5">').replace(/<\/strong>/g, '</span>')
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 sm:py-24 lg:py-32 bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-4 sm:mb-6">
              Membership Criteria
            </span>
            <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-[-0.005em] text-ink mb-4 sm:mb-6">
              Are you eligible<br/>
              <em className="text-green font-serif italic">to join?</em>
            </h2>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-ink-2 max-w-2xl mx-auto">
              We do not check religion, caste, or gender. We do, however, have four (4) standards.
              If you meet them, you're already one of us.
            </p>
          </motion.header>

          <div className="max-w-4xl mx-auto grid gap-4 sm:gap-5">
            {ELIGIBILITY_CRITERIA.map((item, index) => (
              <motion.div
                key={item.req}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 bg-paper-2 border-2 border-ink shadow-[5px_5px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] transition-all"
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-saffron-deep font-semibold self-start mt-1 min-w-[80px] sm:min-w-[100px]">
                  {item.req}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-[28px] text-ink leading-tight">{item.title}</h3>
                  <p className="font-sans text-sm sm:text-base text-ink-2 mt-1 italic leading-relaxed">{item.sub}</p>
                </div>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-ink flex items-center justify-center text-green bg-paper text-xl sm:text-2xl hover:bg-green hover:text-paper transition-all flex-shrink-0">
                  ✓
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link to="/join" className="inline-flex items-center gap-3 bg-saffron-deep text-paper font-condensed font-bold text-base sm:text-lg tracking-[0.2em] uppercase px-10 sm:px-12 py-4 sm:py-5 border-2 border-ink shadow-[6px_6px_0_var(--ink)] hover:shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Join the Party <span>→</span>
            </Link>
            <p className="font-sans text-sm italic text-ink-3 mt-6 max-w-md mx-auto leading-relaxed">
              Membership is free, lifelong, and revocable only by you.
              No fees. No selfies with the leader. No "missed call to register."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 sm:py-24 lg:py-32 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-green mb-4 sm:mb-6 bg-paper px-3 py-1.5 border border-green">
                Chapter One
              </span>
              <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-[-0.005em] text-ink mb-6">
                Our Movement's<br/>
                <em className="text-green font-serif italic">Vision.</em>
              </h2>
              <p className="font-sans text-base sm:text-lg leading-relaxed text-ink-2 mb-8">
                We are not here to set up another PM CARES, holiday in Davos on the taxpayer's salary slip, or rebrand corruption as "strategic spending." We are here to ask — loudly, repeatedly, in writing — where the money went.
              </p>
              <div className="border-2 border-ink bg-paper p-6 sm:p-8 relative shadow-[8px_8px_0_var(--ink)]">
                <span className="inline-block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-green bg-paper-2 px-3 py-1.5 border border-green mb-4">
                  Our Mission
                </span>
                <p className="font-sans text-base sm:text-lg leading-relaxed text-ink-2">
                  Build a party for the young people who keep getting called lazy, chronically online, and — most recently — cockroaches. That's it. That's the mission. The rest is satire.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-paper border-[3px] border-ink shadow-[12px_12px_0_var(--saffron-deep)] p-6 sm:p-8 lg:p-10"
            >
              <blockquote className="relative mb-8">
                <span className="absolute -top-6 left-0 font-display text-[72px] sm:text-[90px] text-saffron-deep leading-[0.6]">"</span>
                <p className="font-serif italic text-xl sm:text-2xl lg:text-[28px] leading-[1.4] text-ink pl-8 sm:pl-10">
                  They called us cockroaches. We decided to become a movement.
                </p>
              </blockquote>
              <p className="font-sans text-base sm:text-lg leading-relaxed text-ink-2 mb-6">
                When the Hon'ble CJI compared us to cockroaches, we saw it as a badge of honor. Cockroaches survive anything. We are resilient. We adapt. We persist.
              </p>
              <p className="font-sans text-base sm:text-lg leading-relaxed text-ink-2">
                And now, we are organizing. Not just to survive, but to demand what's ours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-[32px] sm:text-[48px] lg:text-[64px] leading-[0.95] text-paper mb-4">
              Ready to join the swarm?
            </h3>
            <p className="font-sans text-base sm:text-lg text-paper/70 mb-8 max-w-lg mx-auto">
              Together we survive. Together we demand. Together we make them listen.
            </p>
            <Link to="/join" className="inline-flex items-center gap-3 bg-saffron text-paper font-condensed font-bold text-base sm:text-lg tracking-[0.2em] uppercase px-10 sm:px-12 py-4 sm:py-5 border-2 border-paper shadow-[6px_6px_0_var(--paper)] hover:shadow-[3px_3px_0_var(--paper)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Join Now <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}