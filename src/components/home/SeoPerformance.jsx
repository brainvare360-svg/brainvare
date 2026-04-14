import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bot, Share2, Zap, ArrowUpRight, TrendingUp, Network, Globe } from 'lucide-react';

const SeoPerformance = () => {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-brand-dark relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-16 lg:mb-20 max-w-3xl"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white tracking-tight">
                        Future-Proof <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Discovery Engine.
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed">
                        Beyond traditional SEO. We build ecosystems for the age of AI search, voice assistants, and omni-channel dominance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">

                    {/* Card 1: SEO - FIXED LAYOUT & COMPLEX GRAPH */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative h-[320px] sm:h-[350px] md:h-[420px] rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-pointer hover:border-blue-500/30 transition-all duration-500 flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                        </div>

                        {/* Top: Visual Area (No Overlap) */}
                        <div className="h-[60%] relative p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                            <div className="w-full h-full relative flex items-end justify-between px-4 pb-4">
                                {/* Bar Chart */}
                                {[30, 50, 45, 70, 60, 90, 80].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: "10%" }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                                        className="w-[10%] bg-blue-500/20 rounded-t-sm relative group-hover:bg-blue-500/60 transition-colors"
                                    >
                                        <div className="absolute top-0 w-full h-[2px] bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                    </motion.div>
                                ))}
                                {/* Trend Line Overlay */}
                                <svg className="absolute inset-x-4 bottom-4 h-full w-auto pointer-events-none opacity-60 overflow-visible">
                                    <motion.path
                                        d="M0,150 C20,120 40,140 60,100 C80,110 100,50 120,80 C140,20 160,40 180,10"
                                        fill="none"
                                        stroke="url(#gradientBlue)"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Bottom: Content Area */}
                        <div className="h-[40%] px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 flex flex-col justify-end relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex justify-between items-center mb-2 md:mb-4">
                                <Search className="text-blue-400 w-6 h-6 md:w-8 md:h-8 p-1 md:p-1.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors" />
                                <TrendingUp className="text-green-400 w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0" />
                            </div>
                            <h4 className="text-[10px] md:text-xs font-mono text-blue-400 mb-1 md:mb-2 tracking-widest">FOUNDATION</h4>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Technical SEO</h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Precision engineering for Google's ever-evolving algorithms.</p>
                        </div>
                    </motion.div>

                    {/* Card 2: AEO - AI GENERATION SIMULATION */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative h-[320px] sm:h-[350px] md:h-[420px] rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-pointer hover:border-purple-500/30 transition-all duration-500 flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                        </div>

                        <div className="h-[60%] relative p-8 flex flex-col justify-center space-y-4 group-hover:scale-105 transition-transform duration-500">
                            {/* AI Processing Nodes */}
                            <div className="flex justify-center gap-4 mb-4">
                                {[1, 2, 3].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                        className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                                    />
                                ))}
                            </div>
                            {/* Typing Lines */}
                            <div className="space-y-3 px-4">
                                <motion.div animate={{ width: ["0%", "100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="h-2 bg-purple-500/40 rounded-full" />
                                <motion.div animate={{ width: ["0%", "80%", "80%"] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 1 }} className="h-2 bg-purple-500/20 rounded-full w-3/4" />
                                <motion.div animate={{ width: ["0%", "60%", "60%"] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity, repeatDelay: 1 }} className="h-2 bg-purple-500/20 rounded-full w-1/2" />
                            </div>
                            {/* Tags */}
                            <div className="flex gap-2 justify-center pt-2">
                                <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300">Generative</span>
                                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400">Contextual</span>
                            </div>
                        </div>

                        <div className="h-[40%] px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 flex flex-col justify-end relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                            <Zap className="text-purple-400 w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-4 p-1 md:p-1.5 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors" />
                            <h4 className="text-[10px] md:text-xs font-mono text-purple-400 mb-1 md:mb-2 tracking-widest">NEW ERA</h4>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">AEO & AI Search</h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Optimization for Perplexity, ChatGPT, and the Gemini era.</p>
                        </div>
                    </motion.div>

                    {/* Card 3: AI Agents - NETWORK VISUALIZATION */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative h-[320px] sm:h-[350px] md:h-[420px] rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-pointer hover:border-green-500/30 transition-all duration-500 flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                        </div>

                        <div className="h-[60%] relative p-8 group-hover:scale-105 transition-transform duration-500">
                            {/* Neural Network Nodes */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    {/* Central Hub */}
                                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-green-500/10 rounded-full border border-green-500/30 flex items-center justify-center">
                                        <Bot className="text-green-400 w-8 h-8" />
                                    </motion.div>
                                    {/* Satellites */}
                                    {[0, 1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                x: [0, Math.cos(i) * 30, 0],
                                                y: [0, Math.sin(i) * 30, 0],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{ duration: 3, delay: i, repeat: Infinity }}
                                            className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full"
                                            style={{ marginLeft: Math.cos(i * 1.57) * 60, marginTop: Math.sin(i * 1.57) * 60 }}
                                        />
                                    ))}
                                    {/* Connection Lines (Simulated with absolute divs for simplicity) */}
                                    <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-green-500/20 -translate-x-1/2 rotate-45" />
                                    <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-green-500/20 -translate-x-1/2 -rotate-45" />
                                </div>
                            </div>
                        </div>

                        <div className="h-[40%] px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 flex flex-col justify-end relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                            <Network className="text-green-400 w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-4 p-1 md:p-1.5 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors" />
                            <h4 className="text-[10px] md:text-xs font-mono text-green-400 mb-1 md:mb-2 tracking-widest">AUTOMATION</h4>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">AI Agents</h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Intelligent bots that capture leads and automate support 24/7.</p>
                        </div>
                    </motion.div>

                    {/* Card 4: Omni-Channel - CONSTELLATION MAP */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative h-[320px] sm:h-[350px] md:h-[420px] rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-pointer hover:border-orange-500/30 transition-all duration-500 flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                        </div>

                        <div className="h-[60%] relative p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                            {/* Constellation / Globe */}
                            <div className="relative w-48 h-48 border border-white/5 rounded-full flex items-center justify-center">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} className="absolute inset-0 border border-dashed border-orange-500/30 rounded-full" />
                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, ease: "linear", repeat: Infinity }} className="absolute inset-8 border border-dotted border-orange-500/20 rounded-full" />

                                {/* Central Node */}
                                <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(255,165,0,0.8)] z-10" />

                                {/* Orbiting Nodes */}
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, ease: "linear", repeat: Infinity }} className="absolute w-full h-full">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full" />
                                </motion.div>
                            </div>
                        </div>

                        <div className="h-[40%] px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 flex flex-col justify-end relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                            <Share2 className="text-orange-400 w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-4 p-1 md:p-1.5 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors" />
                            <h4 className="text-[10px] md:text-xs font-mono text-orange-400 mb-1 md:mb-2 tracking-widest">ECOSYSTEM</h4>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Omni-Channel</h3>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Unified brand presence across Search, Social, and Voice.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SeoPerformance;
