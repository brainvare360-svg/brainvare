import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const API_URL = 'https://brainvare-api.brainvare.workers.dev';

const defaultCareers = [
    {
        id: 'c1',
        title: 'Video Editor',
        type: 'Full-time',
        location: 'Kochi, Kerala',
        description: 'We are looking for a skilled Video Editor to join our production team. You will be responsible for editing high-quality video content for brands, social media, and cinematic projects.',
        requirements: [
            '2+ years of experience in professional video editing',
            'Proficiency in Adobe Premiere Pro, After Effects, and DaVinci Resolve',
            'Strong understanding of storytelling, pacing, and color grading',
            'Experience with motion graphics and visual effects is a plus',
            'Portfolio of previous work required'
        ],
        status: 'active',
        postedDate: '2026-04-15'
    },
    {
        id: 'c2',
        title: 'Cinematographer',
        type: 'Full-time',
        location: 'Kochi, Kerala',
        description: 'Join our creative team as a Cinematographer to shoot compelling visual content for events, brand films, interviews, and social media campaigns.',
        requirements: [
            '3+ years of professional cinematography experience',
            'Expertise with cinema cameras (Sony FX6/FX3, Blackmagic, RED)',
            'Strong eye for composition, lighting, and visual storytelling',
            'Experience shooting events, talking heads, and brand content',
            'Own gear is a plus but not mandatory',
            'Showreel required'
        ],
        status: 'active',
        postedDate: '2026-04-15'
    },
    {
        id: 'c3',
        title: 'Graphic Designer',
        type: 'Full-time',
        location: 'Kochi, Kerala (Hybrid)',
        description: 'We need a creative Graphic Designer to craft stunning visuals for digital campaigns, social media, branding projects, and print collateral.',
        requirements: [
            '2+ years of graphic design experience',
            'Expert in Adobe Photoshop, Illustrator, and Figma',
            'Strong typography and layout skills',
            'Experience in brand identity design and social media creatives',
            'Understanding of motion design is a bonus',
            'Portfolio required'
        ],
        status: 'active',
        postedDate: '2026-04-15'
    }
];

const CareersContext = createContext();

export const useCareers = () => useContext(CareersContext);

export const CareersProvider = ({ children }) => {
    const [careersData, setCareersData] = useState(defaultCareers);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const res = await fetch(`${API_URL}/careers`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                        setCareersData(data.items);
                    }
                }
            } catch (error) {
                console.error("Failed to load careers:", error);
            } finally {
                isInitialLoad.current = false;
            }
        };
        fetchCareers();
    }, []);

    useEffect(() => {
        if (isInitialLoad.current) return;
        const saveCareers = async () => {
            try {
                const res = await fetch(`${API_URL}/careers`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: careersData }),
                });
                if (res.ok) {
                    console.log(`✅ Auto-saved ${careersData.length} careers`);
                }
            } catch (error) {
                console.error("❌ Failed to save careers:", error);
            }
        };
        saveCareers();
    }, [careersData]);

    const addCareer = (career) => {
        const newCareer = { ...career, id: `c${Date.now()}`, postedDate: new Date().toISOString().split('T')[0] };
        setCareersData(prev => [newCareer, ...prev]);
        return newCareer;
    };

    const updateCareer = (id, updates) => {
        setCareersData(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const deleteCareer = (id) => {
        setCareersData(prev => prev.filter(c => c.id !== id));
    };

    return (
        <CareersContext.Provider value={{ careersData, addCareer, updateCareer, deleteCareer }}>
            {children}
        </CareersContext.Provider>
    );
};
