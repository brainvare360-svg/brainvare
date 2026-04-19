import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const projects = [
    {
        title: "Neon Horizon",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        video: "https://cdn.pixabay.com/video/2023/10/12/184734-874284566_large.mp4"
    },
    {
        title: "Cyber Pulse",
        category: "Brand Identity",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
        video: "https://cdn.pixabay.com/video/2023/02/22/151765-801264380_large.mp4"
    },
    {
        title: "Future Audio",
        category: "App Design",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        video: "https://cdn.pixabay.com/video/2021/11/14/95689-645856453_large.mp4"
    },
    {
        title: "Apex Logistics",
        category: "AI Solution",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
        video: "https://cdn.pixabay.com/video/2020/06/18/42456-432297920_large.mp4"
    }
];

const ProjectCard = ({ project, index }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Play failed", e));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />

            {/* Background Image (fades out on hover) */}
            <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Background Video */}
            <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-brand-red font-medium mb-2 block">{project.category}</span>
                        <h3 className="text-3xl font-bold text-white leading-tight">{project.title}</h3>
                    </div>
                    <div className="p-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ParallaxColumn = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Shifts the column up/down relative to scroll for depth effect
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <motion.div ref={ref} style={{ y }} className="flex flex-col gap-12 mt-12">
            {children}
        </motion.div>
    );
};

const Work = () => {
    return (
        <>
            <SEOHead
                title="Our Work | AI-Driven Projects & Case Studies — Brainvare"
                description="Explore Brainvare's portfolio of AI-driven projects — web development, brand identity, app design, and AI solutions. See how we've transformed businesses with cutting-edge technology."
                canonical="https://www.brainvare.com/work"
                keywords="AI project portfolio, web development case studies, brand identity design, app design portfolio, AI solutions showcase, digital agency portfolio Kerala"
                breadcrumbs={[
                    { name: 'Home', url: 'https://www.brainvare.com/' },
                    { name: 'Work', url: 'https://www.brainvare.com/work' }
                ]}
                customSchema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Selected Work — Brainvare",
                    "description": "A collection of cutting-edge AI-driven projects",
                    "url": "https://www.brainvare.com/work"
                }}
            />
            <section id="work" className="py-32 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                <div
                    className="flex flex-col md:flex-row justify-between items-end mb-16"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Selected Work</h2>
                        <p className="text-gray-400">
                            A collection of our most recent cutting-edge projects. Hover to preview.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        See all projects <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                {/* Desktop Parallax Layout */}
                <div className="hidden md:grid grid-cols-2 gap-8 items-start">
                    {/* Left Column - Static/Slower */}
                    <div className="flex flex-col gap-12">
                        {projects.filter((_, i) => i % 2 === 0).map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>

                    {/* Right Column - Parallax/Faster */}
                    <ParallaxColumn>
                        {projects.filter((_, i) => i % 2 === 1).map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </ParallaxColumn>
                </div>

                {/* Mobile Layout (Standard Grid) */}
                <div className="grid md:hidden grid-cols-1 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        See all projects <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
        </>
    );
};

export default Work;
