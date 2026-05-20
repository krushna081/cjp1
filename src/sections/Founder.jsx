import { motion } from 'framer-motion'

function Founder() {
  return (
    <section id="founder" className="py-24 lg:py-32 bg-paper-2 border-b-2 border-ink">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="founder-photo"
          >
            <div className="relative border-[3px] border-ink shadow-[12px_12px_0_var(--green)] bg-paper aspect-[4/5]">
              <div 
                className="w-full h-full flex flex-col items-center justify-center gap-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent 0 18px, rgba(26,17,8,0.04) 18px 19px), linear-gradient(180deg, var(--paper-3) 0%, var(--paper-2) 100%)`
                }}
              >
                <div className="font-display text-[140px] leading-[0.85] tracking-[-0.04em] text-ink">AD</div>
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-3 text-center leading-[1.6]">
                  Founder<br/>Cockroach Janta Party
                </div>
              </div>
              <span className="absolute bottom-4 left-4 font-mono text-[10.5px] tracking-[0.22em] uppercase bg-ink text-paper px-3 py-1.5">
                Abhijeet Dipke
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="founder-text"
          >
            <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-6">
              The Founder
            </span>
            
            <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-ink mb-2">
              Abhijeet Dipke
            </h2>
            
            <p className="font-condensed text-sm font-medium tracking-[0.2em] uppercase text-saffron-deep mb-6 pb-5 border-b border-ink/20">
              Founder &amp; Convenor
            </p>

            <p className="font-sans text-lg leading-relaxed text-ink-2 mb-7">
              A political force born from frustration and sustained by memes. Abhijeet founded CJP after being called a cockroach by the Hon'ble CJI — and decided to make it a movement.
            </p>

            <blockquote className="relative font-serif italic text-[22px] leading-[1.45] text-ink pl-8 border-l-4 border-saffron-deep mb-8">
              <span className="absolute -top-6 left-4 font-display not-italic text-[90px] text-saffron-deep leading-[0.6]">"</span>
              They tried to step on us. We came back — louder, angrier, and with better graphics.
            </blockquote>

            <div className="founder-links flex flex-wrap gap-6">
              <a href="#" className="font-condensed text-[13px] font-semibold tracking-[0.2em] uppercase text-ink inline-flex items-center gap-2.5 border-b border-ink pb-1 hover:text-saffron-deep hover:border-saffron-deep transition-all">
                Twitter / X <span>→</span>
              </a>
              <a href="#" className="font-condensed text-[13px] font-semibold tracking-[0.2em] uppercase text-ink inline-flex items-center gap-2.5 border-b border-ink pb-1 hover:text-saffron-deep hover:border-saffron-deep transition-all">
                LinkedIn <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Founder