'use client'

import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useRouter, usePathname } from 'next/navigation';

const Hero = () => {
    const { content } = useContent();
    const { hero } = content;
    const router = useRouter();
    const pathname = usePathname();
    const [showVideo, setShowVideo] = useState(false);

    // Load video well after LCP measurement window
    useEffect(() => {
        const load = () => setShowVideo(true);
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(load, { timeout: 3000 });
        } else {
            setTimeout(load, 2500);
        }
    }, []);

    const scrollToContact = () => {
        if (pathname === '/') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/');
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Video — deferred load */}
            <div className="absolute inset-0 overflow-hidden">
                {showVideo && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    >
                        <source src={hero?.videoUrl || "https://cdn.pixabay.com/video/2023/04/23/160109-820542385_large.mp4"} type="video/mp4" />
                    </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <div
                    className="max-w-4xl mx-auto animate-[fadeInUp_0.8s_ease-out_both]"
                >
                    <div
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-[fadeIn_0.8s_ease-out_0.2s_both]"
                    >
                        <span className="text-sm font-medium text-gray-300">Reimagining Digital Experiences</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 md:mb-8">
                        <span className="whitespace-pre-line">{hero?.title || "We Build Digital Futures."}</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
                        {hero?.subtitle || "Brainvare is an AI-first creative studio integrating data, design, and technology to scale your brand."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <button
                            onClick={scrollToContact}
                            className="group relative px-6 py-3 md:px-8 md:py-4 bg-brand-red rounded-full overflow-hidden flex items-center gap-2 md:gap-3 font-bold text-white shadow-lg shadow-brand-red/25 text-sm md:text-base hover:scale-105 active:scale-95 transition-transform"
                        >
                            <span className="relative z-10">Start Project</span>
                            <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 flex items-center gap-2 md:gap-3 font-medium text-white transition-all text-sm md:text-base hover:scale-105 active:scale-95"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Watch Reel</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-[fadeIn_1s_ease-out_1s_both]"
            >
                <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </div>
        </section>
    );
};

export default Hero;
