import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { MotionConfig } from 'motion/react'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollManager } from './components/ScrollManager'
import { I18nProvider } from './lib/i18n'
import { initSmoothScroll } from './lib/scroll'
import { ThemeProvider } from './lib/theme'
import Admin from './pages/Admin'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SegmentPage from './pages/SegmentPage'

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => initSmoothScroll(), [])

  return (
    <ThemeProvider>
      <I18nProvider>
        {/* reducedMotion="user": respeita quem pediu menos animação no sistema */}
        <MotionConfig reducedMotion="user">
          <Background />
          {!isAdmin && <Navbar />}
          <ScrollManager />
          <main id="conteudo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ia-para/:slug" element={<SegmentPage />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!isAdmin && <Footer />}
        </MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  )
}
