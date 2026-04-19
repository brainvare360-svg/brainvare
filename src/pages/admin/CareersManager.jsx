import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Edit3, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCareers } from '../../context/CareersContext';

const CareersManager = () => {
    const { careersData, addCareer, updateCareer, deleteCareer } = useCareers();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const [newJob, setNewJob] = useState({
        title: '', type: 'Full-time', location: 'Kochi, Kerala',
        description: '', requirements: '', status: 'active'
    });
    const [editJob, setEditJob] = useState({});

    const handleAdd = () => {
        if (!newJob.title || !newJob.description) return;
        addCareer({
            ...newJob,
            requirements: newJob.requirements.split('\n').filter(r => r.trim())
        });
        setNewJob({ title: '', type: 'Full-time', location: 'Kochi, Kerala', description: '', requirements: '', status: 'active' });
        setShowAddForm(false);
    };

    const startEdit = (job) => {
        setEditingId(job.id);
        setEditJob({ ...job, requirements: job.requirements.join('\n') });
    };

    const saveEdit = () => {
        updateCareer(editingId, {
            ...editJob,
            requirements: editJob.requirements.split('\n').filter(r => r.trim())
        });
        setEditingId(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Briefcase className="text-brand-red" /> Careers Manager
                    </h1>
                    <p className="text-gray-400 mt-1">{careersData.length} job listing{careersData.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Plus size={18} /> Add Job
                </button>
            </div>

            {showAddForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2">New Job Listing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            value={newJob.title}
                            onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                            placeholder="Job Title"
                            className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                        />
                        <select
                            value={newJob.type}
                            onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                            className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <input
                            value={newJob.location}
                            onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                            placeholder="Location"
                            className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                        />
                    </div>
                    <textarea
                        value={newJob.description}
                        onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                        placeholder="Job description..."
                        rows={3}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                    />
                    <textarea
                        value={newJob.requirements}
                        onChange={e => setNewJob({ ...newJob, requirements: e.target.value })}
                        placeholder="Requirements (one per line)"
                        rows={4}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                    />
                    <div className="flex gap-3">
                        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700">
                            <Save size={16} /> Save Job
                        </button>
                        <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                            <X size={16} /> Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {careersData.map(job => (
                    <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        {editingId === job.id ? (
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        value={editJob.title}
                                        onChange={e => setEditJob({ ...editJob, title: e.target.value })}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                                    />
                                    <select
                                        value={editJob.type}
                                        onChange={e => setEditJob({ ...editJob, type: e.target.value })}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                    <input
                                        value={editJob.location}
                                        onChange={e => setEditJob({ ...editJob, location: e.target.value })}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                                    />
                                </div>
                                <select
                                    value={editJob.status}
                                    onChange={e => setEditJob({ ...editJob, status: e.target.value })}
                                    className="bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                                >
                                    <option value="active">Active</option>
                                    <option value="closed">Closed</option>
                                    <option value="draft">Draft</option>
                                </select>
                                <textarea
                                    value={editJob.description}
                                    onChange={e => setEditJob({ ...editJob, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                                />
                                <textarea
                                    value={editJob.requirements}
                                    onChange={e => setEditJob({ ...editJob, requirements: e.target.value })}
                                    placeholder="Requirements (one per line)"
                                    rows={4}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-red"
                                />
                                <div className="flex gap-3">
                                    <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700">
                                        <Save size={16} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                                        <X size={16} /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                    job.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                    job.status === 'closed' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>{job.status}</span>
                                            </div>
                                            <p className="text-sm text-gray-400 mt-0.5">{job.type} · {job.location}</p>
                                        </div>
                                        {expandedId === job.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button onClick={() => startEdit(job)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => deleteCareer(job.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                {expandedId === job.id && (
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <p className="text-gray-400 text-sm mb-3">{job.description}</p>
                                        <h4 className="text-xs font-semibold text-white mb-2 uppercase tracking-wider">Requirements</h4>
                                        <ul className="space-y-1">
                                            {job.requirements.map((r, i) => (
                                                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-brand-red mt-2 flex-shrink-0" />
                                                    {r}
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
        </div>
    );
};

export default CareersManager;
