'use client'

import React from 'react';
import Link from 'next/link';
import { useContent } from '../../context/ContentContext';
import { useEnquiries } from '../../context/EnquiriesContext';
import { BarChart3, Users, Briefcase, ArrowUpRight, MessageSquare, Mail, Clock, ArrowRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, highlight }) => (
    <div className={`bg-[#111] border rounded-2xl p-6 hover:border-white/10 transition-all group ${highlight ? 'border-blue-500/30' : 'border-white/5'}`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl transition-colors ${highlight ? 'bg-blue-500/10' : 'bg-white/5 group-hover:bg-red-600/10'}`}>
                <Icon size={24} className={highlight ? 'text-blue-400' : 'text-gray-400 group-hover:text-red-500 transition-colors'} />
            </div>
            {trend && (
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={12} /> {trend}
                </span>
            )}
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
);

const RecentEnquiryItem = ({ enquiry }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${enquiry.status === 'new' ? 'bg-blue-500/5 border border-blue-500/20' : 'bg-white/[0.02] hover:bg-white/[0.04]'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${enquiry.status === 'new' ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                <Mail size={18} className={enquiry.status === 'new' ? 'text-blue-400' : 'text-gray-500'} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white truncate">{enquiry.name}</h4>
                    {enquiry.status === 'new' && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">New</span>
                    )}
                </div>
                <p className="text-sm text-gray-500 truncate">{enquiry.subject || 'No Subject'}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                <Clock size={12} />
                {formatDate(enquiry.createdAt)}
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const { content } = useContent();
    const { enquiries, getStats } = useEnquiries();

    const stats = getStats();
    const recentEnquiries = enquiries.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    {/* Actions could go here */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="New Enquiries"
                    value={stats.new}
                    icon={MessageSquare}
                    highlight={stats.new > 0}
                />
                <StatCard
                    title="Total Enquiries"
                    value={stats.total}
                    icon={Mail}
                />
                <StatCard
                    title="Active Services"
                    value={content.services?.length || 0}
                    icon={Briefcase}
                />
                <StatCard
                    title="Team Members"
                    value="12"
                    icon={Users}
                />
            </div>

            {/* Recent Enquiries */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Recent Enquiries</h2>
                    <Link href="/admin/enquiries"
                        className="text-sm text-brand-red hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                        View All <ArrowRight size={14} />
                    </Link>
                </div>

                {recentEnquiries.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Mail size={24} className="text-gray-600" />
                        </div>
                        <p className="text-gray-500">No enquiries yet</p>
                        <p className="text-sm text-gray-600">When someone submits the contact form, it will appear here.</p>
                    </div>
                ) : (
                    <div className="p-4 space-y-2">
                        {recentEnquiries.map(enquiry => (
                            <RecentEnquiryItem key={enquiry.id} enquiry={enquiry} />
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Setup */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">Quick Setup</h2>
                <p className="text-gray-400 mb-6">Local Storage Persistence is active. Any changes you make here will be saved to your browser and reflected on the main site immediately.</p>

                <div className="p-4 bg-red-900/10 border border-red-600/20 rounded-lg text-red-200 text-sm">
                    <strong>Note:</strong> Clearing your browser cache will reset these changes.
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
