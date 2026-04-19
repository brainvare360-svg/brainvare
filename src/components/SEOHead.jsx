'use client'

import React from 'react';

const SEOHead = ({
    title = 'Brainvare | AI-First Creative Studio',
    description = 'Brainvare is an AI-first creative studio integrating data, design, and technology to scale your brand.',
    canonical = 'https://www.brainvare.com/',
    ogImage = 'https://www.brainvare.com/logo.png',
    ogType = 'website',
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
            {/* Primary Meta */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta name="author" content="Brainvare" />

            {/* Robots */}
            {noindex
                ? <meta name="robots" content="noindex, nofollow" />
                : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            }

            {/* Keywords */}
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Brainvare" />
            <meta property="og:locale" content={locale} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@brainvare" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Article specific */}
            {article && <meta property="article:published_time" content={article.datePublished} />}
            {article && <meta property="article:author" content={article.author} />}
            {article && <meta property="article:section" content={article.category} />}

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            {websiteSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(websiteSchema)}
                </script>
            )}
            {articleSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            )}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
            {faqSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            )}
            {customSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(customSchema)}
                </script>
            )}
        </>
    );
};

export default SEOHead;
