import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import { EnquiriesProvider } from './context/EnquiriesContext'
import { PagesProvider } from './context/PagesContext'
import { ReelsProvider } from './context/ReelsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ContentProvider>
        <EnquiriesProvider>
          <PagesProvider>
            <ReelsProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ReelsProvider>
          </PagesProvider>
        </EnquiriesProvider>
      </ContentProvider>
    </AuthProvider>
  </StrictMode>,
)


