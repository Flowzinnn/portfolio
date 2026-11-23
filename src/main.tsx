import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/plus-jakarta-sans'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* basename com barra final: se o site um dia rodar numa subpasta, o link da home continua "/pasta/#secao" */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
