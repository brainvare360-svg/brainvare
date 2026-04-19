import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

const ContentManager = () => {
    const { content, updateSection, updateItem, addItem, removeItem } = useContent();
    const [activeTab, setActiveTab] = useState('hero');

    // Helper to add a new item to an array list
    const handleAddItem = () => {
        const currentList = content[activeTab];
        if (!Array.isArray(currentList)) return;

        const newItem = { ...currentList[0] }; // Clone the structure of the first item
        newItem.id = Date.now().toString(); // Generate a temp ID

        // Clear values
        Object.keys(newItem).forEach(key => {
            if (key !== 'id') newItem[key] = "";
        });

        // We need a way to update the whole list in the context. 
        // Currently context only has updateItem and updateSection.
        // I need to add 'addItem' to context or just update the whole section.
        // Let's assume updateSection can handle replacing the whole array if the content structure allows it.
        // Wait, content[activeTab] IS the array. updateSection(activeTab, newState) usually merges objects.
        // If content[activeTab] is an array, updateSection implementation in Context needs to handle it.
        // Let's check Context implementation: 
        // setContent(prev => ({ ...prev, [sectionKey]: { ...prev[sectionKey], ...newData } })) 
        // This MERGES object properties. It BREAKS arrays if we pass an array as 'newData' because it tries to spread ...prev[sectionKey] (which is iterable) but ...newData (array) into an object? No.

        // Actually, let's look at how updateSection is written:
        // [sectionKey]: { ...prev[sectionKey], ...newData }
        // If prev[sectionKey] is an array, this spreads the array indices into an object! This is WRONG for arrays.
        // We need to fix ContentContext to support replacing arrays.
    };

    // Simple form field renderer
    const renderField = (key, value, onChange) => {
        if (key === 'id') return null; // Don't edit IDs

        // Large text areas for longer content (only if string)
        if (typeof value === 'string' && value.length > 50) {
            return (
                <div key={key} className="mb-4">
                    <label className="block text-gray-400 text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <textarea
                        value={value}
                        onChange={(e) => onChange(key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors h-32"
                    />
                </div>
            );
        }

        return (
            <div key={key} className="mb-4">
                <label className="block text-gray-400 text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => onChange(key, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                />
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Content Manager</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                        <RefreshCw size={16} /> Reset
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 overflow-x-auto pb-1">
                {Object.keys(content).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 whitespace-nowrap px-2 ${activeTab === key ? 'text-red-500 border-red-500' : 'text-gray-400 border-transparent hover:text-white'
                            }`}
                    >
                        {key}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                {Array.isArray(content[activeTab]) ? (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            {/* Placeholder for Add Button - doing this cleanly requires Context update first */}
                        </div>
                        {content[activeTab].map((item, index) => (
                            <div key={item.id} className="p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold text-lg">Item {index + 1}</h3>
                                    {/* Delete button placeholder */}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(item).map(([k, v]) => renderField(k, v, (field, newVal) => {
                                        updateItem(activeTab, item.id, { [field]: newVal });
                                    }))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-2xl">
                        {Object.entries(content[activeTab]).map(([k, v]) => renderField(k, v, (field, newVal) => {
                            updateSection(activeTab, { [field]: newVal });
                        }))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManager;
