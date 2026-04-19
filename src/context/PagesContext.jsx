import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

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
<p>We don't just offer services; we provide end-to-end capabilities to transform your business into an AI-first powerhouse.</p>`,
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
<p>Brainvare was born from a simple observation: The gap between "technically possible" and "commercially viable" is closing faster than most businesses can realize.</p>`,
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
    const [loading, setLoading] = useState(false);
    const isInitialLoad = useRef(true);
    const hasFetched = useRef(false);

    // Lazy fetch — called when admin needs it
    const fetchPages = async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/pages`);
            if (res.ok) {
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    setPages({ ...defaultPages, ...data });
                }
            }
        } catch (error) {
            console.error("Failed to load pages from API:", error);
            hasFetched.current = false;
        } finally {
            setLoading(false);
            isInitialLoad.current = false;
        }
    };

    // Persist to API whenever pages change (skip initial load)
    useEffect(() => {
        if (isInitialLoad.current) return;
        const save = async () => {
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                if (!token) return;
                await fetch(`${API_URL}/pages`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(pages),
                });
            } catch (error) {
                console.error("Failed to save pages to API:", error);
            }
        };
        save();
    }, [pages]);

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

    const updatePageContent = (pageId, content) => {
        updatePage(pageId, { content });
    };

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

    const getPage = (pageId) => pages[pageId];
    const getAllPages = () => Object.values(pages);

    const resetPages = async () => {
        if (window.confirm('Reset all pages to defaults? This cannot be undone.')) {
            setPages(defaultPages);
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                await fetch(`${API_URL}/pages`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(defaultPages),
                });
            } catch (e) {
                console.error("Failed to reset pages:", e);
            }
        }
    };

    return (
        <PagesContext.Provider value={{
            pages, loading, updatePage, updatePageContent,
            updatePageSeo, getPage, getAllPages, resetPages, fetchPages
        }}>
            {children}
        </PagesContext.Provider>
    );
};
