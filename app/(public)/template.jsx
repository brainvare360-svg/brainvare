'use client'

import Navbar from '../../src/components/layout/Navbar'
import Footer from '../../src/components/layout/Footer'
import Providers from '../providers'

export default function PublicTemplate({ children }) {
  return (
    <Providers>
      <Navbar />
      {children}
      <Footer />
    </Providers>
  )
}
