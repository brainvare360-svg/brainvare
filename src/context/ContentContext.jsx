import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { defaultContent } from './contentData';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ContentContext = createContext();

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);
    const isInitialLoad = useRef(true);

    // Load from API on mount
    useEffect(() => {
        const loadContent = async () => {
            try {
                const res = await fetch(`${API_URL}/content`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && Object.keys(data).length > 0) {
                        // Sanitize: replace any expired Vimeo URLs with working fallback
                        const merged = { ...defaultContent, ...data };
                        if (merged.hero?.videoUrl?.includes('player.vimeo.com/external')) {
                            merged.hero = { ...merged.hero, videoUrl: defaultContent.hero.videoUrl };
                        }
                        setContent(merged);
                    }
                }
            } catch (error) {
                console.error("Failed to load content from API:", error);
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };
        loadContent();
    }, []);

    // Persist to API whenever content changes (skip initial load)
    useEffect(() => {
        if (isInitialLoad.current) return;
        const save = async () => {
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                if (!token) return; // Only save if admin is logged in
                await fetch(`${API_URL}/content`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(content),
                });
            } catch (error) {
                console.error("Failed to save content to API:", error);
            }
        };
        save();
    }, [content]);

    // Update a specific section (e.g., 'hero')
    const updateSection = (sectionKey, newData) => {
        setContent(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                ...newData
            }
        }));
    };

    // Update a specific item in an array (e.g., a specific service)
    const updateItem = (sectionKey, itemId, newData) => {
        setContent(prev => ({
            ...prev,
            [sectionKey]: prev[sectionKey].map(item =>
                item.id === itemId ? { ...item, ...newData } : item
            )
        }));
    };

    // Add a new item to an array section
    const addItem = (sectionKey, newItem) => {
        setContent(prev => {
            const list = prev[sectionKey];
            if (!Array.isArray(list)) return prev;
            return {
                ...prev,
                [sectionKey]: [...list, newItem]
            };
        });
    };

    // Remove an item from an array section
    const removeItem = (sectionKey, itemId) => {
        setContent(prev => {
            const list = prev[sectionKey];
            if (!Array.isArray(list)) return prev;
            return {
                ...prev,
                [sectionKey]: list.filter(item => item.id !== itemId)
            };
        });
    };

    const resetToDefaults = async () => {
        if (window.confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
            setContent(defaultContent);
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                await fetch(`${API_URL}/content`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(defaultContent),
                });
            } catch (e) {
                console.error("Failed to reset content:", e);
            }
        }
    };

    return (
        <ContentContext.Provider value={{ content, loading, updateSection, updateItem, addItem, removeItem, resetToDefaults }}>
            {children}
        </ContentContext.Provider>
    );
};
