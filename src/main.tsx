import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import DisasterReportPage from './DisasterReport.tsx'
import RegistrationPage from './auth/RegistrationPage.tsx'
import LoginPage from './auth/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<DisasterReportPage />} />

        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        
      </Routes>

    </StrictMode>
  </BrowserRouter>

)
