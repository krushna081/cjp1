import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout'
import { HomePage, MembersPage, MeetingsPage, ManifestoPage, FounderPage, ContactPage, JoinPage } from './pages'

function App() {
  return (
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
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App