import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Briefcase, X, CheckCircle, Loader2, Upload, Link as LinkIcon } from 'lucide-react';
import { useCareers } from '../context/CareersContext';
import SEOHead from '../components/SEOHead';

const ApplicationForm = ({ job, onClose }) => {
    const { addApplication } = useCareers();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [form, setForm] = useState({
        fullName: '', email: '', phone: '', currentRole: '',
        experience: '', portfolio: '', linkedin: '',
        coverLetter: '', resumeLink: '', availability: 'Immediately',
        expectedSalary: '', howDidYouHear: ''
    });

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 800));
        addApplication({
            ...form,
            jobId: job.id,
            jobTitle: job.title,
            appliedDate: new Date().toISOString(),
            status: 'new'
        });
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-start justify-center overflow-y-auto p-4 md:p-8"
            data-lenis-prevent
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl my-4 relative"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10">
                    <X size={20} />
                </button>

                <div className="p-6 md:p-8 border-b border-white/10">
                    <div className="text-brand-red font-mono text-xs uppercase tracking-widest mb-2">Apply for Position</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{job.title}</h2>
                    <div className="flex gap-3 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
                        <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                    </div>
                </div>

                {isSuccess ? (
                    <div className="p-8 md:p-12 text-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} className="text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Application Submitted!</h3>
                        <p className="text-gray-400 mb-6 max-w-sm mx-auto">Thank you for your interest. Our team will review your application and get back to you within 3-5 business days.</p>
                        <button onClick={onClose} className="px-6 py-3 bg-brand-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors">
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name *</label>
                                <input name="fullName" value={form.fullName} onChange={handleChange} required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="Your full name" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email *</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="you@email.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone *</label>
                                <input name="phone" value={form.phone} onChange={handleChange} required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="+91 XXXXX XXXXX" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Current Role</label>
                                <input name="currentRole" value={form.currentRole} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="e.g. Senior Video Editor" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Years of Experience *</label>
                                <select name="experience" value={form.experience} onChange={handleChange} required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors">
                                    <option value="">Select</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5-8">5-8 years</option>
                                    <option value="8+">8+ years</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Availability</label>
                                <select name="availability" value={form.availability} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors">
                                    <option value="Immediately">Immediately</option>
                                    <option value="2 weeks">2 weeks notice</option>
                                    <option value="1 month">1 month notice</option>
                                    <option value="2 months">2 months notice</option>
                                    <option value="3+ months">3+ months</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><LinkIcon size={12} /> Portfolio / Showreel URL *</label>
                                <input name="portfolio" value={form.portfolio} onChange={handleChange} required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="https://your-portfolio.com" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><LinkIcon size={12} /> LinkedIn</label>
                                <input name="linkedin" value={form.linkedin} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="https://linkedin.com/in/yourname" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Upload size={12} /> Resume / CV Link *</label>
                                <input name="resumeLink" value={form.resumeLink} onChange={handleChange} required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="Google Drive / Dropbox link" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Expected Salary (Monthly ₹)</label>
                                <input name="expectedSalary" value={form.expectedSalary} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                                    placeholder="e.g. ₹40,000" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Cover Letter / Why Brainvare? *</label>
                            <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} required rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                                placeholder="Tell us why you'd be a great fit and what excites you about this role..." />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">How did you hear about us?</label>
                            <select name="howDidYouHear" value={form.howDidYouHear} onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors">
                                <option value="">Select</option>
                                <option value="Instagram">Instagram</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Google">Google Search</option>
                                <option value="Referral">Referral</option>
                                <option value="Website">Website</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <button type="submit" disabled={isSubmitting}
                            className="w-full py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base">
                            {isSubmitting ? (
                                <><Loader2 size={20} className="animate-spin" /> Submitting...</>
                            ) : (
                                <>Submit Application <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
};

const Careers = () => {
    const { careersData, fetchCareers } = useCareers();
    const activeJobs = careersData.filter(job => job.status === 'active');
    const [applyingJob, setApplyingJob] = useState(null);

    useEffect(() => {
        fetchCareers();
    }, []);

    return (
        <>
            <SEOHead
                title="Careers at Brainvare | Join Our AI-First Creative Team"
                description="Join Brainvare — we're hiring talented designers, engineers, and strategists passionate about AI, video production, and cutting-edge technology. Explore open positions in Kochi, Kerala."
                canonical="https://www.brainvare.com/careers"
                keywords="jobs at Brainvare, AI agency careers Kerala, creative jobs Kochi, video editor jobs, web developer jobs India, AI engineer careers"
                breadcrumbs={[
                    { name: 'Home', url: 'https://www.brainvare.com/' },
                    { name: 'Careers', url: 'https://www.brainvare.com/careers' }
                ]}
            />
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
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
                                            <span className="flex items-center gap-1.5 text-sm text-gray-400"><Clock size={14} /> {job.type}</span>
                                            <span className="flex items-center gap-1.5 text-sm text-gray-400"><MapPin size={14} /> {job.location}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setApplyingJob(job)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm md:text-base whitespace-nowrap"
                                    >
                                        Apply Now <ArrowRight size={16} />
                                    </button>
                                </div>
                                <p className="text-gray-400 mb-4">{job.description}</p>
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Requirements</h4>
                                    <ul className="space-y-1.5">
                                        {job.requirements.map((req, idx) => (
                                            <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-brand-red mt-2 flex-shrink-0" />
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
                    <a href="mailto:care@brainvare.com?subject=General Application"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-colors">
                        Send Your Portfolio <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>

            <AnimatePresence>
                {applyingJob && <ApplicationForm job={applyingJob} onClose={() => setApplyingJob(null)} />}
            </AnimatePresence>
        </section>
        </>
    );
};

export default Careers;
