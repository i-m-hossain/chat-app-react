import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ApplicationRoutes from './ApplicationRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationRoutes/>
  </StrictMode>
)
