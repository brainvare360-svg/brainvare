'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    const scrollToContact = (e) => {
        e.preventDefault();
        if (pathname === '/') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/');
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    };

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
            subItems: [
                { name: 'Strategic Consulting', path: '/services' },
                { name: 'AI Implementation', path: '/services' },
                { name: 'Web & App Dev', path: '/services' },
                { name: 'Performance Marketing', path: '/services' },
            ]
        },
        {
            name: 'Work',
            path: '/work',
            subItems: [
                { name: 'Selected Case Studies', path: '/work' },
                { name: 'Showreels', path: '/' },
                { name: 'Client Roster', path: '/work' },
            ]
        },
        {
            name: 'About',
            path: '/about',
            subItems: [
                { name: 'Our Story', path: '/about' },
                { name: 'Leadership Team', path: '/about' },
                { name: 'Careers', path: '/careers' },
            ]
        },
        {
            name: 'Blog',
            path: '/blog',
            subItems: [
                { name: 'AI Marketing Tools', path: '/blog' },
                { name: 'SEO & AEO', path: '/blog' },
                { name: 'Content Strategy', path: '/blog' },
                { name: 'All Articles', path: '/blog' },
            ]
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
                aria-label="Main navigation"
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="z-50 text-2xl font-bold tracking-tighter text-white flex items-center" aria-label="Brainvare — Go to homepage">
                        <img src="/logo.png" alt="Brainvare" width={120} height={32} className="h-6 sm:h-7 md:h-8 w-auto object-contain" />
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
                                    href={link.path}
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
                                                        href={sub.path}
                                                        className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                                                    >
                                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{sub.name}</span>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                        <button
                            onClick={scrollToContact}
                            className="px-6 py-2 text-sm font-medium bg-white text-black hover:bg-brand-red hover:text-white transition-all duration-300 rounded-full cursor-pointer"
                        >
                            Let's Talk
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
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
                                    href={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-bold text-white hover:text-brand-red transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={(e) => { setIsMobileMenuOpen(false); scrollToContact(e); }}
                                className="mt-4 px-8 py-3 text-lg font-bold bg-white text-black rounded-full hover:bg-brand-red hover:text-white transition-all cursor-pointer"
                            >
                                Let's Talk
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
