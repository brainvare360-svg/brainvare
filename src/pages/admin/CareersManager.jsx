import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Edit3, Save, X, ChevronDown, ChevronUp, Users, Eye, ExternalLink, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { useCareers } from '../../context/CareersContext';

const statusColors = {
    new: 'bg-blue-500/20 text-blue-400',
    reviewing: 'bg-yellow-500/20 text-yellow-400',
    shortlisted: 'bg-green-500/20 text-green-400',
    interviewed: 'bg-purple-500/20 text-purple-400',
    hired: 'bg-emerald-500/20 text-emerald-400',
    rejected: 'bg-red-500/20 text-red-400',
    active: 'bg-green-500/20 text-green-400',
    closed: 'bg-red-500/20 text-red-400',
    draft: 'bg-yellow-500/20 text-yellow-400',
};

const CareersManager = () => {
    const { careersData, addCareer, updateCareer, deleteCareer, applications, updateApplication, deleteApplication } = useCareers();
    const [activeTab, setActiveTab] = useState('jobs');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const [viewingApp, setViewingApp] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterJob, setFilterJob] = useState('all');

    const [newJob, setNewJob] = useState({
        title: '', type: 'Full-time', location: 'Kochi, Kerala',
        description: '', requirements: '', status: 'active'
    });
    const [editJob, setEditJob] = useState({});

    const handleAdd = () => {
        if (!newJob.title || !newJob.description) return;
        addCareer({ ...newJob, requirements: newJob.requirements.split('\n').filter(r => r.trim()) });
        setNewJob({ title: '', type: 'Full-time', location: 'Kochi, Kerala', description: '', requirements: '', status: 'active' });
        setShowAddForm(false);
    };

    const startEdit = (job) => {
        setEditingId(job.id);
        setEditJob({ ...job, requirements: job.requirements.join('\n') });
    };

    const saveEdit = () => {
        updateCareer(editingId, { ...editJob, requirements: editJob.requirements.split('\n').filter(r => r.trim()) });
        setEditingId(null);
    };

    const filteredApps = applications.filter(a => {
        if (filterStatus !== 'all' && a.status !== filterStatus) return false;
        if (filterJob !== 'all' && a.jobId !== filterJob) return false;
        return true;
    });

    const newAppsCount = applications.filter(a => a.status === 'new').length;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Briefcase className="text-brand-red" /> Careers Manager
                    </h1>
                    <p className="text-gray-400 mt-1">{careersData.length} jobs · {applications.length} applications</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white/5 p-1 rounded-lg w-fit">
                <button onClick={() => setActiveTab('jobs')}
                    className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'jobs' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
                    Job Listings
                </button>
                <button onClick={() => setActiveTab('applications')}
                    className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'applications' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
                    Applications
                    {newAppsCount > 0 && <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">{newAppsCount}</span>}
                </button>
            </div>

            {activeTab === 'jobs' ? (
                <>
                    <div className="flex justify-end mb-4">
                        <button onClick={() => setShowAddForm(!showAddForm)}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                            <Plus size={16} /> Add Job
                        </button>
                    </div>

                    {showAddForm && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 space-y-4">
                            <h3 className="text-lg font-bold text-white">New Job Listing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} placeholder="Job Title"
                                    className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                                <select value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                                    className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                </select>
                                <input value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} placeholder="Location"
                                    className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                            </div>
                            <textarea value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} placeholder="Job description..." rows={3}
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                            <textarea value={newJob.requirements} onChange={e => setNewJob({ ...newJob, requirements: e.target.value })} placeholder="Requirements (one per line)" rows={4}
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                            <div className="flex gap-3">
                                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 text-sm"><Save size={14} /> Save</button>
                                <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 text-sm"><X size={14} /> Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {careersData.map(job => (
                            <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                {editingId === job.id ? (
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input value={editJob.title} onChange={e => setEditJob({ ...editJob, title: e.target.value })}
                                                className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                                            <select value={editJob.type} onChange={e => setEditJob({ ...editJob, type: e.target.value })}
                                                className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red">
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Freelance">Freelance</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                            <input value={editJob.location} onChange={e => setEditJob({ ...editJob, location: e.target.value })}
                                                className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                                        </div>
                                        <select value={editJob.status} onChange={e => setEditJob({ ...editJob, status: e.target.value })}
                                            className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red">
                                            <option value="active">Active</option>
                                            <option value="closed">Closed</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                        <textarea value={editJob.description} onChange={e => setEditJob({ ...editJob, description: e.target.value })} rows={3}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" />
                                        <textarea value={editJob.requirements} onChange={e => setEditJob({ ...editJob, requirements: e.target.value })} rows={4}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red" placeholder="Requirements (one per line)" />
                                        <div className="flex gap-3">
                                            <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 text-sm"><Save size={14} /> Save</button>
                                            <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 text-sm"><X size={14} /> Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-base font-bold text-white">{job.title}</h3>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[job.status] || ''}`}>{job.status}</span>
                                                        <span className="text-xs text-gray-500">{applications.filter(a => a.jobId === job.id).length} applicants</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-0.5">{job.type} · {job.location} · Posted {job.postedDate}</p>
                                                </div>
                                                {expandedId === job.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                            </div>
                                            <div className="flex gap-1 ml-4">
                                                <button onClick={() => startEdit(job)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Edit3 size={14} /></button>
                                                <button onClick={() => deleteCareer(job.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                        {expandedId === job.id && (
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <p className="text-gray-400 text-sm mb-3">{job.description}</p>
                                                <h4 className="text-xs font-semibold text-white mb-2 uppercase tracking-wider">Requirements</h4>
                                                <ul className="space-y-1">
                                                    {job.requirements.map((r, i) => (
                                                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                                            <span className="w-1 h-1 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />{r}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {/* Applications Tab */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red">
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select value={filterJob} onChange={e => setFilterJob(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red">
                            <option value="all">All Positions</option>
                            {careersData.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                        </select>
                    </div>

                    {filteredApps.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <Users size={40} className="mx-auto mb-4 opacity-50" />
                            <p>No applications {filterStatus !== 'all' || filterJob !== 'all' ? 'matching filters' : 'yet'}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredApps.map(app => (
                                <div key={app.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-base font-bold text-white">{app.fullName}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[app.status] || 'bg-gray-500/20 text-gray-400'}`}>{app.status}</span>
                                            </div>
                                            <p className="text-sm text-brand-red font-medium">{app.jobTitle}</p>
                                            <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                                                <span className="flex items-center gap-1"><Mail size={11} /> {app.email}</span>
                                                <span className="flex items-center gap-1"><Phone size={11} /> {app.phone}</span>
                                                <span className="flex items-center gap-1"><Clock size={11} /> {new Date(app.appliedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select value={app.status} onChange={e => updateApplication(app.id, { status: e.target.value })}
                                                className="bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-brand-red">
                                                <option value="new">New</option>
                                                <option value="reviewing">Reviewing</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="interviewed">Interviewed</option>
                                                <option value="hired">Hired</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                            <button onClick={() => setViewingApp(viewingApp === app.id ? null : app.id)}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Eye size={14} /></button>
                                            <button onClick={() => deleteApplication(app.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                                        </div>
                                    </div>

                                    {viewingApp === app.id && (
                                        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Current Role</span>
                                                    <p className="text-gray-300">{app.currentRole || '—'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Experience</span>
                                                    <p className="text-gray-300">{app.experience} years</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Availability</span>
                                                    <p className="text-gray-300">{app.availability}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Expected Salary</span>
                                                    <p className="text-gray-300">{app.expectedSalary || '—'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">How They Heard</span>
                                                    <p className="text-gray-300">{app.howDidYouHear || '—'}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Portfolio</span>
                                                    <p><a href={app.portfolio} target="_blank" rel="noreferrer" className="text-brand-red hover:underline flex items-center gap-1">{app.portfolio} <ExternalLink size={12} /></a></p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Resume</span>
                                                    <p><a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-brand-red hover:underline flex items-center gap-1">{app.resumeLink} <ExternalLink size={12} /></a></p>
                                                </div>
                                                {app.linkedin && (
                                                    <div>
                                                        <span className="text-xs text-gray-500 uppercase tracking-wider">LinkedIn</span>
                                                        <p><a href={app.linkedin} target="_blank" rel="noreferrer" className="text-brand-red hover:underline flex items-center gap-1">{app.linkedin} <ExternalLink size={12} /></a></p>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Cover Letter</span>
                                                    <p className="text-gray-300 whitespace-pre-wrap">{app.coverLetter}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CareersManager;
