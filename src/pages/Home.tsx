import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { About } from '../sections/About'
import { BlogPreview } from '../sections/BlogPreview'
import { Contact } from '../sections/Contact'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Method } from '../sections/Method'
import { Quiz } from '../sections/Quiz'
import { Segments } from '../sections/Segments'
import { Solutions } from '../sections/Solutions'
import { Tools } from '../sections/Tools'

// Ordem das seções da página inicial — é só reordenar as linhas abaixo.
export default function Home() {
  const { ui } = useI18n()
  useDocumentTitle(ui.meta.title)

  return (
    <>
      <Hero />
      <Solutions />
      <Segments />
      <Method />
      <Quiz />
      <About />
      <Tools />
      <Faq />
      <BlogPreview />
      <Contact />
    </>
  )
}
