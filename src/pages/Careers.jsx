import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { useCareers } from '../context/CareersContext';

const Careers = () => {
    const { careersData } = useCareers();
    const activeJobs = careersData.filter(job => job.status === 'active');

    return (
        <section className="min-h-screen bg-black text-white pt-32 pb-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-16"
                >
                    <div className="text-brand-red font-mono text-sm tracking-widest uppercase mb-6">Careers</div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                        Join the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-purple-500">Creative Force.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                        We're always looking for talented people who are passionate about video production, design, and storytelling. Come build something epic with us.
                    </p>
                </motion.div>

                {activeJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Briefcase size={48} className="mx-auto mb-6 text-gray-600" />
                        <h3 className="text-2xl font-bold mb-3">No Open Positions</h3>
                        <p className="text-gray-400">Check back soon — we're always growing.</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {activeJobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-brand-red/50 hover:bg-white/[0.07] transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-brand-red transition-colors">{job.title}</h3>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            <span className="flex items-center gap-1.5 text-sm text-gray-400">
                                                <Clock size={14} /> {job.type}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-sm text-gray-400">
                                                <MapPin size={14} /> {job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href={`mailto:care@brainvare.com?subject=Application: ${job.title}&body=Hi, I'm interested in the ${job.title} position.%0A%0APlease find my portfolio/resume attached.`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm md:text-base whitespace-nowrap"
                                    >
                                        Apply Now <ArrowRight size={16} />
                                    </a>
                                </div>
                                <p className="text-gray-400 mb-4">{job.description}</p>
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Requirements</h4>
                                    <ul className="space-y-1.5">
                                        {job.requirements.map((req, idx) => (
                                            <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                                <span className="text-brand-red mt-1.5 w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-white/5 border border-white/10 rounded-2xl text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Don't see a role that fits?</h3>
                    <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                        We're always open to hearing from exceptional talent. Drop us your portfolio and resume.
                    </p>
                    <a
                        href="mailto:care@brainvare.com?subject=General Application&body=Hi, I'd like to explore career opportunities at Brainvare."
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-colors"
                    >
                        Send Your Portfolio <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Careers;
