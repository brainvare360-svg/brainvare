import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { defaultContent } from './contentData';

const FIRESTORE_DOC = doc(db, 'siteData', 'content');

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

    // Load from Firestore on mount
    useEffect(() => {
        const loadContent = async () => {
            try {
                let localDataToMigrate = defaultContent;
                try {
                    const saved = localStorage.getItem('brainvare_content');
                    if (saved) {
                        localDataToMigrate = { ...defaultContent, ...JSON.parse(saved) };
                        setContent(localDataToMigrate);
                    }
                } catch (e) { }

                const snap = await getDoc(FIRESTORE_DOC);
                if (snap.exists()) {
                    setContent({ ...defaultContent, ...snap.data() });
                } else {
                    // First time: seed Firestore with local data
                    await setDoc(FIRESTORE_DOC, localDataToMigrate);
                }
            } catch (error) {
                console.error("Failed to load content from Firestore:", error);
                // Fallback to localStorage
                try {
                    const saved = localStorage.getItem('brainvare_content');
                    if (saved) setContent({ ...defaultContent, ...JSON.parse(saved) });
                } catch (e) { }
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };
        loadContent();
    }, []);

    // Persist to Firestore whenever content changes (skip initial load)
    useEffect(() => {
        if (isInitialLoad.current) return;
        const save = async () => {
            try {
                await setDoc(FIRESTORE_DOC, content);
            } catch (error) {
                console.error("Failed to save content to Firestore:", error);
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
                await setDoc(FIRESTORE_DOC, defaultContent);
            } catch (e) {
                console.error("Failed to reset content in Firestore:", e);
            }
        }
    };

    return (
        <ContentContext.Provider value={{ content, loading, updateSection, updateItem, addItem, removeItem, resetToDefaults }}>
            {children}
        </ContentContext.Provider>
    );
};
