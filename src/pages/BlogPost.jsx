import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getPostBySlug(slug);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (!post) {
            navigate('/blog');
            return;
        }
        window.scrollTo(0, 0);
    }, [post, navigate, slug]);

    // Table of Contents scroll spy
    useEffect(() => {
        if (!post) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        post.tableOfContents.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [post, slug]);

    if (!post) return null;

    const relatedPosts = getRelatedPosts(slug, 3);

    const breadcrumbs = [
        { name: 'Home', url: 'https://www.brainvare.com/' },
        { name: 'Blog', url: 'https://www.brainvare.com/blog' },
        { name: post.title, url: `https://www.brainvare.com/blog/${post.slug}` },
    ];

    return (
        <>
            <SEOHead
                title={post.metaTitle}
                description={post.metaDescription}
                canonical={`https://www.brainvare.com/blog/${post.slug}`}
                ogType="article"
                keywords={post.tags.join(', ')}
                ogImage={post.ogImage || 'https://www.brainvare.com/logo.png'}
                article={{
                    title: post.title,
                    description: post.metaDescription,
                    author: post.author,
                    authorRole: post.authorRole,
                    datePublished: post.publishDate,
                    category: post.category,
                    keywords: post.tags.join(', '),
                    wordCount: post.content.split(/\s+/).length,
                }}
                breadcrumbs={breadcrumbs}
                faq={post.faq}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" />
                <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[150px]" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    {/* Breadcrumbs */}
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 text-sm text-gray-500 mb-8"
                        aria-label="Breadcrumb"
                    >
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-sm font-medium">
                                {post.category}
                            </span>
                            <span className="text-gray-500 text-sm">{post.readTime}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight" id="post-title">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-red/20" />
                                <div>
                                    <p className="text-white font-medium">{post.author}</p>
                                    <p className="text-gray-500 text-sm">{post.authorRole}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Published {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content + Sidebar */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="flex gap-12 lg:gap-20 relative">
                    {/* Sticky Table of Contents — Desktop */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-32">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Table of Contents</h4>
                            <nav className="space-y-1">
                                {post.tableOfContents.map(item => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className={`block py-1.5 pl-4 text-sm border-l-2 transition-all duration-200 ${
                                            activeSection === item.id
                                                ? 'border-brand-red text-white font-medium'
                                                : 'border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/30'
                                        }`}
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </nav>

                            {/* Tags */}
                            <div className="mt-10">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <article className="flex-1 min-w-0 max-w-3xl">
                        {/* Mobile TOC */}
                        <div className="lg:hidden mb-10 p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                            <h4 className="text-sm font-semibold text-white mb-3">📑 Table of Contents</h4>
                            <nav className="space-y-2">
                                {post.tableOfContents.map(item => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="block text-sm text-gray-400 hover:text-brand-red transition-colors"
                                    >
                                        → {item.title}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Article Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="prose-custom"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* FAQ Section rendered */}
                        {post.faq && post.faq.length > 0 && (
                            <div className="mt-4 space-y-6">
                                {post.faq.map((item, i) => (
                                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-3">{item.question}</h3>
                                        <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Author Box */}
                        <div className="mt-16 p-8 bg-white/[0.03] border border-white/10 rounded-2xl">
                            <div className="flex items-start gap-5">
                                <img src={post.authorImage} alt={post.author} className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-red/20 shrink-0" />
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">{post.author}</h4>
                                    <p className="text-brand-red text-sm mb-3">{post.authorRole}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed">{post.authorBio}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 p-8 bg-gradient-to-br from-brand-red/10 to-purple-500/5 border border-brand-red/20 rounded-2xl text-center">
                            <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform Your Marketing with AI?</h3>
                            <p className="text-gray-400 mb-6 max-w-lg mx-auto">Let Brainvare's AI-first team build marketing systems that deliver measurable results. Book a free strategy call today.</p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-semibold rounded-full hover:bg-red-600 transition-colors"
                                id="cta-contact"
                            >
                                Get Started
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                    </article>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="border-t border-white/10 pt-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(rp => (
                                <Link key={rp.slug} to={`/blog/${rp.slug}`} className="block group" id={`related-${rp.slug}`}>
                                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-brand-red/30 hover:bg-white/[0.05] transition-all duration-300 h-full flex flex-col">
                                        <span className="text-xs text-brand-red font-medium mb-3">{rp.category}</span>
                                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-red transition-colors leading-snug line-clamp-2">
                                            {rp.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow">{rp.metaDescription}</p>
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-sm text-gray-600">
                                            <span>{rp.author}</span>
                                            <span>•</span>
                                            <span>{rp.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default BlogPost;
