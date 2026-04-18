import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight, HelpCircle,
    // Commonly used service icons — add more here if your CMS uses them
    Brain, Code, Globe, Rocket, Palette, Zap, Search, Bot,
    BarChart3, TrendingUp, Layout, Layers, Database, Shield,
    Smartphone, Monitor, PenTool, Lightbulb, Target, Users
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';

// Targeted icon map — only the icons that are actually used get bundled
const ICON_MAP = {
    Brain, Code, Globe, Rocket, Palette, Zap, Search, Bot,
    BarChart3, TrendingUp, Layout, Layers, Database, Shield,
    Smartphone, Monitor, PenTool, Lightbulb, Target, Users,
    HelpCircle
};

const getIcon = (iconName) => {
    if (React.isValidElement(iconName)) return iconName;
    const IconComponent = ICON_MAP[iconName] || HelpCircle;
    return <IconComponent className="w-8 h-8" />;
};

const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    // Only assign video src on first hover — zero network cost before interaction
    const handleMouseEnter = () => {
        setIsHovered(true);
        const vid = videoRef.current;
        if (vid && !vid.src) {
            vid.src = service.video || 'https://cdn.pixabay.com/video/2023/10/12/184734-874284566_large.mp4';
        }
        vid?.play().catch(() => {});
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        videoRef.current?.pause();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative h-[280px] md:h-[320px] rounded-xl md:rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer w-full transition-all duration-500 hover:scale-[1.02] hover:border-white/20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Dynamic Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Video Background — src assigned only on hover */}
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay"
                />

                {/* Gradient Overlay for Color Tinting */}
                <div className={`absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-red/20 transition-all duration-500 ${isHovered ? 'opacity-90' : 'opacity-100'}`} />

                {/* Active Light Gradient Mesh on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
            </div>

            <div className="relative z-10 flex flex-col h-full p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-start mb-auto">
                    <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,100,0,0.3)]">
                        <div className="text-white [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8">
                            {getIcon(service.icon)}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.5,
                            rotate: isHovered ? 0 : -45
                        }}
                        className="p-2 rounded-full bg-white text-brand-dark shadow-lg"
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                </div>

                <div className="mt-6 md:mt-8">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-red-100 group-hover:to-white transition-all duration-300">
                        {service.title}
                    </h3>

                    <div className="relative overflow-hidden">
                        <motion.div
                            animate={{ height: isHovered ? "auto" : "50px" }}
                            className="transition-all duration-500 ease-out"
                        >
                            <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-colors duration-300">
                                {service.description}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
                                <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 tracking-wide">
                                    {service.detail}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Glowing Border */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-red-500/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
        </motion.div>
    );
};

const Services = () => {
    const { content } = useContent();
    const services = content.services || [];

    return (
        <section id="services" className="py-16 md:py-24 bg-brand-dark relative z-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="mb-10 md:mb-20 md:flex justify-between items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-white">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Expertise.</span>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed"
                        >
                            Melding creative vision with bleeding-edge technology.
                        </motion.p>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="hidden md:block mt-8 md:mt-0 px-8 py-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium tracking-wide"
                    >
                        View All Services
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="px-8 py-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium">
                        View All Services
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;
