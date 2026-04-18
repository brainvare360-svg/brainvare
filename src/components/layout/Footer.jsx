import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-dark pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 lg:mb-16">
                    <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
                        <div className="mb-2">
                            <img src="/logo.png" alt="Brainvare" className="h-7 md:h-8 w-auto object-contain" />
                        </div>
                        <p className="text-gray-400 max-w-xs text-sm md:text-base">
                            AI-First Creative, Production & Performance Studio. Building digital experiences that matter.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Explore</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {['Services', 'Work', 'Agency', 'Blog', 'Careers'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm md:text-base">
                                        {item}
                                        <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Contact</h4>
                        <div className="space-y-3 md:space-y-4 text-gray-400 text-sm md:text-base">
                            <p>hello@brainvare.com</p>
                            <p>+91 987 654 3210</p>
                            <p>Kochi, Kerala, India</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Socials</h4>
                        <div className="flex space-x-3 md:space-x-4">
                            <a href="#" className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-brand-red hover:text-white transition-all">
                                <Linkedin size={18} className="md:hidden" />
                                <Linkedin size={20} className="hidden md:block" />
                            </a>
                            <a href="#" className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-brand-red hover:text-white transition-all">
                                <Twitter size={18} className="md:hidden" />
                                <Twitter size={20} className="hidden md:block" />
                            </a>
                            <a href="#" className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-brand-red hover:text-white transition-all">
                                <Instagram size={18} className="md:hidden" />
                                <Instagram size={20} className="hidden md:block" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-white/5 text-xs md:text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Brainvare. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
