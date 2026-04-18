import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Hero = () => {
    const { content } = useContent();
    const { hero } = content;

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                >
                    <source src={hero?.videoUrl || "https://cdn.pixabay.com/video/2023/04/23/160109-820542385_large.mp4"} type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 transform-gpu translate-z-0 will-change-transform pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="text-sm font-medium text-gray-300">Reimagining Digital Experiences</span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 md:mb-8">
                        <span className="whitespace-pre-line">{hero?.title || "We Build Digital Futures."}</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
                        {hero?.subtitle || "Brainvare is an AI-first creative studio integrating data, design, and technology to scale your brand."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-6 py-3 md:px-8 md:py-4 bg-brand-red rounded-full overflow-hidden flex items-center gap-2 md:gap-3 font-bold text-white shadow-lg shadow-brand-red/25 text-sm md:text-base"
                        >
                            <span className="relative z-10">Start Project</span>
                            <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.a
                            href={window.innerWidth < 768 ? "/agency-showreel-mobile.mp4" : "/agency-showreel.mp4"}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 flex items-center gap-2 md:gap-3 font-medium text-white transition-colors text-sm md:text-base"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Watch Reel</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </motion.div>
        </section>
    );
};

export default Hero;
