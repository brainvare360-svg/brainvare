'use client'

import React from 'react';

/**
 * SEOHead — renders structured data (JSON-LD) only.
 * Basic meta tags (title, description, OG, Twitter) are handled by
 * Next.js metadata API in layout.jsx / page.jsx files.
 */
const SEOHead = ({
    title,
    description,
    canonical,
    ogImage,
    ogType,
    article = null,
    breadcrumbs = null,
    faq = null,
    noindex = false,
    keywords = '',
    customSchema = null,
    isHomePage = false,
    locale = 'en_US',
}) => {
    // ─── Organization JSON-LD (every page) ───
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Brainvare",
        "alternateName": "Brainvare Creative Studio",
        "url": "https://www.brainvare.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.brainvare.com/logo.png",
            "width": 512,
            "height": 512
        },
        "description": "AI-first creative studio integrating data, design, and technology to scale brands. Strategic consulting, AI implementation, web development, and performance marketing.",
        "foundingDate": "2020",
        "founders": [
            {
                "@type": "Person",
                "name": "Arun AG",
                "jobTitle": "Founder"
            },
            {
                "@type": "Person",
                "name": "Anila G Nair",
                "jobTitle": "Co-Founder"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kochi",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+918075098869",
            "contactType": "customer service",
            "email": "care@brainvare.com",
            "availableLanguage": ["English", "Malayalam", "Hindi"]
        },
        "sameAs": [
            "https://www.instagram.com/brainvare",
            "https://www.linkedin.com/company/brainvare"
        ]
    };

    // ─── WebSite JSON-LD with SearchAction (homepage only) ───
    const websiteSchema = isHomePage ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Brainvare",
        "url": "https://www.brainvare.com",
        "description": "AI-first creative studio integrating data, design, and technology.",
        "publisher": {
            "@type": "Organization",
            "name": "Brainvare"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.brainvare.com/blog?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    } : null;

    // ─── Article JSON-LD ───
    const articleSchema = article ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "image": article.image || ogImage,
        "author": {
            "@type": "Person",
            "name": article.author,
            "jobTitle": article.authorRole,
            "url": "https://www.brainvare.com/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Brainvare",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.brainvare.com/logo.png"
            }
        },
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical
        },
        "wordCount": article.wordCount,
        "articleSection": article.category,
        "keywords": article.keywords
    } : null;

    // ─── Breadcrumb JSON-LD ───
    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": crumb.name,
            "item": crumb.url
        }))
    } : null;

    // ─── FAQ JSON-LD ───
    const faqSchema = faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    return (
        <>
            {/* JSON-LD Structured Data only — meta tags handled by Next.js metadata API */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            {websiteSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            )}
            {articleSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            )}
            {breadcrumbSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            )}
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
            {customSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />
            )}
        </>
    );
};

export default SEOHead;
