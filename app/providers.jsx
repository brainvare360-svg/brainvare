'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '../src/context/AuthContext'
import { ContentProvider } from '../src/context/ContentContext'
import { EnquiriesProvider } from '../src/context/EnquiriesContext'
import { PagesProvider } from '../src/context/PagesContext'
import { ReelsProvider } from '../src/context/ReelsContext'
import { CareersProvider } from '../src/context/CareersContext'
import Lenis from 'lenis'

function ScrollManager({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ContentProvider>
        <EnquiriesProvider>
          <PagesProvider>
            <ReelsProvider>
              <CareersProvider>
                <ScrollManager>
                  {children}
                </ScrollManager>
              </CareersProvider>
            </ReelsProvider>
          </PagesProvider>
        </EnquiriesProvider>
      </ContentProvider>
    </AuthProvider>
  )
}
