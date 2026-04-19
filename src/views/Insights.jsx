import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const articles = [
    {
        category: "AI Trends",
        title: "The Death of SEO as We Know It",
        date: "Oct 12, 2024",
        readTime: "5 min read"
    },
    {
        category: "Engineering",
        title: "Building RAG Systems for Enterprise",
        date: "Sep 28, 2024",
        readTime: "8 min read"
    },
    {
        category: "Design",
        title: "UI Patterns for Generative Interfaces",
        date: "Sep 15, 2024",
        readTime: "6 min read"
    },
    {
        category: "Strategy",
        title: "Why Your First AI Hire Should Be a Generalist",
        date: "Aug 30, 2024",
        readTime: "4 min read"
    }
];

const Insights = () => {
    return (
        <section className="min-h-screen bg-black text-white pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
                            Insights.
                        </h1>
                        <p className="text-xl text-gray-400">
                            Thoughts on the intersection of design, technology, and culture.
                        </p>
                    </motion.div>

                    <div className="hidden md:flex gap-4">
                        {['All', 'AI', 'Design', 'Strategy'].map((tag, i) => (
                            <button key={i} className={`px-4 py-2 rounded-full border ${i === 0 ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:text-white'} transition-colors`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group border-t border-white/10 py-12 hover:bg-white/5 transition-colors -mx-6 px-6 cursor-pointer"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                                <div className="md:w-1/4 text-brand-red font-mono text-sm uppercase tracking-wider">{article.category}</div>
                                <div className="md:w-1/2">
                                    <h3 className="text-3xl md:text-4xl font-bold group-hover:translate-x-4 transition-transform duration-300">{article.title}</h3>
                                </div>
                                <div className="md:w-1/4 flex items-center justify-end gap-8 text-gray-500 font-mono text-sm">
                                    <span>{article.date}</span>
                                    <span>{article.readTime}</span>
                                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Insights;
