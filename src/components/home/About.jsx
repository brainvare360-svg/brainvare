import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const About = () => {
    // 3D Tilt Logic
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="about" className="py-16 md:py-24 lg:py-32 bg-brand-dark overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20 items-center">

                    {/* Left Side: Content */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-brand-red font-mono text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                                <span className="w-6 md:w-10 h-[1px] bg-brand-red"></span> The Agency
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 lg:mb-8 leading-[1.1] text-white">
                                We don't just adapt to the future. <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                                    We create it.
                                </span>
                            </h2>
                            <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed mb-8 md:mb-10 lg:mb-12 max-w-xl">
                                Brainvare is a collective of designers, engineers, and strategists obsessed with the bleeding edge. We leverage Artificial Intelligence to supercharge human creativity.
                            </p>

                            <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 lg:gap-y-12 gap-x-4 md:gap-x-6 lg:gap-x-8">
                                {[
                                    { value: "50+", label: "Global Clients" },
                                    { value: "120+", label: "Projects Delivered" },
                                    { value: "400%", label: "ROI Average" },
                                    { value: "24/7", label: "AI Support" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        className="relative pl-4 md:pl-6 border-l border-white/10"
                                    >
                                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
                                        <div className="text-xs md:text-sm font-mono text-brand-red/80 uppercase tracking-wider">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Interactive 3D Card */}
                    <div className="w-full lg:w-1/2 flex justify-center perspective-[1000px] mt-8 lg:mt-0">
                        <motion.div
                            ref={ref}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: "spring" }}
                            viewport={{ once: true }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md aspect-square rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 shadow-2xl cursor-pointer group"
                        >
                            {/* Inner 3D Layer */}
                            <div
                                style={{ transform: "translateZ(50px)" }}
                                className="absolute inset-4 sm:inset-6 md:inset-8 rounded-xl md:rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 via-transparent to-blue-500/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                                <div className="text-center relative z-10">
                                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/10 tracking-tighter group-hover:text-white/30 transition-colors duration-500 select-none">
                                        FUTURE<br />READY
                                    </div>
                                    <div className="w-12 md:w-16 h-1 bg-brand-red mx-auto mt-4 md:mt-6 rounded-full group-hover:w-24 md:group-hover:w-32 transition-all duration-500" />
                                </div>
                            </div>

                            {/* Glowing Orb */}
                            <div
                                style={{ transform: "translateZ(20px)" }}
                                className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-brand-red/30 rounded-full blur-[80px] group-hover:bg-brand-red/50 transition-colors duration-500 pointer-events-none"
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
