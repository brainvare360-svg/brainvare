import React, { useState, useRef, useEffect } from 'react';
import { useReels } from '../../context/ReelsContext';
import {
    Film,
    Instagram,
    Save,
    RefreshCw,
    Search,
    ExternalLink,
    Check,
    Edit3,
    X,
    Link as LinkIcon,
    ChevronDown,
    ChevronUp,
    AlertCircle
} from 'lucide-react';

// Extract a short display name from the long video filename
const getVideoDisplayName = (videoPath) => {
    const filename = videoPath.split('/').pop();
    // Trim the "SaveClip.App_" prefix and ".mp4" suffix, show first 30 chars
    const name = filename.replace('SaveClip.App_', '').replace('.mp4', '');
    return name.length > 30 ? name.substring(0, 30) + '…' : name;
};

// Inline edit row for a single reel
const ReelRow = ({ reel, index, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localLink, setLocalLink] = useState(reel.instagram);
    const inputRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        setLocalLink(reel.instagram);
    }, [reel.instagram]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        onSave(index, localLink);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLocalLink(reel.instagram);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const linkChanged = localLink !== reel.instagram;

    return (
        <div className={`group bg-[#111] border rounded-xl p-4 transition-all hover:border-white/20 ${isEditing ? 'border-red-500/40 ring-1 ring-red-500/20' : 'border-white/5'}`}>
            <div className="flex items-start gap-4">
                {/* Video Thumbnail */}
                <div className="relative w-16 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 border border-white/10">
                    <video
                        ref={videoRef}
                        src={reel.video}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                        onLoadedMetadata={(e) => {
                            e.target.currentTime = 0.5;
                        }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded font-mono">
                        #{index + 1}
                    </div>
                </div>

                {/* Info & Edit */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <Film size={14} className="text-gray-500 flex-shrink-0" />
                        <span className="text-xs text-gray-500 font-mono truncate" title={reel.video}>
                            {getVideoDisplayName(reel.video)}
                        </span>
                    </div>

                    {isEditing ? (
                        <div className="space-y-2">
                            <div className="relative">
                                <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
                                <input
                                    ref={inputRef}
                                    type="url"
                                    value={localLink}
                                    onChange={(e) => setLocalLink(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="https://www.instagram.com/reel/..."
                                    className={`w-full bg-black border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors ${
                                        localLink && !isValidUrl(localLink) 
                                            ? 'border-red-500/50 focus:border-red-500' 
                                            : 'border-white/10 focus:border-white/30'
                                    }`}
                                />
                                {localLink && !isValidUrl(localLink) && (
                                    <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                                        <AlertCircle size={12} />
                                        Invalid URL format
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={localLink && !isValidUrl(localLink)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-xs font-medium transition-colors text-white"
                                >
                                    <Check size={14} />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors text-gray-400"
                                >
                                    <X size={14} />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <a
                                href={reel.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-300 hover:text-pink-400 transition-colors truncate min-w-0"
                                title={reel.instagram}
                            >
                                <Instagram size={14} className="flex-shrink-0 text-pink-500/60" />
                                <span className="truncate">{reel.instagram}</span>
                                <ExternalLink size={12} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Edit Button */}
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex-shrink-0 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                        title="Edit Link"
                    >
                        <Edit3 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ReelsManager = () => {
    const { reelsData, updateReelLink, resetReels } = useReels();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [syncSuccess, setSyncSuccess] = useState(false);

    const forceSyncToCloud = async () => {
        setSyncing(true);
        setSyncSuccess(false);
        try {
            await setDoc(doc(db, 'siteData', 'reels'), { items: reelsData });
            setSyncSuccess(true);
            setTimeout(() => setSyncSuccess(false), 3000);
        } catch (error) {
            console.error('Sync failed:', error);
            alert('Failed to sync to cloud. Check console for details.');
        } finally {
            setSyncing(false);
        }
    };

    const filteredReels = reelsData.filter((reel, index) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            reel.instagram.toLowerCase().includes(term) ||
            reel.video.toLowerCase().includes(term) ||
            `#${index + 1}`.includes(term)
        );
    });

    // Show first 10 by default, all when expanded or searching
    const displayedReels = (showAll || searchTerm) ? filteredReels : filteredReels.slice(0, 10);
    const hasMore = !showAll && !searchTerm && filteredReels.length > 10;

    const totalReels = reelsData.length;
    const linkedReels = reelsData.filter(r => r.instagram && r.instagram.trim() !== '').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Reels Manager</h1>
                    <p className="text-gray-400">Manage Instagram links for your ReelsWall videos</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={forceSyncToCloud}
                        disabled={syncing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            syncSuccess
                                ? 'bg-green-600/20 border border-green-500/30 text-green-400'
                                : 'bg-brand-red/10 hover:bg-brand-red/20 border border-brand-red/30 text-brand-red hover:text-white'
                        }`}
                    >
                        {syncing ? (
                            <><RefreshCw size={16} className="animate-spin" /> Syncing...</>
                        ) : syncSuccess ? (
                            <><Check size={16} /> Synced!</>
                        ) : (
                            <><Save size={16} /> Force Sync to Cloud</>
                        )}
                    </button>
                    <button
                        onClick={resetReels}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <RefreshCw size={16} />
                        Reset to Defaults
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <Film size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{totalReels}</p>
                            <p className="text-xs text-gray-500">Total Reels</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#111] border border-pink-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-lg">
                            <Instagram size={20} className="text-pink-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{linkedReels}</p>
                            <p className="text-xs text-gray-500">With Links</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <LinkIcon size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{totalReels - linkedReels}</p>
                            <p className="text-xs text-gray-500">Missing Links</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by link, video name, or reel number (#1, #2...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                />
            </div>

            {/* Reels List */}
            {displayedReels.length === 0 ? (
                <div className="bg-[#111] border border-white/5 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Film size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No reels found</h3>
                    <p className="text-gray-500">Try adjusting your search term.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {displayedReels.map((reel, displayIndex) => {
                        // Find the actual index in the full array
                        const actualIndex = reelsData.indexOf(reel);
                        return (
                            <ReelRow
                                key={actualIndex}
                                reel={reel}
                                index={actualIndex}
                                onSave={updateReelLink}
                            />
                        );
                    })}
                </div>
            )}

            {/* Show More / Less */}
            {hasMore && (
                <button
                    onClick={() => setShowAll(true)}
                    className="w-full py-3 text-sm font-medium text-gray-400 hover:text-white bg-[#111] border border-white/5 rounded-xl hover:border-white/10 transition-all flex items-center justify-center gap-2"
                >
                    <ChevronDown size={16} />
                    Show All {filteredReels.length} Reels
                </button>
            )}
            {showAll && !searchTerm && filteredReels.length > 10 && (
                <button
                    onClick={() => setShowAll(false)}
                    className="w-full py-3 text-sm font-medium text-gray-400 hover:text-white bg-[#111] border border-white/5 rounded-xl hover:border-white/10 transition-all flex items-center justify-center gap-2"
                >
                    <ChevronUp size={16} />
                    Show Less
                </button>
            )}
        </div>
    );
};

export default ReelsManager;
