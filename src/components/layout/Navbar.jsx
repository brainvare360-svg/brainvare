import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            name: 'Services',
            path: '/services',
            subItems: ['Strategic Consulting', 'AI Implementation', 'Web & App Dev', 'Performance Marketing']
        },
        {
            name: 'Work',
            path: '/work',
            subItems: ['Selected Case Studies', 'Showreels 2024', 'Client Roster', 'Awards & Recognition']
        },
        {
            name: 'Agency',
            path: '/about',
            subItems: ['Our Story', 'Leadership Team', 'Careers', 'Press & Media']
        },
        {
            name: 'Insights',
            path: '/insights',
            subItems: ['Latest Articles', 'Trend Reports', 'Whitepapers', 'Newsletter']
        },
        {
            name: 'Blog',
            path: '/blog',
            subItems: ['AI Marketing Tools', 'SEO & AEO', 'Content Strategy', 'All Articles']
        },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="z-50 text-2xl font-bold tracking-tighter text-white flex items-center">
                        <img src="/logo.png" alt="Brainvare" className="h-6 sm:h-7 md:h-8 w-auto object-contain" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 h-full">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-4"
                                >
                                    {link.name}
                                </Link>

                                {/* Premium Dropdown */}
                                <AnimatePresence>
                                    {activeDropdown === link.name && link.subItems && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, rotateX: -10 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            exit={{ opacity: 0, y: 10, rotateX: -10 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ transformOrigin: "top center" }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
                                        >
                                            <div className="flex flex-col">
                                                {link.subItems.map((sub, i) => (
                                                    <Link
                                                        key={i}
                                                        to={link.path}
                                                        className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                                                    >
                                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{sub}</span>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                        <a
                            href="/#contact"
                            className="px-6 py-2 text-sm font-medium bg-white text-black hover:bg-brand-red hover:text-white transition-all duration-300 rounded-full"
                        >
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-brand-dark flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-bold text-white hover:text-brand-red transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="/#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-4 px-8 py-3 text-lg font-bold bg-white text-black rounded-full hover:bg-brand-red hover:text-white transition-all"
                            >
                                Let's Talk
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
