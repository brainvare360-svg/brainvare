import HomeClient from './HomeClient'

// Server-rendered metadata for this page
export const metadata = {
  title: 'Brainvare | AI-First Creative Studio — Strategy, Design & Technology',
  description: 'Brainvare is an AI-first creative studio in Kochi, Kerala. We integrate data, design, and technology to scale brands — AI implementation, web development, SEO & performance marketing.',
}

export default function HomePage() {
  return (
    <>
      {/* Server-rendered hero skeleton — visible immediately, replaced by client hydration */}
      <div id="hero-skeleton" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span className="text-sm font-medium text-gray-300">Reimagining Digital Experiences</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 md:mb-8 text-white">
              We Build Digital Futures.
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Brainvare is an AI-first creative studio integrating data, design, and technology to scale your brand.
            </p>
          </div>
        </div>
      </div>
      {/* Client-rendered full app — hydrates and takes over */}
      <HomeClient />
    </>
  )
}
