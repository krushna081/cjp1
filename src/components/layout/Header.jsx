import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TICKER_ITEMS } from '../../constants'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Manifesto', path: '/manifesto' },
  { name: 'Members', path: '/members' },
  { name: 'Meetings', path: '/meetings' },
  { name: 'Founder', path: '/founder' },
  { name: 'Contact', path: '/contact' },
  { name: 'Join', path: '/join', highlight: true }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <>
      <div className="bg-ink text-paper font-mono text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.14em] uppercase py-1.5 sm:py-2 overflow-hidden border-b border-ink/80">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-6 sm:mx-10">
              <span className="text-saffron-2 mr-2">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="bg-paper/95 backdrop-blur-md border-b-2 border-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 overflow-hidden rounded-sm">
                  <img src="/img/logo.jpeg" alt="CJP Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-sm sm:text-base text-ink">COCKROACH JANTA PARTY</span>
                  <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.16em] uppercase text-saffron-deep hidden xs:block">कॉकरोच जनता पार्टी · Est. 2026</span>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-2 font-condensed font-medium text-xs tracking-[0.12em] uppercase transition-colors ${
                      location.pathname === item.path
                        ? 'text-saffron-deep'
                        : item.highlight
                        ? 'text-paper bg-ink hover:bg-saffron-deep px-4'
                        : 'text-ink hover:text-saffron-deep'
                    }`}
                  >
                    {item.name}
                    {!item.highlight && (
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-saffron transform transition-transform ${
                        location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                      }`} />
                    )}
                  </Link>
                ))}
              </nav>

              <Link
                to="/join"
                className="hidden lg:inline-flex items-center gap-2 bg-ink text-paper font-condensed font-semibold text-xs tracking-[0.15em] uppercase px-4 py-2.5 border-2 border-ink hover:bg-saffron-deep hover:border-saffron-deep transition-all group"
              >
                <span>Join Now</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5 p-2 border-2 border-ink hover:border-saffron-deep transition-colors"
                aria-label="Toggle menu"
              >
                <span className={`w-5 h-0.5 bg-ink transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-6 h-0.5 bg-ink transition-all ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-4 h-0.5 bg-ink transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-paper border-b-2 border-ink overflow-hidden"
            >
              <nav className="flex flex-col p-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`block py-3 px-4 font-condensed font-medium text-base tracking-[0.15em] uppercase border-b border-ink/10 transition-colors ${
                        item.highlight
                          ? 'bg-ink text-paper my-2'
                          : location.pathname === item.path
                          ? 'text-saffron-deep'
                          : 'text-ink'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  to="/join"
                  className="mt-4 text-center bg-saffron-deep text-paper font-condensed font-bold text-sm tracking-[0.2em] uppercase px-6 py-4 border-2 border-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  Join the Party →
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}