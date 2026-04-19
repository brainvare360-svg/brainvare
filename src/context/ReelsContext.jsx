import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Default reels data (matches the original hardcoded list)
const defaultReelsData = [
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQM-TQMYNZxDCym8Q6rwKfYYEe7AGmKR5O_cECM-uhTi7xKJXQjeSZhcdUIyBf-MjsKb8UGkA0aJdszPIdRYjOfEtZ596lOUrDPOQxk.mp4", instagram: "https://www.instagram.com/p/DLnFFc5z4xZ/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMEYeZv9xI4ith-CuBlcQxJKu487u1slkuPYouUEeAnFTeM7FdKAh470ZbDvs4WgvFy9xRW3la-Bh1OYwygRSwa5Bc_G3sZHnsvOxY.mp4", instagram: "https://www.instagram.com/p/DLe5VTJvLaq/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMJMM3yFtaf7d2gr3GeUrXiV8aLsUtOA27HXhotEqwLRCaLIqiULIADnEs2axIibAGFqBURGfGeZVuXI8QjKgNuKEC3xBnXA0dCTMI.mp4", instagram: "https://www.instagram.com/p/DLaNf1BvGqP/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMVA4kbzQkkR-Z-3_PnmSYZ9RYib_30BWQ-fS_n3jMiLWmTSlYRUm3gkDxXyYr8eLHYfrYgAYDeGc7qAaiHgz29cvTEwND10f8Btkg.mp4", instagram: "https://www.instagram.com/p/DK9-S5YvWVH/" },
    { video: "https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/reels/SaveClip.App_AQMmTeKweOCmUP9_rHn0kke82AfHFz_ZgzVGkIWfPFUurQ-I4h793O1zHx_yvtVuxd8cQj-fal4Sl6_lKn6jjlIWxIhOR8Dp9sgwO5U.mp4", instagram: "https://www.instagram.com/p/DKkS_-lPTYR/" },
];

const ReelsContext = createContext();

export const useReels = () => {
    const context = useContext(ReelsContext);
    if (!context) {
        throw new Error('useReels must be used within a ReelsProvider');
    }
    return context;
};

export const ReelsProvider = ({ children }) => {
    const [reelsData, setReelsData] = useState(defaultReelsData);
    const [loading, setLoading] = useState(true);
    const isInitialLoad = useRef(true);

    // Load from API on mount
    useEffect(() => {
        const loadReels = async () => {
            try {
                const res = await fetch(`${API_URL}/reels`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                        setReelsData(data.items);
                    }
                }
            } catch (error) {
                console.error("Failed to load reels:", error);
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };
        loadReels();
    }, []);

    // Persist to API whenever reelsData changes (skip initial load)
    useEffect(() => {
        if (isInitialLoad.current) return;

        const timer = setTimeout(async () => {
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                if (!token) return;
                const res = await fetch(`${API_URL}/reels`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ items: reelsData }),
                });
                if (res.ok) {
                    console.log(`✅ Auto-saved ${reelsData.length} reels`);
                } else {
                    console.error("❌ Failed to save reels:", await res.text());
                }
            } catch (error) {
                console.error("❌ Failed to save reels:", error);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [reelsData]);

    const updateReelLink = (index, instagram) => {
        setReelsData(prev => prev.map((reel, i) =>
            i === index ? { ...reel, instagram } : reel
        ));
    };

    const addReel = (videoUrl, instagramLink = '') => {
        setReelsData(prev => [...prev, { video: videoUrl, instagram: instagramLink }]);
    };

    const removeReel = (index) => {
        setReelsData(prev => prev.filter((_, i) => i !== index));
    };

    const updateAllReels = (newData) => {
        setReelsData(newData);
    };

    const resetReels = async () => {
        if (window.confirm('Reset all reel links to defaults? This cannot be undone.')) {
            setReelsData(defaultReelsData);
            try {
                const token = localStorage.getItem('brainvare_auth_token');
                await fetch(`${API_URL}/reels`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ items: defaultReelsData }),
                });
            } catch (e) {
                console.error("Failed to reset reels:", e);
            }
        }
    };

    return (
        <ReelsContext.Provider value={{
            reelsData, loading, updateReelLink,
            addReel, removeReel, updateAllReels, resetReels
        }}>
            {children}
        </ReelsContext.Provider>
    );
};
