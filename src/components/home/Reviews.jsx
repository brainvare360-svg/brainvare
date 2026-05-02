import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
    {
        text: "Brainvare transformed our digital presence completely. The AI integration they suggested increased our leads by 300%.",
        author: "John Kurian",
        role: ""
    },
    {
        text: "The most professional creative team we've worked with. The design quality is simply world-class.",
        author: "Akhila G",
        role: ""
    },
    {
        text: "Speed, efficiency, and stunning aesthetics. Brainvare delivered a website that truly represents our premium brand.",
        author: "Sadhiqq Sulaiman",
        role: ""
    }
];

const Reviews = () => {
    return (
        <section className="py-16 md:py-24 bg-brand-dark relative border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Client Success Stories</h2>
            </div>

            <div className="overflow-hidden">
                <div className="flex gap-8 px-6 animate-scroll mask-gradient">
                    {/* Simple horizontal scroll or just a grid for now if marquee is complex without tailwind plugin */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full container mx-auto">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="bg-white/5 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border border-white/10 hover:border-brand-red/30 transition-colors"
                            >
                                <div className="text-brand-red text-2xl md:text-4xl mb-3 md:mb-6 font-serif">"</div>
                                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-8 italic leading-relaxed">
                                    {review.text}
                                </p>
                                <div>
                                    <div className="font-bold text-white">{review.author}</div>
                                    {review.role && <div className="text-sm text-gray-400">{review.role}</div>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
