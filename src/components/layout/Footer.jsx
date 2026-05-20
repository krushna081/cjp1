import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PARTY_INFO, SOCIAL_LINKS } from '../../constants'

const quickLinks = [
  { name: 'Vision', path: '/' },
  { name: 'Manifesto', path: '/manifesto' },
  { name: 'Members', path: '/members' },
  { name: 'Meetings', path: '/meetings' },
  { name: 'Founder', path: '/founder' },
]

const getInvolved = [
  { name: 'Eligibility', path: '/' },
  { name: 'Join Party', path: '/join' },
  { name: 'Volunteer', path: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 overflow-hidden rounded-full border border-paper/30">
                <img src="/img/logo.jpeg" alt="CJP Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-display text-sm text-paper">COCKROACH JANTA PARTY</span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-saffron-2 block">कॉकरोच जनता पार्टी</span>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-paper/60 mb-4">
              A political party for the lazy, the unemployed, and the chronically correct.
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/40">
              HQ: {PARTY_INFO.headquarters}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-mono text-[10px] tracking-[0.22em] uppercase text-saffron-2 mb-4 pb-2 border-b border-white/20">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-sm text-paper/70 hover:text-saffron-2 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-mono text-[10px] tracking-[0.22em] uppercase text-saffron-2 mb-4 pb-2 border-b border-white/20">
              Get Involved
            </h4>
            <ul className="space-y-2">
              {getInvolved.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-sm text-paper/70 hover:text-saffron-2 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-mono text-[10px] tracking-[0.22em] uppercase text-saffron-2 mb-4 pb-2 border-b border-white/20">
              Follow Us
            </h4>
            <ul className="space-y-2">
              {Object.entries(SOCIAL_LINKS).map(([key, { label }]) => (
                <li key={key}>
                  <a href="#" className="font-sans text-sm text-paper/70 hover:text-saffron-2 transition-colors inline-flex items-center gap-2">
                    <span className="w-1 h-1 bg-saffron-2 rounded-full" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/50">
            © {currentYear} Cockroach Janta Party · All rants reserved.
          </span>
          <span className="bg-saffron text-paper px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase">
            ⚠ A work of satire
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/50">
            Privacy · Press · Contact
          </span>
        </div>
      </div>
    </footer>
  )
}