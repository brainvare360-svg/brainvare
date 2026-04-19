'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Layers, Briefcase, Settings, LogOut, ExternalLink, MessageSquare, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: MessageSquare, label: 'Enquiries', path: '/admin/enquiries' },
        { icon: FileText, label: 'Pages', path: '/admin/pages' },
        { icon: Film, label: 'Reels', path: '/admin/reels' },
        { icon: Briefcase, label: 'Careers', path: '/admin/careers' },
        { icon: Layers, label: 'Content', path: '/admin/content' },
        { icon: Briefcase, label: 'Work', path: '/admin/work' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const isActive = (path) => {
        if (path === '/admin' && pathname === '/admin') return true;
        if (path !== '/admin' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col bg-[#0f0f0f]">
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <img src="/logo.png" alt="Brainvare Admin" className="h-7 w-auto object-contain" />
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive(item.path)
                                ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} className={isActive(item.path) ? 'text-red-500' : 'text-gray-500 group-hover:text-white'} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm">
                        <ExternalLink size={18} />
                        View Website
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-900/10 hover:text-red-500 transition-all text-sm group">
                        <LogOut size={18} className="group-hover:text-red-500" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black relative" data-lenis-prevent>
                <div className="absolute inset-0 bg-dotted-pattern opacity-[0.03] pointer-events-none" />
                <div className="max-w-6xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
