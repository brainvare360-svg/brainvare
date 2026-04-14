import React, { useMemo, useState, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { Instagram, Play, X, Volume2, VolumeX } from 'lucide-react';
import { useReels } from '../../context/ReelsContext';

// Chunk into N rows
const chunkArray = (arr, parts) => {
    let result = [];
    for (let i = 0; i < parts; i++) {
        result.push(arr.filter((_, index) => index % parts === i));
    }
    return result;
};

const HorizontalMarquee = ({ items, direction = 1, speed = 40, onVideoClick }) => {
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    useAnimationFrame((t, delta) => {
        if (isHovered) return;

        const moveBy = direction * (speed * (delta / 1000));
        let newX = x.get() + moveBy;

        const contentWidth = items.length * 220;

        if (direction > 0 && newX > 0) {
            newX = -contentWidth / 2;
        } else if (direction < 0 && newX < -contentWidth / 2) {
            newX = 0;
        }

        x.set(newX);
    });

    return (
        <div className="flex overflow-hidden relative w-full">
            <motion.div
                className="flex gap-4 min-w-max"
                style={{ x }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {items.map((item) => (
                    <ReelCard key={item.id} item={item} onClick={() => onVideoClick(item)} />
                ))}
            </motion.div>
        </div>
    );
};

const ReelCard = ({ item, onClick }) => {
    const handleInstagramClick = (e) => {
        e.stopPropagation();
        if (!item.instagram || item.instagram.trim() === '') return;
        window.open(item.instagram, '_blank');
    };

    return (
        <motion.div
            layoutId={`video-${item.id}`}
            whileHover={{ scale: 1.05, opacity: 1, zIndex: 10 }}
            className="relative w-[140px] sm:w-[160px] md:w-[200px] aspect-[9/16] rounded-lg overflow-hidden bg-gray-900 border border-white/10 cursor-pointer shadow-lg group opacity-90 transition-all flex-shrink-0"
            onClick={onClick}
        >
            {/* Video showing frame at 0.5s via media fragment to avoid network crashing */}
            <video
                src={`${item.video}#t=0.5`}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
            />

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/40 group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-0.5" fill="white" />
                </div>
            </div>

            {/* Link Icon Overlay */}
            <button
                onClick={handleInstagramClick}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 shadow-lg"
                title="View on Instagram"
            >
                <Instagram size={16} />
            </button>
        </motion.div>
    );
};

const FullScreenPlayer = ({ video, onClose }) => {
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                layoutId={`video-${video.id}`}
                className="relative h-full max-h-[90vh] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    ref={videoRef}
                    src={video.video}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                >
                    <X size={20} className="md:hidden" />
                    <X size={24} className="hidden md:block" />
                </button>

                {/* Mute/Unmute Button */}
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-20 md:bottom-24 right-4 md:right-6 p-2 md:p-3 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                    {video.instagram && video.instagram.trim() !== '' && (
                        <a
                            href={video.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-medium text-sm md:text-base hover:scale-105 transition-transform"
                        >
                            <Instagram size={18} />
                            View on Instagram
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const ReelsWall = () => {
    const { reelsData } = useReels();
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Compute expanded list and rows from context data
    const rows = useMemo(() => {
        // We ensure we only compute on the base array
        const REPEAT_COUNT = 2;
        // Check if reelsData is empty or not an array to avoid errors
        if (!reelsData || !Array.isArray(reelsData) || reelsData.length === 0) {
            return [[], [], []];
        }
        
        const expandedList = Array(REPEAT_COUNT).fill(reelsData).flat().map((item, i) => ({
            id: i,
            video: item.video,
            instagram: item.instagram,
        }));
        
        return chunkArray(expandedList, 3);
    }, [reelsData]);

    return (
        <section className="py-16 md:py-24 bg-brand-dark overflow-hidden relative z-10 min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center relative z-20 shrink-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-2 md:mb-4 text-white">
                        Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-purple-600">Feed.</span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-xl mx-auto">
                        Explore our global network of creators.
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Marquee Container */}
            <div className="flex flex-col gap-6 relative mask-gradient-horizontal w-full">
                <HorizontalMarquee items={rows[0]} direction={-1} speed={50} onVideoClick={setSelectedVideo} />
                <HorizontalMarquee items={rows[1]} direction={1} speed={40} onVideoClick={setSelectedVideo} />
                <HorizontalMarquee items={rows[2]} direction={-1} speed={60} onVideoClick={setSelectedVideo} />
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <FullScreenPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default ReelsWall;
