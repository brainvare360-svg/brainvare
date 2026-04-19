import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Globe, Rocket, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Services = () => {
    const categories = [
        {
            title: "Strategic Consulting",
            icon: Brain,
            description: "Navigating the AI revolution requires a map. We build yours.",
            items: ["AI Readiness Assessment", "Digital Transformation Strategy", "Tech Stack Optimization", "Data Architecture"]
        },
        {
            title: "AI Implementation",
            icon: Rocket,
            description: "From chatbots to predictive models, we deploy intelligence.",
            items: ["Custom LLM Integration", "RAG Systems", "Automated Workflows", "Intelligent Agents"]
        },
        {
            title: "Web & App Development",
            icon: Code,
            description: "High-performance digital products built for the future.",
            items: ["Next.js Applications", "React Native Mobile Apps", "WebGL Experiences", "Enterprise Platforms"]
        },
        {
            title: "Performance Marketing",
            icon: Globe,
            description: "Data-driven growth engines that scale with precision.",
            items: ["SEO & AEO", "Programmatic Ad Buying", "Conversion Rate Optimization", "Analytics & Reporting"]
        }
    ];

    return (
        <>
            <SEOHead
                title="AI-Powered Services | Strategy, Development & Marketing — Brainvare"
                description="Explore Brainvare's full-stack AI services: strategic consulting, custom LLM integration, RAG systems, Next.js development, React Native apps, SEO, AEO, and performance marketing."
                canonical="https://www.brainvare.com/services"
                keywords="AI consulting services, LLM integration, RAG systems development, Next.js development agency, React Native app development, SEO services Kerala, AEO optimization, digital transformation consulting"
                breadcrumbs={[
                    { name: 'Home', url: 'https://www.brainvare.com/' },
                    { name: 'Services', url: 'https://www.brainvare.com/services' }
                ]}
                customSchema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Brainvare Services",
                    "description": "End-to-end AI-powered services for digital transformation",
                    "url": "https://www.brainvare.com/services",
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Strategic Consulting", "description": "AI readiness assessment, digital transformation strategy, tech stack optimization, data architecture" },
                            { "@type": "ListItem", "position": 2, "name": "AI Implementation", "description": "Custom LLM integration, RAG systems, automated workflows, intelligent agents" },
                            { "@type": "ListItem", "position": 3, "name": "Web & App Development", "description": "Next.js applications, React Native mobile apps, WebGL experiences, enterprise platforms" },
                            { "@type": "ListItem", "position": 4, "name": "Performance Marketing", "description": "SEO & AEO, programmatic ad buying, conversion rate optimization, analytics & reporting" }
                        ]
                    }
                }}
            />
            <section className="min-h-screen bg-black text-white pt-32 pb-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mb-24"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                        Our <span className="text-brand-red">Expertise</span>.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        We don't just offer services; we provide end-to-end capabilities to transform your business into an AI-first powerhouse.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group border-t border-white/20 pt-12"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <cat.icon className="w-12 h-12 text-brand-red mb-6" />
                                <ArrowRight className="w-6 h-6 -rotate-45 text-gray-500 group-hover:text-white group-hover:rotate-0 transition-all duration-300" />
                            </div>

                            <h3 className="text-3xl font-bold mb-4">{cat.title}</h3>
                            <p className="text-gray-400 mb-8 max-w-md">{cat.description}</p>

                            <ul className="space-y-4">
                                {cat.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center text-sm font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default Services;
