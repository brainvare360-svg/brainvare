import React from 'react';
import { motion } from 'framer-motion';

const Agency = () => {
    return (
        <section className="min-h-screen bg-black text-white pt-32 pb-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24"
                >
                    <div className="text-brand-red font-mono text-sm tracking-widest uppercase mb-6">About Us</div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl">
                        Constructing the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Post-Digital Reality.</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
                    <div className="text-2xl text-gray-300 leading-relaxed space-y-8">
                        <p>
                            Brainvare was born from a simple observation: The gap between "technically possible" and "commercially viable" is closing faster than most businesses can realize.
                        </p>
                        <p>
                            We aren't a traditional agency. We are a collective of rogue engineers, high-end designers, and strategic futurists who believe that AI is not a tool, but a fundamental substrate for the next generation of business.
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-24"
                >
                    <h2 className="text-4xl font-bold mb-16">The Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
                        {[
                            { name: 'Arun AG', role: 'Founder', photo: '/team/arun.png' },
                            { name: 'Anila G Nair', role: 'Co-Founder', photo: '/team/anila.png' }
                        ].map((person, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="aspect-[3/4] bg-[#1a1a1a] rounded-xl mb-6 overflow-hidden relative border border-white/10">
                                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                                <h3 className="text-xl font-bold">{person.name}</h3>
                                <div className="text-brand-red font-mono text-xs uppercase mt-1 tracking-widest">{person.role}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Agency;
