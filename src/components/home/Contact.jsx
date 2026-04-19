import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { useEnquiries } from '../../context/EnquiriesContext';

const Contact = () => {
    const { addEnquiry } = useEnquiries();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        // Simulate a slight delay for UX
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            console.log('Contact form: submitting enquiry...', formData);
            const result = addEnquiry({
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'No Subject',
                message: formData.message
            });
            console.log('Contact form: enquiry submitted, result:', result);

            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-brand-dark">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-6 lg:mb-8 text-white">
                            Let's build <br /> <span className="text-brand-red">something epic.</span>
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-10 lg:mb-12 max-w-lg">
                            Ready to take your brand to the next level? We are accepting new projects for Q4 2026.
                        </p>

                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-start gap-3 md:gap-4">
                                <div className="p-2.5 md:p-3 bg-white/5 rounded-full text-brand-red">
                                    <Mail size={20} className="md:hidden" />
                                    <Mail size={24} className="hidden md:block" />
                                </div>
                                <div>
                                    <p className="text-base md:text-lg font-bold text-white">Email Us</p>
                                    <p className="text-gray-400 text-sm md:text-base">care@brainvare.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 md:gap-4">
                                <div className="p-2.5 md:p-3 bg-white/5 rounded-full text-brand-red">
                                    <Phone size={20} className="md:hidden" />
                                    <Phone size={24} className="hidden md:block" />
                                </div>
                                <div>
                                    <p className="text-base md:text-lg font-bold text-white">Call Us</p>
                                    <p className="text-gray-400 text-sm md:text-base">+91 80750 98869</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 md:gap-4">
                                <div className="p-2.5 md:p-3 bg-white/5 rounded-full text-brand-red">
                                    <MapPin size={20} className="md:hidden" />
                                    <MapPin size={24} className="hidden md:block" />
                                </div>
                                <div>
                                    <p className="text-base md:text-lg font-bold text-white">Visit Us</p>
                                    <p className="text-gray-400 text-sm md:text-base">Infopark, Kochi, Kerala, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 bg-white/5 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-white/10">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                    <CheckCircle size={48} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                                <p className="text-gray-400 max-w-sm">
                                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                                        placeholder="Project Inquiry"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
