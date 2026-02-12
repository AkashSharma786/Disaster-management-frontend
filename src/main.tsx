import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DisasterReportPage from './DisasterReport.tsx'
import RegistrationPage from './RegistrationPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RegistrationPage/>
  </StrictMode>,
)
