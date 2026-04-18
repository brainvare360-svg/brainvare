import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// ---------------------------------------------------------------------------
// Thumbnail: captures a single frame from an MP4 via a hidden video + canvas.
// The video element is created off-DOM, seeked to 0.5s, then discarded.
// Zero network cost until the card enters the viewport.
// ---------------------------------------------------------------------------
const useThumbnail = (videoUrl) => {
    const [thumbSrc, setThumbSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const cardRef = useRef(null);
    const captured = useRef(false);

    const capture = useCallback(() => {
        if (captured.current || !videoUrl) return;
        captured.current = true;
        setLoading(true);

        const vid = document.createElement('video');
        vid.crossOrigin = 'anonymous';
        vid.preload = 'metadata';
        vid.muted = true;
        vid.playsInline = true;
        vid.src = videoUrl;

        const cleanup = () => {
            vid.removeEventListener('seeked', onSeeked);
            vid.removeEventListener('error', onError);
            vid.src = '';
            vid.load();
        };

        const onSeeked = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = vid.videoWidth || 200;
                canvas.height = vid.videoHeight || 356;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
                setThumbSrc(canvas.toDataURL('image/jpeg', 0.75));
            } catch (_) {
                // CORS or tainted canvas — fall back to gradient placeholder
            }
            setLoading(false);
            cleanup();
        };

        const onError = () => {
            setLoading(false);
            cleanup();
        };

        vid.addEventListener('seeked', onSeeked);
        vid.addEventListener('error', onError);

        vid.addEventListener('loadedmetadata', () => {
            vid.currentTime = 0.5;
        }, { once: true });

        vid.load();
    }, [videoUrl]);

    useEffect(() => {
        if (!cardRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    capture();
                    observer.disconnect();
                }
            },
            { rootMargin: '200px 0px' }
        );
        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [capture]);

    return { thumbSrc, loading, cardRef };
};

// ---------------------------------------------------------------------------
// HorizontalMarquee
// ---------------------------------------------------------------------------
const HorizontalMarquee = ({ items, direction = 1, speed = 40, onVideoClick }) => (
    <div className="flex overflow-hidden relative w-full group/marquee">
        <div
            className={`flex gap-4 min-w-max hover:[animation-play-state:paused] ${direction === 1 ? 'animate-marquee-right' : 'animate-marquee-left'}`}
            style={{ '--duration': `${speed}s`, willChange: 'transform' }}
        >
            {[...items, ...items].map((item, index) => (
                <ReelCard key={`${item.id}-${index}`} item={item} onClick={() => onVideoClick(item)} />
            ))}
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// ReelCard — shows a canvas thumbnail; NO video element on page load
// ---------------------------------------------------------------------------
const ReelCard = ({ item, onClick }) => {
    const { thumbSrc, loading, cardRef } = useThumbnail(item.video);

    const handleInstagramClick = (e) => {
        e.stopPropagation();
        if (!item.instagram || item.instagram.trim() === '') return;
        window.open(item.instagram, '_blank');
    };

    return (
        <motion.div
            ref={cardRef}
            whileHover={{ scale: 1.05, opacity: 1, zIndex: 10 }}
            className="relative w-[140px] sm:w-[160px] md:w-[200px] aspect-[9/16] rounded-lg overflow-hidden bg-gray-900 border border-white/10 cursor-pointer shadow-lg group opacity-90 transition-all flex-shrink-0"
            onClick={onClick}
        >
            {/* Thumbnail layer */}
            {thumbSrc ? (
                <img
                    src={thumbSrc}
                    alt="reel thumbnail"
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            ) : (
                /* Gradient placeholder while thumbnail is being captured */
                <div
                    className="w-full h-full"
                    style={{
                        background: loading
                            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                            : 'linear-gradient(135deg, #111 0%, #222 100%)',
                    }}
                >
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            )}

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/40 group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-0.5" fill="white" />
                </div>
            </div>

            {/* Instagram link */}
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

// ---------------------------------------------------------------------------
// FullScreenPlayer — video only loads here, on explicit user click
// ---------------------------------------------------------------------------
const FullScreenPlayer = ({ video, onClose }) => {
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
                    preload="auto"
                    className="w-full h-full object-cover"
                />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-colors z-50"
                >
                    <X size={20} className="md:hidden" />
                    <X size={24} className="hidden md:block" />
                </button>

                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-20 md:bottom-24 right-4 md:right-6 p-2 md:p-3 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-colors z-50"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/70 to-transparent z-40">
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

// ---------------------------------------------------------------------------
// ReelsWall
// ---------------------------------------------------------------------------
const ReelsWall = () => {
    const { reelsData } = useReels();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hasIntersected, setHasIntersected] = useState(false);
    const observerRef = useRef(null);

    const rows = useMemo(() => {
        if (!reelsData || !Array.isArray(reelsData) || reelsData.length === 0) {
            return [[], [], []];
        }
        const mappedList = reelsData.map((item, i) => ({
            id: i,
            video: item.video,
            instagram: item.instagram,
        }));
        return chunkArray(mappedList, 3);
    }, [reelsData]);

    // Mount the marquee rows only when the section enters the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasIntersected(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '600px 0px' }
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={observerRef}
            className="py-16 md:py-24 bg-brand-dark overflow-hidden relative z-10 min-h-screen flex flex-col justify-center"
        >
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

            <div className="flex flex-col gap-6 relative mask-gradient-horizontal w-full min-h-[400px]">
                {hasIntersected && (
                    <>
                        <HorizontalMarquee items={rows[0]} direction={-1} speed={50} onVideoClick={setSelectedVideo} />
                        <HorizontalMarquee items={rows[1]} direction={1} speed={40} onVideoClick={setSelectedVideo} />
                        <HorizontalMarquee items={rows[2]} direction={-1} speed={60} onVideoClick={setSelectedVideo} />
                    </>
                )}
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
