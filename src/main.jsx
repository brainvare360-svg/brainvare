'use client'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import { EnquiriesProvider } from './context/EnquiriesContext'
import { PagesProvider } from './context/PagesContext'
import { ReelsProvider } from './context/ReelsContext'
import { CareersProvider } from './context/CareersContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ContentProvider>
          <EnquiriesProvider>
            <PagesProvider>
              <ReelsProvider>
                <CareersProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </CareersProvider>
              </ReelsProvider>
            </PagesProvider>
          </EnquiriesProvider>
        </ContentProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
