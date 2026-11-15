import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/refine.css' // <- NEW LINE: must stay AFTER the App import so it loads last

// Optional (only after you add the font files, see the font step below):
// import './styles/fonts.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)