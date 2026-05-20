import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Vision', href: '#vision' },
  { name: 'Manifesto', href: '#manifesto' },
  { name: 'Membership', href: '#join' },
  { name: 'Meetings', href: '#meetings' },
  { name: 'Members', href: '#members' },
  { name: 'Founder', href: '#founder' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper/94 backdrop-blur-sm border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-14 grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10 py-3 lg:py-4">
          <a href="#" className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
                <circle cx="32" cy="32" r="29" fill="none" stroke="#E0651E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(-90 32 32)"></circle>
                <circle cx="32" cy="32" r="29" fill="none" stroke="#1F5A2E" strokeWidth="3" strokeDasharray="46 1000" transform="rotate(30 32 32)"></circle>
                <circle cx="32" cy="32" r="29" fill="none" stroke="#2A1A10" strokeWidth="0.8"></circle>
                <ellipse cx="32" cy="36" rx="11" ry="16" fill="#5A2F12"></ellipse>
                <ellipse cx="32" cy="25" rx="7" ry="6" fill="#5A2F12"></ellipse>
                <path d="M28 17 Q22 10 18 8 M36 17 Q42 10 46 8" stroke="#2A1A10" strokeWidth="1.6" fill="none" strokeLinecap="round"></path>
                <rect x="26" y="23" width="12" height="3.5" rx="1" fill="#0a0807"></rect>
              </svg>
            </div>
            <div className="flex flex-col gap-0.5 lg:gap-1 leading-none">
              <span className="font-display text-sm lg:text-base leading-[0.94] tracking-[0.01em] text-ink">
                COCKROACH<br/>JANTA PARTY
              </span>
              <span className="font-mono text-[8px] lg:text-[10px] tracking-[0.16em] uppercase text-saffron-deep hidden sm:block">
                कॉकरोच जनता पार्टी · Est. 2026
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex justify-center">
            <ul className="flex justify-center gap-6 xl:gap-9">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="font-condensed font-medium text-xs xl:text-sm tracking-[0.15em] xl:tracking-[0.18em] uppercase text-ink py-1.5 relative hover:text-saffron-deep transition-colors"
                  >
                    {link.name}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-saffron scale-x-0 origin-left transition-transform hover:scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#join" className="hidden lg:block btn-pill text-[10px] xl:text-xs px-4 xl:px-5 py-2 xl:py-2.5">
            Join the Party
          </a>

          <button 
            className="lg:hidden w-9 h-9 flex flex-col justify-center items-end gap-1.5 p-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 lg:w-6 h-0.5 bg-ink transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 lg:w-7 h-0.5 bg-ink transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-ink transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[60px] lg:top-[72px] bg-paper z-40 lg:hidden"
          >
            <nav className="flex flex-col p-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => scrollToSection(link.href)}
                  className="font-condensed text-xl font-medium tracking-[0.15em] uppercase text-ink py-4 border-b border-ink/20 text-left"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                href="#join"
                className="btn-primary mt-6 text-center text-sm"
              >
                Join the Party
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar