import { motion } from 'framer-motion'

const demands = [
  {
    num: '01',
    text: 'If the CJP comes in power, <strong>no Chief Justice shall be granted a Rajya Sabha seat</strong> as a post-retirement reward.',
  },
  {
    num: '02',
    text: 'If any legit vote is deleted, whether in a CJP or opposition-ruled state, the <strong>CEC shall be arrested under UAPA</strong>, as taking away voting rights of citizens is no less than terrorism.',
  },
  {
    num: '03',
    text: '<strong>Women shall receive 50% reservation, not 33%</strong>, without increasing the strength of Parliament. Additionally, <strong>50% of all Cabinet positions</strong> shall be reserved for women.',
  },
  {
    num: '04',
    text: 'All media houses owned by <strong>Ambani and Adani shall have their licences cancelled</strong> to make way for truly independent media. Bank accounts of Godi media anchors shall be investigated.',
  },
  {
    num: '05',
    text: 'Any MLA or MP who defects from one party to another shall be <strong>barred from contesting elections — and from holding any public office — for a period of 20 years</strong>.',
  },
]

function Manifesto() {
  return (
    <section id="manifesto" className="py-24 lg:py-32 bg-ink text-paper relative overflow-hidden border-b-2 border-ink">
      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full bg-saffron-deep/20 pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-green/20 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-7 lg:px-14 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-6">
            The Five Demands
          </span>
          <h2 className="font-display text-[44px] lg:text-[64px] leading-[0.92] tracking-[-0.005em] text-paper mb-6">
            The Manifesto.
          </h2>
          <p className="font-sans text-lg leading-relaxed text-paper/80 max-w-[560px] mx-auto">
            Read it once. Read it twice. Then send it to someone who needs to read it.
          </p>
        </motion.header>

        <ol className="max-w-[980px] mx-auto border-t border-paper/20">
          {demands.map((demand, index) => (
            <motion.li 
              key={demand.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid lg:grid-cols-[140px_1fr] gap-9 py-9 border-b border-paper/20 items-start group hover:px-4 hover:bg-saffron-deep/5 transition-all"
            >
              <span className="font-display text-[88px] leading-[0.85] text-saffron-2 tracking-[-0.02em]">
                {demand.num}
              </span>
              <p 
                className="font-sans text-[21px] leading-[1.5] text-paper/92 font-normal pt-4"
                dangerouslySetInnerHTML={{ __html: demand.text.replace(/<strong>/g, '<span class="text-paper font-bold bg-gradient-to-b from-transparent to-saffron-deep/45 px-0.5">').replace(/<\/strong>/g, '</span>') }}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Manifesto