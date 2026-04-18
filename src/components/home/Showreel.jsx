import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VIDEO_SRC = 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4';

const Showreel = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    // Video element is only rendered after first click — zero network cost before that
    const [videoStarted, setVideoStarted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    const handlePlay = () => {
        if (!videoStarted) {
            // First click: mount the video element (which starts loading & playing)
            setVideoStarted(true);
            setIsPlaying(true);
        } else {
            // Subsequent clicks: toggle play/pause
            if (isPlaying) {
                videoRef.current?.pause();
                setIsPlaying(false);
            } else {
                videoRef.current?.play();
                setIsPlaying(true);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
        setIsMuted(m => !m);
    };

    return (
        <section
            ref={containerRef}
            className="h-[60vh] md:h-[70vh] lg:h-[80vh] py-10 md:py-16 lg:py-20 flex items-center justify-center bg-transparent relative z-20"
        >
            <motion.div
                style={{ scale, opacity }}
                className="w-[95%] md:w-[90%] lg:w-[80%] h-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-brand-red/10 border border-white/10 group"
            >
                {/* Static CSS gradient poster — shown until user clicks Play */}
                {!videoStarted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 via-transparent to-purple-900/10" />
                        {/* Subtle animated lines to add visual interest */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)',
                            }}
                        />
                    </div>
                )}

                {/* Video — only rendered in the DOM after first user click */}
                {videoStarted && (
                    <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                )}

                <div className="absolute inset-0 bg-black/30 pointer-events-none group-hover:bg-black/10 transition-colors duration-500" />

                {/* Overlay Controls */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-block px-3 py-1 md:px-4 md:py-1 mb-3 md:mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="text-xs md:text-sm font-mark uppercase tracking-widest text-white">Agency Showreel</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 lg:mb-8 tracking-tighter">
                            We Craft <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-purple-500">Motion.</span>
                        </h2>
                    </motion.div>

                    {/* Play/Pause button — clicking this is what starts the video */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlay}
                        className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-brand-red hover:border-brand-red transition-all duration-300"
                    >
                        {isPlaying
                            ? <Pause className="fill-current w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                            : <Play className="fill-current w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 ml-0.5 md:ml-1" />
                        }
                    </motion.button>
                </div>

                {/* Mute toggle — only shown once video has started */}
                {videoStarted && (
                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
                        <button
                            onClick={toggleMute}
                            className="p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors"
                        >
                            {isMuted ? <VolumeX size={16} className="md:hidden" /> : <Volume2 size={16} className="md:hidden" />}
                            {isMuted ? <VolumeX size={20} className="hidden md:block" /> : <Volume2 size={20} className="hidden md:block" />}
                        </button>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Showreel;
