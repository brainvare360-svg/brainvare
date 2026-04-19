import '../src/index.css'

export const metadata = {
  title: {
    default: 'Brainvare | AI-First Creative Studio — Strategy, Design & Technology',
    template: '%s | Brainvare',
  },
  description: 'Brainvare is an AI-first creative studio in Kochi, Kerala. We integrate data, design, and technology to scale brands — AI implementation, web development, SEO & performance marketing.',
  keywords: ['AI creative studio', 'digital marketing agency', 'web development', 'AI implementation', 'SEO', 'AEO', 'Kerala', 'Kochi', 'India'],
  authors: [{ name: 'Brainvare' }],
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  metadataBase: new URL('https://www.brainvare.com'),
  openGraph: {
    type: 'website',
    url: 'https://www.brainvare.com/',
    title: 'Brainvare | AI-First Creative Studio',
    description: 'AI-first creative studio integrating data, design, and technology to scale your brand.',
    images: [{ url: '/logo.png', width: 1200, height: 630 }],
    siteName: 'Brainvare',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brainvare | AI-First Creative Studio',
    description: 'AI-first creative studio integrating data, design, and technology.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://www.brainvare.com/',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch & Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.pixabay.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://brainvare-api.brainvare.workers.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev" />

        {/* Google Fonts — async non-render-blocking */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </noscript>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Brainvare",
              url: "https://www.brainvare.com",
              logo: "https://www.brainvare.com/logo.png",
              description: "AI-first creative studio integrating data, design, and technology to scale brands.",
              email: "care@brainvare.com",
              telephone: "+918075098869",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kochi",
                addressRegion: "Kerala",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/brainvare",
                "https://www.linkedin.com/company/brainvare",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-brand-dark text-white selection:bg-brand-red selection:text-white">
        {children}
      </body>
    </html>
  )
}
