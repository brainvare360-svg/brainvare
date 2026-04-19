'use client'

import React from 'react';
import SEOHead from '../components/SEOHead';
import Hero from '../components/home/Hero';
import LazySection from '../components/LazySection';

const Home = () => {
    return (
        <main>
            <SEOHead
                title="Brainvare | AI-First Creative Studio — Strategy, Design & Technology"
                description="Brainvare is an AI-first creative studio in Kochi, Kerala. We integrate data, design, and technology to build digital futures — from AI implementation to performance marketing."
                canonical="https://www.brainvare.com/"
                keywords="AI creative studio, AI-first agency Kerala, digital marketing agency Kochi, web development company India, AI implementation, brand strategy, performance marketing, SEO AEO agency"
                isHomePage={true}
                customSchema={{
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Brainvare",
                    "image": "https://www.brainvare.com/logo.png",
                    "url": "https://www.brainvare.com",
                    "telephone": "+918075098869",
                    "email": "care@brainvare.com",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Infopark",
                        "addressLocality": "Kochi",
                        "addressRegion": "Kerala",
                        "postalCode": "682030",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 10.0159,
                        "longitude": 76.3419
                    },
                    "priceRange": "$$",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": "50",
                        "bestRating": "5"
                    },
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Digital Services",
                        "itemListElement": [
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Implementation & Strategy", "description": "Custom LLM integration, RAG systems, automated workflows, and intelligent agents" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web & App Development", "description": "Next.js applications, React Native mobile apps, WebGL experiences" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Performance Marketing", "description": "SEO & AEO, programmatic advertising, conversion rate optimization" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Strategic Consulting", "description": "AI readiness assessment, digital transformation strategy, data architecture" } }
                        ]
                    }
                }}
            />
            {/* Hero loads immediately — above the fold */}
            <Hero />

            {/* Sections load ONLY when user scrolls near them — saves ~300KB JS on initial load */}
            <LazySection importFn={() => import('../components/home/Showreel')} rootMargin="100px" />
            <LazySection importFn={() => import('../components/home/Services')} rootMargin="300px" />
            <LazySection importFn={() => import('../components/home/ReelsWall')} rootMargin="300px" />
            <LazySection importFn={() => import('../components/home/BrandingCollage')} rootMargin="300px" />
            <LazySection importFn={() => import('../components/home/SeoPerformance')} rootMargin="300px" />
            <LazySection importFn={() => import('../components/home/About')} rootMargin="300px" />
            <LazySection importFn={() => import('../components/home/Reviews')} rootMargin="300px" />
            <LazySection importFn={() => import('../components/home/Contact')} rootMargin="300px" />
        </main>
    );
};

export default Home;
