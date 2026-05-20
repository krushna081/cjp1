import { motion } from 'framer-motion'
import Counter from '../components/Counter'

function Hero({ stats }) {
  return (
    <section className="relative border-b-3 border-ink overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] right-[15%] w-[60%] h-[50%] rounded-full bg-saffron/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-green/10 blur-3xl" />
      </div>
      
      <div className="absolute bottom-[-120px] right-[-40px] font-display text-[520px] text-ink opacity-[0.05] leading-[0.8] pointer-events-none" aria-hidden="true">
        CJP
      </div>

      <div className="max-w-[1280px] mx-auto px-7 lg:px-14 py-16 lg:py-24 grid lg:grid-cols-[1.15fr_0.95fr] gap-16 items-center relative z-10">
        <div className="hero-text">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-blood border border-blood rounded-full px-3.5 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blood animate-livepulse" />
            <span>Party Launch · Live since yesterday</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[52px] lg:text-[100px] leading-[0.86] tracking-[-0.015em] mb-7 text-ink"
          >
            Voice of the<br/>
            <span className="text-saffron-deep">Lazy</span> &amp;<br/>
            <span className="text-green italic font-serif">Unemployed.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg lg:text-xl leading-relaxed max-w-[520px] mb-10 text-ink-2"
          >
            A political party for the people the system forgot to count.
            Five demands. Zero sponsors. One large, stubborn swarm.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 mb-14"
          >
            <a href="#join" className="btn-primary inline-flex items-center gap-3.5 text-sm lg:text-base">
              Join the Party
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#manifesto" className="font-condensed font-medium text-sm tracking-[0.2em] uppercase text-ink border-b border-ink pb-1.5 hover:text-saffron-deep hover:border-saffron-deep transition-colors">
              Read the Manifesto
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-ink/20"
          >
            <div>
              <Counter value={stats.totalMembers} suffix="+" className="font-display text-[36px] text-ink" />
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-3 block mt-1">Members</span>
            </div>
            <div>
              <span className="font-display text-[36px] text-ink">5</span>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-3 block mt-1">Demands</span>
            </div>
            <div>
              <span className="font-display text-[36px] text-ink">0</span>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-3 block mt-1">Sponsors</span>
            </div>
            <div>
              <span className="font-display text-[36px] text-ink">∞</span>
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-3 block mt-1">Patience</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-poster hidden lg:block"
        >
          <div className="relative rotate-[1.5deg] border-3 border-ink shadow-[12px_12px_0_var(--ink),12px_12px_0_4px_var(--saffron-deep)] bg-paper-2 overflow-hidden">
            <div className="bg-saffron-deep text-paper font-mono text-[10.5px] tracking-[0.28em] uppercase px-4 py-2.5 flex justify-between border-b-2 border-ink">
              <span>Official Poster · No. 001</span>
              <span>★ ★ ★</span>
            </div>
            
            <div className="w-full aspect-[1024/1180] bg-gradient-to-b from-paper-2 to-paper-3 flex items-center justify-center border-b-2 border-ink">
              <div className="text-center p-8">
                <div className="font-display text-[80px] leading-none text-ink/40 mb-4">AD</div>
                <div className="font-condensed text-lg tracking-[0.2em] uppercase text-ink-3">The Founder</div>
              </div>
            </div>

            <div className="bg-ink text-paper p-6 text-center">
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-saffron-2 mb-3">Together · Resilient · Unstoppable</div>
              <div className="font-display text-xl leading-[1.15] text-paper">"They tried to step on us.<br/>We came back."</div>
            </div>
            
            <div className="absolute top-14 right-[-28px] rotate-[15deg] bg-blood text-paper font-condensed font-bold text-sm tracking-[0.22em] uppercase px-8 py-2 border-2 border-paper shadow-[0_0_0_2px_var(--blood)] z-10">
              Approved
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero