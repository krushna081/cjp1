import { motion } from 'framer-motion'

function Vision() {
  return (
    <section id="vision" className="py-24 lg:py-32 border-b-2 border-ink bg-gradient-to-b from-paper to-paper-2">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-green mb-6 bg-paper-2 px-2.5 py-1 border border-green">
              Chapter One
            </span>
            
            <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-ink mb-6">
              Our Movement's<br/><em className="text-green font-serif italic">Vision.</em>
            </h2>
            
            <p className="font-sans text-lg leading-relaxed text-ink-2 max-w-[560px] mb-10">
              We are not here to set up another PM CARES, holiday in Davos on the taxpayer's salary slip, or rebrand corruption as "strategic spending." We are here to ask — loudly, repeatedly, in writing — where the money went.
            </p>

            <div className="mt-10 border-2 border-ink bg-paper p-7 relative shadow-[8px_8px_0_var(--ink)]">
              <span className="inline-block font-mono text-[10.5px] tracking-[0.22em] uppercase text-green bg-paper-2 px-2.5 py-1 border border-green mb-4">
                Our Mission
              </span>
              <p className="font-sans text-lg leading-relaxed text-ink-2">
                Build a party for the young people who keep getting called lazy, chronically online, and — most recently — cockroaches. That's it. That's the mission. The rest is satire.
              </p>
            </div>
          </motion.div>

          <motion.aside 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="vision-image"
          >
            <div className="border-2 border-ink shadow-[10px_10px_0_var(--saffron-deep),10px_10px_0_2px_var(--ink)] overflow-hidden bg-paper">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-paper-3 to-paper-2 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-display text-[48px] text-ink/30 mb-2">RALLY</div>
                  <div className="font-condensed text-sm tracking-[0.2em] uppercase text-ink-3">The People's Banner</div>
                </div>
              </div>
              <div className="flex justify-between px-4 py-3 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-2 bg-paper-2">
                <span>Rally · The People's Banner</span>
                <span>16 . 05 . 2026</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default Vision