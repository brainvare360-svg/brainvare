import React, { useState, useRef, useCallback } from 'react';
import { usePages } from '../../context/PagesContext';
import {
    FileText,
    Save,
    RefreshCw,
    Eye,
    Edit3,
    Search,
    Globe,
    Clock,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    Image,
    Heading1,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Quote,
    Code,
    Undo,
    Redo,
    X,
    Check,
    ExternalLink
} from 'lucide-react';

// Rich Text Editor Toolbar Button
const ToolbarButton = ({ icon: Icon, label, onClick, active }) => (
    <button
        onClick={onClick}
        title={label}
        className={`p-2 rounded-lg transition-colors ${active ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
    >
        <Icon size={16} />
    </button>
);

// Rich Text Editor Component
const RichTextEditor = ({ content, onChange }) => {
    const editorRef = useRef(null);

    const execCommand = useCallback((command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    }, [onChange]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            execCommand('insertImage', url);
        }
    };

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-1 pr-3 border-r border-white/10">
                    <ToolbarButton icon={Undo} label="Undo" onClick={() => execCommand('undo')} />
                    <ToolbarButton icon={Redo} label="Redo" onClick={() => execCommand('redo')} />
                </div>

                <div className="flex items-center gap-1 px-3 border-r border-white/10">
                    <ToolbarButton icon={Heading1} label="Heading 1" onClick={() => execCommand('formatBlock', 'h1')} />
                    <ToolbarButton icon={Heading2} label="Heading 2" onClick={() => execCommand('formatBlock', 'h2')} />
                    <ToolbarButton icon={Heading3} label="Heading 3" onClick={() => execCommand('formatBlock', 'h3')} />
                </div>

                <div className="flex items-center gap-1 px-3 border-r border-white/10">
                    <ToolbarButton icon={Bold} label="Bold" onClick={() => execCommand('bold')} />
                    <ToolbarButton icon={Italic} label="Italic" onClick={() => execCommand('italic')} />
                    <ToolbarButton icon={Underline} label="Underline" onClick={() => execCommand('underline')} />
                </div>

                <div className="flex items-center gap-1 px-3 border-r border-white/10">
                    <ToolbarButton icon={AlignLeft} label="Align Left" onClick={() => execCommand('justifyLeft')} />
                    <ToolbarButton icon={AlignCenter} label="Align Center" onClick={() => execCommand('justifyCenter')} />
                    <ToolbarButton icon={AlignRight} label="Align Right" onClick={() => execCommand('justifyRight')} />
                </div>

                <div className="flex items-center gap-1 px-3 border-r border-white/10">
                    <ToolbarButton icon={List} label="Bullet List" onClick={() => execCommand('insertUnorderedList')} />
                    <ToolbarButton icon={ListOrdered} label="Numbered List" onClick={() => execCommand('insertOrderedList')} />
                    <ToolbarButton icon={Quote} label="Quote" onClick={() => execCommand('formatBlock', 'blockquote')} />
                </div>

                <div className="flex items-center gap-1 px-3">
                    <ToolbarButton icon={Link} label="Insert Link" onClick={insertLink} />
                    <ToolbarButton icon={Image} label="Insert Image" onClick={insertImage} />
                    <ToolbarButton icon={Code} label="Code Block" onClick={() => execCommand('formatBlock', 'pre')} />
                </div>
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: content }}
                className="min-h-[400px] p-6 text-white focus:outline-none prose prose-invert max-w-none 
                    prose-headings:text-white prose-headings:font-bold
                    prose-h1:text-4xl prose-h1:mb-4
                    prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
                    prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
                    prose-p:text-gray-300 prose-p:mb-4 prose-p:leading-relaxed
                    prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-300
                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-300
                    prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-brand-red prose-blockquote:pl-4 prose-blockquote:italic
                    prose-pre:bg-white/5 prose-pre:p-4 prose-pre:rounded-lg prose-pre:text-sm
                    prose-code:text-brand-red prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
                    "
                style={{ lineHeight: '1.8' }}
            />
        </div>
    );
};

// Page Card Component
const PageCard = ({ page, isActive, onClick }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 rounded-xl transition-all ${isActive
                ? 'bg-red-600/10 border border-red-600/30'
                : 'bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-red-600/20' : 'bg-white/5'}`}>
                    <FileText size={18} className={isActive ? 'text-red-500' : 'text-gray-500'} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${isActive ? 'text-red-400' : 'text-white'}`}>
                        {page.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{page.slug}</p>
                    {page.lastUpdated && (
                        <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                            <Clock size={10} />
                            {formatDate(page.lastUpdated)}
                        </p>
                    )}
                </div>
            </div>
        </button>
    );
};

// Main Pages Manager Component
const PagesManager = () => {
    const { pages, getAllPages, updatePage, updatePageContent, updatePageSeo, resetPages, fetchPages } = usePages();

    React.useEffect(() => {
        fetchPages();
    }, []);
    const [activePage, setActivePage] = useState('home');
    const [activeTab, setActiveTab] = useState('content'); // content, seo
    const [searchTerm, setSearchTerm] = useState('');
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [localContent, setLocalContent] = useState('');
    const [localSeo, setLocalSeo] = useState({ metaTitle: '', metaDescription: '' });

    const currentPage = pages[activePage];

    // Initialize local state when page changes
    React.useEffect(() => {
        if (currentPage) {
            setLocalContent(currentPage.content || '');
            setLocalSeo(currentPage.seo || { metaTitle: '', metaDescription: '' });
            setUnsavedChanges(false);
        }
    }, [activePage, currentPage]);

    const handleContentChange = (content) => {
        setLocalContent(content);
        setUnsavedChanges(true);
    };

    const handleSeoChange = (field, value) => {
        setLocalSeo(prev => ({ ...prev, [field]: value }));
        setUnsavedChanges(true);
    };

    const handleSave = () => {
        updatePageContent(activePage, localContent);
        updatePageSeo(activePage, localSeo);
        setUnsavedChanges(false);
    };

    const handleDiscard = () => {
        if (window.confirm('Discard unsaved changes?')) {
            setLocalContent(currentPage.content || '');
            setLocalSeo(currentPage.seo || { metaTitle: '', metaDescription: '' });
            setUnsavedChanges(false);
        }
    };

    const filteredPages = getAllPages().filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex gap-6 h-[calc(100vh-140px)]">
            {/* Sidebar - Page List */}
            <div className="w-72 flex-shrink-0 flex flex-col">
                <div className="mb-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                    {filteredPages.map(page => (
                        <PageCard
                            key={page.id}
                            page={page}
                            isActive={activePage === page.id}
                            onClick={() => {
                                if (unsavedChanges) {
                                    if (window.confirm('You have unsaved changes. Discard them?')) {
                                        setActivePage(page.id);
                                    }
                                } else {
                                    setActivePage(page.id);
                                }
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={resetPages}
                    className="mt-4 w-full py-2.5 text-sm text-gray-500 hover:text-red-400 transition-colors border border-white/5 rounded-lg hover:border-red-600/20"
                >
                    Reset All Pages
                </button>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            {currentPage?.title}
                            {unsavedChanges && (
                                <span className="text-xs font-normal text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                                    Unsaved
                                </span>
                            )}
                        </h1>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Globe size={14} />
                            {currentPage?.slug}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {unsavedChanges && (
                            <button
                                onClick={handleDiscard}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors text-gray-400"
                            >
                                <X size={16} />
                                Discard
                            </button>
                        )}
                        <a
                            href={currentPage?.slug}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors text-gray-400"
                        >
                            <Eye size={16} />
                            Preview
                        </a>
                        <button
                            onClick={handleSave}
                            disabled={!unsavedChanges}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unsavedChanges
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-[#111] p-1 rounded-lg w-fit">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'content'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Edit3 size={14} className="inline mr-2" />
                        Content
                    </button>
                    <button
                        onClick={() => setActiveTab('seo')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'seo'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Search size={14} className="inline mr-2" />
                        SEO Settings
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'content' ? (
                        <RichTextEditor
                            content={localContent}
                            onChange={handleContentChange}
                        />
                    ) : (
                        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={localSeo.metaTitle}
                                    onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                                    placeholder="Page title for search engines"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    {localSeo.metaTitle.length}/60 characters recommended
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={localSeo.metaDescription}
                                    onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                                    placeholder="Brief description for search engine results"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    {localSeo.metaDescription.length}/160 characters recommended
                                </p>
                            </div>

                            {/* SEO Preview */}
                            <div className="border-t border-white/10 pt-6">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Search Preview</h3>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-blue-600 text-lg font-medium truncate">
                                        {localSeo.metaTitle || 'Page Title'}
                                    </p>
                                    <p className="text-green-700 text-sm">
                                        brainvare.com{currentPage?.slug}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                        {localSeo.metaDescription || 'Add a meta description to improve click-through rates from search results.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PagesManager;
