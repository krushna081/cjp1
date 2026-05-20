import { motion } from 'framer-motion'
import SocialLinks from '../../components/ui/SocialLinks'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function FounderPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Compact Header */}
      <section className="py-8 sm:py-10 lg:py-12 bg-ink text-paper border-b-2 border-saffron/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-2 mb-2">
              The Founder
            </span>
            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-[-0.01em] text-paper">
              Abhijeet Dipke.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Compact Bio Section */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4 mb-6"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xl">
                AD
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-saffron-deep mb-1">
                  Founder & Convenor
                </p>
                <h2 className="font-display text-2xl text-ink">Abhijeet Dipke</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="font-sans text-base leading-relaxed text-ink-2">
                A political force born from frustration and sustained by memes. Abhijeet founded CJP after being called a cockroach by the Hon'ble CJI — and decided to make it a movement.
              </p>

              <blockquote className="font-serif italic text-lg leading-relaxed text-ink pl-5 border-l-2 border-saffron-deep">
                "They tried to step on us. We came back — louder, angrier, and with better graphics."
              </blockquote>

              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-3">
                Headquarters: Wherever the wifi works.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 pt-6 border-t border-ink/20"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block mb-3">
                Follow the Founder
              </span>
              <SocialLinks 
                variant="default"
                links={{
                  twitter: { url: '#', label: 'Twitter/X' },
                  instagram: { url: '#', label: 'Instagram' }
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper-2 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep mb-3">
              Vision Statement
            </span>
            <h3 className="font-display text-2xl text-ink mb-4">
              The cockroach survives.
            </h3>
            <div className="font-sans text-base leading-relaxed text-ink-2 space-y-3">
              <p>
                We have been called lazy, unemployed, chronically online, and worse. But we have a message for those who look down on us: <strong className="text-saffron-deep">We are the backbone of this country.</strong>
              </p>
              <p>
                When they called us cockroaches, they meant it as an insult. We took it as a compliment. Because cockroaches survive nuclear winters. Cockroaches adapt to anything. Cockroaches will be here long after the ones who mocked us are forgotten.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founding Story - Compact */}
      <section className="py-8 sm:py-10 lg:py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-saffron-deep mb-3">
              The Beginning
            </span>
            <h3 className="font-display text-2xl text-ink mb-4">
              How it started.
            </h3>
            <div className="font-sans text-base leading-relaxed text-ink-2 space-y-3">
              <p>
                It began with a headline. A Chief Justice of India, speaking about something entirely unrelated, casually compared a certain demographic to cockroaches. The internet erupted. Memes were made. But something else also happened.
              </p>
              <p>
                People started identifying with it. Not the insult, but the resilience it implied. The ability to survive. The refusal to be crushed no matter how many times you try.
              </p>
              <p>
                And so, Cockroach Janta Party was born. Not as a joke, but as a statement. We are the ones you tried to step on. We came back.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-10 bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-2xl text-paper mb-3">
              Join the movement.
            </h3>
            <p className="font-sans text-sm text-paper/70 mb-5">
              Be part of something bigger. Together we survive.
            </p>
            <Link to="/join" className="inline-flex items-center gap-2 bg-saffron-deep text-paper font-condensed font-bold text-xs tracking-[0.18em] uppercase px-6 py-3 border-2 border-paper/30 hover:bg-saffron transition-all">
              Join the Party <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}