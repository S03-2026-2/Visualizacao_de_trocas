import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ControladorProvider from './hooks/ControladorProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ControladorProvider>
      <App />
    </ControladorProvider>
  </StrictMode>,
)
