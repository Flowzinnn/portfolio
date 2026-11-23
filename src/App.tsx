import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { MotionConfig } from 'motion/react'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollManager } from './components/ScrollManager'
import { I18nProvider } from './lib/i18n'
import { initSmoothScroll } from './lib/scroll'
import { ThemeProvider } from './lib/theme'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import CasePage from './pages/CasePage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    <ThemeProvider>
      <I18nProvider>
        {/* reducedMotion="user": respeita quem pediu menos animação no sistema */}
        <MotionConfig reducedMotion="user">
          <Background />
          <Navbar />
          <ScrollManager />
          <main id="conteudo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cases/:slug" element={<CasePage />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  )
}
