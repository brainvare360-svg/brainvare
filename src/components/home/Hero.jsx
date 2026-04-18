import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X, Volume2, VolumeX } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

// Fullscreen video player — only mounts when user clicks "Watch Reel"
const VideoOverlay = ({ src, onClose }) => {
    const [isMuted, setIsMuted] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Video only created when overlay is open */}
                <video
                    src={src}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 backdrop-blur-md transition-colors z-10"
                >
                    <X size={22} />
                </button>
                <button
                    onClick={() => setIsMuted(m => !m)}
                    className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 backdrop-blur-md transition-colors z-10"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </motion.div>
        </motion.div>
    );
};

const Hero = () => {
    const { content } = useContent();
    const { hero } = content;
    const [showVideo, setShowVideo] = useState(false);

    const videoSrc = hero?.videoUrl || 'https://cdn.pixabay.com/video/2023/04/23/160109-820542385_large.mp4';

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Pure CSS background — zero network requests */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
                {/* Ambient glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
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
                        <span className="whitespace-pre-line">{hero?.title || 'We Build Digital Futures.'}</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
                        {hero?.subtitle || 'Brainvare is an AI-first creative studio integrating data, design, and technology to scale your brand.'}
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

                        {/* Watch Reel — video ONLY loads when this is clicked */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowVideo(true)}
                            className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 flex items-center gap-2 md:gap-3 font-medium text-white transition-colors text-sm md:text-base"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Watch Reel</span>
                        </motion.button>
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

            {/* Video overlay — only mounts on click, zero cost on page load */}
            <AnimatePresence>
                {showVideo && (
                    <VideoOverlay src={videoSrc} onClose={() => setShowVideo(false)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;
