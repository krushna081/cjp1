import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from './components/layout'
import { HomePage, MembersPage, MeetingsPage, ManifestoPage, FounderPage, ContactPage, JoinPage, IndiaProblemsPage, WomenSafetyPage, ImproveCJPPage } from './pages'
import CockroachFollower from './components/CockroachFollower'

function App() {
  return (
    <>
      <CockroachFollower />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="meetings" element={<MeetingsPage />} />
              <Route path="manifesto" element={<ManifestoPage />} />
              <Route path="founder" element={<FounderPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="join" element={<JoinPage />} />
              <Route path="india-problems" element={<IndiaProblemsPage />} />
              <Route path="issues" element={<IndiaProblemsPage />} />
              <Route path="problem-statement" element={<IndiaProblemsPage />} />
              <Route path="women-safety" element={<WomenSafetyPage />} />
              <Route path="justice-crisis" element={<WomenSafetyPage />} />
              <Route path="improve-cjp" element={<ImproveCJPPage />} />
              <Route path="community-feedback" element={<ImproveCJPPage />} />
              <Route path="future-of-cjp" element={<ImproveCJPPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      <Analytics />
    </>
  )
}

export default App