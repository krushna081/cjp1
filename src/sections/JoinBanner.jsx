import { motion } from 'framer-motion'

function JoinBanner() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-b-2 border-ink bg-paper overflow-hidden"
    >
      <div className="w-full h-[40vh] lg:h-[50vh] bg-gradient-to-br from-saffron-deep/20 via-paper to-green/20 flex items-center justify-center relative">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A1108' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="text-center relative z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-[40px] lg:text-[72px] leading-[0.9] text-ink tracking-[-0.01em]"
          >
            STRONGER<br/>TOGETHER
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-condensed text-sm lg:text-base tracking-[0.2em] uppercase text-ink-2 mt-4"
          >
            Become a Member of the Cockroach Janta Party
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}

export default JoinBanner