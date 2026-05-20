import { motion } from 'framer-motion'

const checklist = [
  {
    req: 'REQ / 01',
    title: 'Unemployed',
    sub: 'By force, by choice, or by principle. We don\'t ask.',
  },
  {
    req: 'REQ / 02',
    title: 'Lazy',
    sub: 'Physically only. The brain may continue to spiral.',
  },
  {
    req: 'REQ / 03',
    title: 'Chronically online',
    sub: 'Minimum 11 hours a day, including bathroom breaks.',
  },
  {
    req: 'REQ / 04',
    title: 'Can rant professionally',
    sub: 'As long as the content is sharp, honest, and points at something that actually matters.',
  },
]

function Eligibility() {
  return (
    <section id="join" className="py-24 lg:py-32 bg-paper border-b-2 border-ink">
      <div className="max-w-[1280px] mx-auto px-7 lg:px-14">
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[760px] mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-deep mb-6">
            Membership
          </span>
          <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-ink mb-6">
            Are you eligible<br/>to <em className="text-green font-serif italic">join?</em>
          </h2>
          <p className="font-sans text-lg leading-relaxed text-ink-2 max-w-[560px] mx-auto">
            We do not check religion, caste, or gender. We do, however, have four (4) standards.
          </p>
        </motion.header>

        <ul className="max-w-[920px] mx-auto grid gap-4">
          {checklist.map((item, index) => (
            <motion.li 
              key={item.req}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-[auto_1fr_auto] gap-x-7 gap-y-1 p-5 lg:p-6 bg-paper-2 border-2 border-ink shadow-[5px_5px_0_var(--ink)] hover:bg-paper-3 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] transition-all cursor-default"
              style={{
                gridTemplateAreas: `'num tick' 'title tick' 'sub tick'`
              }}
            >
              <span 
                className="font-mono text-[11px] tracking-[0.22em] text-saffron-deep font-semibold"
                style={{ gridArea: 'num' }}
              >
                {item.req}
              </span>
              <span 
                className="font-display text-[28px] text-ink tracking-[-0.005em] leading-none"
                style={{ gridArea: 'title' }}
              >
                {item.title}
              </span>
              <span 
                className="font-sans text-sm italic text-ink-2 mt-1.5"
                style={{ gridArea: 'sub' }}
              >
                {item.sub}
              </span>
              <span 
                className="w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center text-green bg-paper transition-all group-hover:bg-green group-hover:text-paper"
                style={{ gridArea: 'tick' }}
              >
                ✓
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-3.5 text-base lg:text-lg px-10 py-5">
            Join the Party
            <span>→</span>
          </a>
          <p className="font-sans text-sm italic text-ink-3 mt-6 leading-relaxed">
            Membership is free, lifelong, and revocable only by you.<br/>
            No fees. No selfies with the leader. No "missed call to register."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Eligibility