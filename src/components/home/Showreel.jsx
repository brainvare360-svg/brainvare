'use client'

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const Showreel = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lazy load video — only start loading when section is near viewport
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Start loading 200px before visible
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section id="showreel" ref={containerRef} className="h-screen w-full relative z-20 flex items-center justify-center bg-brand-dark overflow-hidden py-0">
            <motion.div
                style={{ scale }}
                className="w-full h-full relative group shadow-2xl"
            >
                {isVisible ? (
                    <video
                        ref={videoRef}
                        src={isMobile ? "/agency-showreel-mobile.mp4" : "/agency-showreel.mp4"}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    />
                ) : (
                    <div className="w-full h-full bg-brand-dark" />
                )}

                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-10">
                    <button
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors"
                    >
                        {isMuted ? <VolumeX size={16} className="md:hidden" /> : <Volume2 size={16} className="md:hidden" />}
                        {isMuted ? <VolumeX size={20} className="hidden md:block" /> : <Volume2 size={20} className="hidden md:block" />}
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Showreel;
