import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/plus-jakarta-sans'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

// Acorda a API logo que a página abre: no plano grátis do Render ela dorme e leva ~1 min para voltar.
// Assim, quando a pessoa termina o diagnóstico ou o formulário, o servidor já está de pé.
fetch('/api/health').catch(() => {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* basename com barra final: se o site um dia rodar numa subpasta, o link da home continua "/pasta/#secao" */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
