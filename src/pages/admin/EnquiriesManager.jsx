import React, { useState } from 'react';
import { useEnquiries } from '../../context/EnquiriesContext';
import {
    Mail,
    Trash2,
    Eye,
    CheckCheck,
    MessageSquare,
    Clock,
    Search,
    Filter,
    X,
    User,
    Calendar
} from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        read: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        replied: 'bg-green-500/10 text-green-400 border-green-500/20'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.new}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const EnquiryCard = ({ enquiry, onView, onMarkRead, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`bg-[#111] border rounded-xl p-5 transition-all hover:border-white/20 ${enquiry.status === 'new' ? 'border-blue-500/30' : 'border-white/5'
            }`}>
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white truncate">{enquiry.name}</h3>
                        <StatusBadge status={enquiry.status} />
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                        <Mail size={14} />
                        {enquiry.email}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onView(enquiry)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    {enquiry.status === 'new' && (
                        <button
                            onClick={() => onMarkRead(enquiry.id)}
                            className="p-2 bg-white/5 hover:bg-blue-500/10 rounded-lg transition-colors text-gray-400 hover:text-blue-400"
                            title="Mark as Read"
                        >
                            <CheckCheck size={16} />
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(enquiry.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="mb-3">
                <p className="text-sm font-medium text-gray-300 mb-1">{enquiry.subject}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{enquiry.message}</p>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                {formatDate(enquiry.createdAt)}
            </div>
        </div>
    );
};

const EnquiryModal = ({ enquiry, onClose, onMarkRead, onMarkReplied }) => {
    if (!enquiry) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-white/10 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-white">{enquiry.subject || 'No Subject'}</h2>
                            <StatusBadge status={enquiry.status} />
                        </div>
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Calendar size={14} />
                            {formatDate(enquiry.createdAt)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center">
                            <User size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{enquiry.name}</h3>
                            <a href={`mailto:${enquiry.email}`} className="text-sm text-brand-red hover:underline">
                                {enquiry.email}
                            </a>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Message</h4>
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{enquiry.message}</p>
                    </div>
                </div>

                <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
                    {enquiry.status === 'new' && (
                        <button
                            onClick={() => onMarkRead(enquiry.id)}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <CheckCheck size={16} />
                            Mark as Read
                        </button>
                    )}
                    {enquiry.status !== 'replied' && (
                        <button
                            onClick={() => onMarkReplied(enquiry.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <Mail size={16} />
                            Mark as Replied
                        </button>
                    )}
                    <a
                        href={`mailto:${enquiry.email}?subject=Re: ${enquiry.subject || 'Your Enquiry'}`}
                        className="px-4 py-2 bg-brand-red hover:bg-red-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <Mail size={16} />
                        Reply via Email
                    </a>
                </div>
            </div>
        </div>
    );
};

const EnquiriesManager = () => {
    const { enquiries, updateEnquiryStatus, deleteEnquiry, getStats, clearAllEnquiries } = useEnquiries();
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const stats = getStats();

    const filteredEnquiries = enquiries.filter(enquiry => {
        const matchesSearch =
            enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || enquiry.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const handleView = (enquiry) => {
        setSelectedEnquiry(enquiry);
        if (enquiry.status === 'new') {
            updateEnquiryStatus(enquiry.id, 'read');
        }
    };

    const handleMarkRead = (id) => {
        updateEnquiryStatus(id, 'read');
    };

    const handleMarkReplied = (id) => {
        updateEnquiryStatus(id, 'replied');
        setSelectedEnquiry(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            deleteEnquiry(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Enquiries</h1>
                    <p className="text-gray-400">Manage contact form submissions</p>
                </div>
                {enquiries.length > 0 && (
                    <button
                        onClick={clearAllEnquiries}
                        className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 border border-red-600/20 rounded-lg text-sm font-medium text-red-400 transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <MessageSquare size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.total}</p>
                            <p className="text-xs text-gray-500">Total</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#111] border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Mail size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.new}</p>
                            <p className="text-xs text-gray-500">New</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <Eye size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.read}</p>
                            <p className="text-xs text-gray-500">Read</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#111] border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCheck size={20} className="text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.replied}</p>
                            <p className="text-xs text-gray-500">Replied</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search enquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-500" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                    </select>
                </div>
            </div>

            {/* Enquiries List */}
            {filteredEnquiries.length === 0 ? (
                <div className="bg-[#111] border border-white/5 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No enquiries found</h3>
                    <p className="text-gray-500">
                        {searchTerm || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter.'
                            : 'When someone submits the contact form, their enquiry will appear here.'}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredEnquiries.map(enquiry => (
                        <EnquiryCard
                            key={enquiry.id}
                            enquiry={enquiry}
                            onView={handleView}
                            onMarkRead={handleMarkRead}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            {selectedEnquiry && (
                <EnquiryModal
                    enquiry={selectedEnquiry}
                    onClose={() => setSelectedEnquiry(null)}
                    onMarkRead={handleMarkRead}
                    onMarkReplied={handleMarkReplied}
                />
            )}
        </div>
    );
};

export default EnquiriesManager;
