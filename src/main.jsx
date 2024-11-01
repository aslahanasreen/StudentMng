import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './contextApi/ContextApi.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextApi>
        <App />
      </ContextApi>

    </BrowserRouter>

  </StrictMode>,
)
