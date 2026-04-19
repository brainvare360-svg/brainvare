import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ToggleRight, PenTool, Layout, Type, Palette, MousePointer2, Grid, Layers, X as XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandingCollage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // --- SCROLL TRANSFORMATIONS ---

    // Parallax (Y-movement)
    const yFast = useTransform(scrollYProgress, [0, 1], [200, -250]);
    const yMedium = useTransform(scrollYProgress, [0, 1], [100, -150]);
    const ySlow = useTransform(scrollYProgress, [0, 1], [0, -80]);

    // EXPAND & CONTRACT (Breathing Scale)
    // Elements will scale UP as they enter the center, and CONTRACT as they leave
    const scaleBreathing = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.8]);

    // Rotation mapping
    const rotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

    // --- ANIMATION LOOPS ---

    // Gentle Hover (Smooth)
    const floatAnim = {
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
        transition: {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
        }
    };

    // Secondary Float (Offset timing)
    const floatAnimDelayed = {
        y: [0, 15, 0],
        rotate: [0, -2, 2, 0],
        transition: {
            duration: 7,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1
        }
    };

    return (
        <section ref={containerRef} className="py-16 md:py-24 lg:py-32 bg-brand-dark overflow-hidden relative min-h-[80vh] lg:min-h-[110vh] flex items-center">
            {/* Dynamic Background Mesh - Removed animate-pulse to prevent massive GPU repaint lag during scrolling */}
            <div className="absolute top-1/2 right-0 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-brand-red/5 rounded-full blur-[120px] md:blur-[180px] pointer-events-none transform -translate-y-1/2 transform-gpu translate-z-0 will-change-transform" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none transform-gpu translate-z-0 will-change-transform" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="z-20 relative"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 lg:mb-8 text-white leading-[1] drop-shadow-2xl">
                        Brand <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500">
                            System.
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-6 md:mb-8 lg:mb-10 max-w-md leading-relaxed">
                        A living identity. Kinetic typography, vibrating color theory, and responsive component architecture.
                    </p>
                    <Link to="/about" className="px-6 py-3 md:px-8 md:py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm md:text-base inline-block">
                        Explore Guidelines
                    </Link>
                </motion.div>

                {/* Parallax Collage Area - HIGH ENERGY */}
                <div className="relative h-[800px] w-full hidden lg:block perspective-[1000px]">

                    {/* -- CENTRAL ANCHOR SCENE -- */}

                    {/* 1. Main Lifestyle Image (Breathing Scale) */}
                    <motion.div
                        style={{ y: ySlow, scale: scaleBreathing }}
                        className="absolute top-[20%] left-[20%] w-[380px] h-[480px] z-10"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800"
                                alt="Brand Lifestyle"
                                width={800}
                                height={1000}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                            />
                            {/* Overlay Grid Line */}
                            <div className="absolute inset-0 border-[0.5px] border-white/20 opacity-30 pointer-events-none grid grid-cols-4 grid-rows-4" />
                        </div>
                    </motion.div>

                    {/* -- NEW ASSETS (SPECIFIC REQUESTS) -- */}

                    {/* 2. Color Palette Strip (Floating) */}
                    <motion.div
                        style={{ y: yFast, x: -40 }}
                        className="absolute top-[10%] left-[-5%] z-30"
                    >
                        <motion.div animate={floatAnim}>
                            <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[#121212] border border-white/10 shadow-xl backdrop-blur-md">
                                <div className="h-12 w-12 rounded-lg bg-[#FF3B30] hover:scale-110 transition-transform" /> { /* Brand Red */}
                                <div className="h-12 w-12 rounded-lg bg-[#1C1C1E] hover:scale-110 transition-transform" /> { /* Dark */}
                                <div className="h-12 w-12 rounded-lg bg-[#E5E5EA] hover:scale-110 transition-transform" /> { /* Light Gray */}
                                <div className="h-12 w-12 rounded-lg bg-[#FFFFFF] hover:scale-110 transition-transform" /> { /* White */}
                                <div className="h-12 w-12 rounded-lg bg-[#32D74B] hover:scale-110 transition-transform" /> { /* Success Green */}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 3. Logo Clear Space Guide */}
                    <motion.div
                        style={{ y: yFast, rotate: 5, scale: scaleBreathing }}
                        className="absolute top-[5%] right-[5%] z-20"
                    >
                        <div className="w-[220px] h-[220px] rounded-2xl bg-[#0a0a0a] border border-dashed border-brand-red/50 relative flex items-center justify-center shadow-2xl">
                            {/* Logo */}
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center z-10 font-bold text-black text-2xl">B</div>

                            {/* Clear Space Markers */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-brand-red text-xs font-mono">x</div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-brand-red text-xs font-mono">x</div>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red text-xs font-mono">x</div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-red text-xs font-mono">x</div>

                            {/* Guide Lines */}
                            <div className="absolute inset-8 border border-white/10" />
                        </div>
                    </motion.div>

                    {/* 4. Logo Stack (Variations) */}
                    <motion.div
                        style={{ y: yMedium, x: 20 }}
                        className="absolute bottom-[20%] left-[5%] z-40"
                    >
                        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                            <div className="relative group">
                                {/* Card 1 (Back) */}
                                <div className="absolute top-4 left-4 w-[160px] h-[100px] bg-white/10 border border-white/5 rounded-xl backdrop-blur-sm transform rotate-6" />
                                {/* Card 2 (Middle) */}
                                <div className="absolute top-2 left-2 w-[160px] h-[100px] bg-white/20 border border-white/10 rounded-xl backdrop-blur-sm transform rotate-3" />
                                {/* Card 3 (Front - Main) */}
                                <div className="relative w-[160px] h-[100px] bg-[#1a1a1a] border border-white/20 rounded-xl flex items-center justify-center shadow-2xl overflow-hidden hover:scale-105 transition-transform">
                                    <img src="/logo.png" alt="Brainvare Logo Variant" className="opacity-80 invert w-3/4 object-contain" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* -- FLOATING ELEMENTS -- */}

                    {/* 5. Typography Matrix */}
                    <motion.div
                        style={{ y: yFast, rotate: -5, scale: scaleBreathing }}
                        className="absolute bottom-[10%] right-[10%] z-30"
                    >
                        <div className="w-[200px] p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-brand-red/50 transition-colors">
                            <div className="space-y-3">
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                                    <span className="text-4xl font-bold text-white">Aa</span>
                                    <span className="text-xs font-mono text-gray-400">Regular</span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                                    <span className="text-4xl font-light text-white font-serif">Aa</span>
                                    <span className="text-xs font-mono text-gray-400">Serif</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-4xl font-black text-white outline-text">Aa</span>
                                    <span className="text-xs font-mono text-gray-400">Bold</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 6. Spacing Spec Guide (Floating) */}
                    <motion.div
                        style={{ x: 60, y: ySlow }}
                        className="absolute top-[40%] right-[-5%] z-20"
                    >
                        <motion.div animate={floatAnimDelayed}>
                            <div className="w-16 h-40 border-l border-r border-brand-red/40 flex flex-col justify-between items-center py-2 bg-brand-red/5 backdrop-blur-sm">
                                <div className="h-[1px] w-full bg-brand-red/40" />
                                <span className="text-[10px] text-brand-red font-mono -rotate-90 whitespace-nowrap">200px</span>
                                <div className="h-[1px] w-full bg-brand-red/40" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 7. Icon Set (Floating) */}
                    <motion.div
                        style={{ y: yMedium, scale: scaleBreathing }}
                        className="absolute top-[35%] left-[5%] z-25"
                    >
                        <motion.div animate={floatAnim}>
                            <div className="grid grid-cols-2 gap-3 p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-md">
                                <div className="p-2 bg-white/10 rounded-lg hover:bg-brand-red transition-colors"><Layers size={20} className="text-white" /></div>
                                <div className="p-2 bg-white/10 rounded-lg hover:bg-brand-red transition-colors"><Grid size={20} className="text-white" /></div>
                                <div className="p-2 bg-white/10 rounded-lg hover:bg-brand-red transition-colors"><MousePointer2 size={20} className="text-white" /></div>
                                <div className="p-2 bg-white/10 rounded-lg hover:bg-brand-red transition-colors"><Search size={20} className="text-white" /></div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                {/* Mobile Static Layout */}
                <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 relative">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400" className="w-full h-full object-cover" alt="Brand identity" width={400} height={500} loading="lazy" />
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border-[0.5px] border-white/20 opacity-30" />
                    </div>
                    <div className="space-y-4">
                        {/* Color Strip Mobile */}
                        <div className="flex gap-2 justify-between">
                            <div className="h-10 w-10 rounded-lg bg-[#FF3B30]" />
                            <div className="h-10 w-10 rounded-lg bg-[#FFFFFF]" />
                            <div className="h-10 w-10 rounded-lg bg-[#1C1C1E]" />
                        </div>
                        {/* Clear Space Mobile */}
                        <div className="w-full aspect-square rounded-xl bg-[#0a0a0a] border border-dashed border-white/20 flex items-center justify-center relative">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">B</div>
                            <span className="absolute top-2 text-[10px] text-gray-500 font-mono">x</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BrandingCollage;
