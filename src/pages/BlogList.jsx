import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { blogPosts, categories } from '../data/blogPosts';

const BlogList = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = useMemo(() => {
        let posts = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(term) ||
                p.tags.some(t => t.toLowerCase().includes(term)) ||
                p.metaDescription.toLowerCase().includes(term)
            );
        }
        return posts;
    }, [activeCategory, searchTerm]);

    const featuredPost = blogPosts.find(p => p.featured);

    return (
        <>
            <SEOHead
                title="AI Marketing Blog | Expert Insights & Strategies — Brainvare"
                description="Explore expert insights on AI tools in marketing, SEO strategies, content automation, and digital growth. In-depth guides from Kerala's leading AI-first creative studio."
                canonical="https://www.brainvare.com/blog"
                ogType="website"
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" />
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-red/30 text-brand-red text-sm font-medium mb-6 tracking-wider uppercase">
                            Blog & Insights
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            AI Marketing <span className="text-brand-red">Intelligence</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Expert insights, in-depth guides, and actionable strategies on AI tools transforming digital marketing. Written by practitioners, not theorists.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div className="relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search articles about AI marketing..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.07] transition-all"
                                id="blog-search"
                            />
                        </div>
                    </motion.div>

                    {/* Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeCategory === cat
                                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                                id={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && activeCategory === 'All' && !searchTerm && (
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to={`/blog/${featuredPost.slug}`} className="block group" id="featured-post">
                            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-red/10 via-purple-500/5 to-transparent border border-white/10 p-8 md:p-12 hover:border-brand-red/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="inline-block px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-xs font-semibold tracking-wider uppercase mb-4">
                                    ⭐ Featured Article
                                </span>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300 leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-400 text-lg mb-6 max-w-3xl leading-relaxed">
                                    {featuredPost.metaDescription}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-2">
                                        <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-8 h-8 rounded-full object-cover" />
                                        {featuredPost.author}
                                    </span>
                                    <span>•</span>
                                    <span>{featuredPost.publishDate}</span>
                                    <span>•</span>
                                    <span>{featuredPost.readTime}</span>
                                    <span>•</span>
                                    <span className="text-brand-red">{featuredPost.category}</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {filteredPosts
                            .filter(p => !(p.featured && activeCategory === 'All' && !searchTerm))
                            .map((post, i) => (
                                <motion.article
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    id={`post-${post.slug}`}
                                >
                                    <Link to={`/blog/${post.slug}`} className="block group h-full">
                                        <div className="h-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-brand-red/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-medium">
                                                    {post.category}
                                                </span>
                                                <span className="text-gray-600 text-xs">{post.readTime}</span>
                                            </div>
                                            <h2 className="text-lg font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300 leading-snug line-clamp-3">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                                                {post.metaDescription}
                                            </p>
                                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                                <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                                                <div>
                                                    <p className="text-white text-sm font-medium">{post.author}</p>
                                                    <p className="text-gray-600 text-xs">{post.publishDate}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {post.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                    </AnimatePresence>
                </div>

                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="mt-4 text-brand-red hover:underline"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </section>
        </>
    );
};

export default BlogList;
