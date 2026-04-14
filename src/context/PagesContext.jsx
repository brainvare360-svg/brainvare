import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultPages = {
    home: {
        id: 'home',
        title: 'Home',
        slug: '/',
        sections: {
            hero: {
                title: "AI-First Creative,\nProduction & Performance.",
                subtitle: "We blend human creativity with AI efficiency to deliver stunning results.",
                ctaText: "Discover Our Work"
            }
        },
        seo: {
            metaTitle: "Brainvare - AI-First Creative & Production Studio",
            metaDescription: "We blend human creativity with AI efficiency to deliver stunning results."
        },
        lastUpdated: new Date().toISOString()
    },
    services: {
        id: 'services',
        title: 'Services',
        slug: '/services',
        content: `<h1>Our <span class="text-brand-red">Expertise</span>.</h1>
<p>We don't just offer services; we provide end-to-end capabilities to transform your business into an AI-first powerhouse.</p>

<h2>Strategic Consulting</h2>
<p>Navigating the AI revolution requires a map. We build yours.</p>
<ul>
<li>AI Readiness Assessment</li>
<li>Digital Transformation Strategy</li>
<li>Tech Stack Optimization</li>
<li>Data Architecture</li>
</ul>

<h2>AI Implementation</h2>
<p>From chatbots to predictive models, we deploy intelligence.</p>
<ul>
<li>Custom LLM Integration</li>
<li>RAG Systems</li>
<li>Automated Workflows</li>
<li>Intelligent Agents</li>
</ul>

<h2>Web & App Development</h2>
<p>High-performance digital products built for the future.</p>
<ul>
<li>Next.js Applications</li>
<li>React Native Mobile Apps</li>
<li>WebGL Experiences</li>
<li>Enterprise Platforms</li>
</ul>

<h2>Performance Marketing</h2>
<p>Data-driven growth engines that scale with precision.</p>
<ul>
<li>SEO & AEO</li>
<li>Programmatic Ad Buying</li>
<li>Conversion Rate Optimization</li>
<li>Analytics & Reporting</li>
</ul>`,
        seo: {
            metaTitle: "Services - Brainvare",
            metaDescription: "AI Implementation, Web Development, Strategic Consulting and Performance Marketing services."
        },
        lastUpdated: new Date().toISOString()
    },
    about: {
        id: 'about',
        title: 'About Us',
        slug: '/about',
        content: `<h1>Constructing the <span class="gradient-text">Post-Digital Reality.</span></h1>

<p>Brainvare was born from a simple observation: The gap between "technically possible" and "commercially viable" is closing faster than most businesses can realize.</p>

<p>We aren't a traditional agency. We are a collective of rogue engineers, high-end designers, and strategic futurists who believe that AI is not a tool, but a fundamental substrate for the next generation of business.</p>

<h2>The Leadership</h2>
<p>Our team is led by industry veterans with decades of combined experience in technology and creative direction.</p>`,
        seo: {
            metaTitle: "About Us - Brainvare",
            metaDescription: "Learn about Brainvare, an AI-first creative agency building the post-digital reality."
        },
        lastUpdated: new Date().toISOString()
    },
    work: {
        id: 'work',
        title: 'Work',
        slug: '/work',
        content: `<h1>Selected <span class="text-brand-red">Work</span>.</h1>
<p>A curated collection of projects that showcase our capabilities across AI, design, and development.</p>`,
        seo: {
            metaTitle: "Our Work - Brainvare",
            metaDescription: "Explore our portfolio of AI-powered creative and development projects."
        },
        lastUpdated: new Date().toISOString()
    },
    insights: {
        id: 'insights',
        title: 'Insights',
        slug: '/insights',
        content: `<h1>Insights & <span class="text-brand-red">Perspectives</span>.</h1>
<p>Thoughts on AI, design, technology, and the future of digital experiences.</p>`,
        seo: {
            metaTitle: "Insights - Brainvare",
            metaDescription: "Expert perspectives on AI, design, and digital transformation."
        },
        lastUpdated: new Date().toISOString()
    }
};

const FIRESTORE_DOC = doc(db, 'siteData', 'pages');

const PagesContext = createContext();

export const usePages = () => {
    const context = useContext(PagesContext);
    if (!context) {
        throw new Error('usePages must be used within a PagesProvider');
    }
    return context;
};

export const PagesProvider = ({ children }) => {
    const [pages, setPages] = useState(defaultPages);
    const [loading, setLoading] = useState(true);
    const isInitialLoad = useRef(true);

    // Load from Firestore on mount
    useEffect(() => {
        const loadPages = async () => {
            try {
                let localDataToMigrate = defaultPages;
                try {
                    const saved = localStorage.getItem('brainvare_pages');
                    if (saved) {
                        localDataToMigrate = { ...defaultPages, ...JSON.parse(saved) };
                        setPages(localDataToMigrate);
                    }
                } catch (e) { }

                const snap = await getDoc(FIRESTORE_DOC);
                if (snap.exists()) {
                    setPages({ ...defaultPages, ...snap.data() });
                } else {
                    await setDoc(FIRESTORE_DOC, localDataToMigrate);
                }
            } catch (error) {
                console.error("Failed to load pages from Firestore:", error);
                try {
                    const saved = localStorage.getItem('brainvare_pages');
                    if (saved) setPages({ ...defaultPages, ...JSON.parse(saved) });
                } catch (e) { }
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };
        loadPages();
    }, []);

    // Persist to Firestore whenever pages change (skip initial load)
    useEffect(() => {
        if (isInitialLoad.current) return;
        const save = async () => {
            try {
                await setDoc(FIRESTORE_DOC, pages);
            } catch (error) {
                console.error("Failed to save pages to Firestore:", error);
            }
        };
        save();
    }, [pages]);

    // Update a page
    const updatePage = (pageId, updates) => {
        setPages(prev => ({
            ...prev,
            [pageId]: {
                ...prev[pageId],
                ...updates,
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    // Update page content
    const updatePageContent = (pageId, content) => {
        updatePage(pageId, { content });
    };

    // Update page SEO
    const updatePageSeo = (pageId, seo) => {
        setPages(prev => ({
            ...prev,
            [pageId]: {
                ...prev[pageId],
                seo: { ...prev[pageId].seo, ...seo },
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    // Get a page by ID
    const getPage = (pageId) => pages[pageId];

    // Get all pages as array
    const getAllPages = () => Object.values(pages);

    // Reset to defaults
    const resetPages = async () => {
        if (window.confirm('Reset all pages to defaults? This cannot be undone.')) {
            setPages(defaultPages);
            try {
                await setDoc(FIRESTORE_DOC, defaultPages);
            } catch (e) {
                console.error("Failed to reset pages in Firestore:", e);
            }
        }
    };

    return (
        <PagesContext.Provider value={{
            pages,
            loading,
            updatePage,
            updatePageContent,
            updatePageSeo,
            getPage,
            getAllPages,
            resetPages
        }}>
            {children}
        </PagesContext.Provider>
    );
};
