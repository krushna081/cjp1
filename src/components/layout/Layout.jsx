import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import FloatingImproveButton from '../FloatingImproveButton'
import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-paper relative">
      <div 
        className="fixed inset-0 pointer-events-none z-[200] opacity-20 mix-blend-multiply" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.08, 0 0 0 0 0.06, 0 0 0 0 0.04, 0 0 0 0.32 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} 
      />
      
      <Header />
      
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Outlet />
      </motion.main>
      
      <Footer />
      
      <FloatingImproveButton />
    </div>
  )
}