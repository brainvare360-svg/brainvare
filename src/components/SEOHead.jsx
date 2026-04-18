import React from 'react';
import { Helmet } from 'react-helmet-async';

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
}) => {
    // Build Article JSON-LD
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

    // Build Breadcrumb JSON-LD
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

    // Build FAQ JSON-LD
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
        <Helmet>
            {/* Primary Meta */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Brainvare" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Article specific */}
            {article && <meta property="article:published_time" content={article.datePublished} />}
            {article && <meta property="article:author" content={article.author} />}
            {article && <meta property="article:section" content={article.category} />}

            {/* JSON-LD Structured Data */}
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
        </Helmet>
    );
};

export default SEOHead;
