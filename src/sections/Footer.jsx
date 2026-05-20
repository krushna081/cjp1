import { motion } from 'framer-motion'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="foot-brand"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
                  <circle cx="32" cy="32" r="29" fill="none" stroke="#E0651E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(-90 32 32)"></circle>
                  <circle cx="32" cy="32" r="29" fill="none" stroke="#1F5A2E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(30 32 32)"></circle>
                  <ellipse cx="32" cy="36" rx="11" ry="16" fill="#F0E5D0"></ellipse>
                  <ellipse cx="32" cy="25" rx="7" ry="6" fill="#F0E5D0"></ellipse>
                  <rect x="26" y="23" width="12" height="3.5" rx="1" fill="#1a1410"></rect>
                </svg>
              </div>
              <div className="flex flex-col gap-1 leading-none">
                <span className="font-display text-base leading-[0.94] tracking-[0.01em] text-paper">
                  COCKROACH<br/>JANTA PARTY
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-saffron-2">
                  कॉकरोच जनता पार्टी
                </span>
              </div>
            </div>
            <p className="font-sans text-base leading-relaxed text-paper/60 max-w-[320px]">
              A political party for the lazy, the unemployed, and the chronically correct.
              Headquartered wherever the wifi works.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="foot-cols grid grid-cols-2 lg:grid-cols-3 gap-9"
          >
            <div className="foot-col">
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-5 pb-3 border-b border-white/18 font-semibold">
                The Party
              </h4>
              <ul className="flex flex-col gap-3">
                <li><a href="#vision" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Vision</a></li>
                <li><a href="#manifesto" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Manifesto</a></li>
                <li><a href="#contact" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Founder</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-5 pb-3 border-b border-white/18 font-semibold">
                Get involved
              </h4>
              <ul className="flex flex-col gap-3">
                <li><a href="#join" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Eligibility</a></li>
                <li><a href="#contact" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Join the party</a></li>
                <li><a href="#contact" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Volunteer</a></li>
              </ul>
            </div>

            <div className="foot-col lg:col-span-1 col-span-2">
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-5 pb-3 border-b border-white/18 font-semibold">
                Follow
              </h4>
              <ul className="flex flex-col gap-3">
                <li><a href="https://x.com/CJP_2029" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Twitter / X</a></li>
                <li><a href="https://www.instagram.com/cockroachjantaparty?igsh=MWR6d253bDE5NDRmMQ==" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Instagram</a></li>
                <li><a href="#" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">YouTube</a></li>
                <li><a href="#" className="font-sans text-[15px] text-paper/70 hover:text-saffron-2 transition-colors">Telegram</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/12 py-5">
          <div className="flex flex-wrap justify-between items-center gap-4 font-mono text-[10.5px] tracking-[0.2em] uppercase text-paper/55">
            <span>© {currentYear} Cockroach Janta Party · All rants reserved.</span>
            <span className="bg-saffron text-paper px-3 py-1 tracking-[0.22em]">⚠ A work of satire</span>
            <span className="foot-links">
              <a href="#" className="hover:text-saffron-2 transition-colors">Privacy</a>
              {' · '}
              <a href="#" className="hover:text-saffron-2 transition-colors">Press</a>
              {' · '}
              <a href="#" className="hover:text-saffron-2 transition-colors">Contact</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer