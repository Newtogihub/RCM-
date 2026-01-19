import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, Bell, Settings, RefreshCw, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ toggleSidebar }) => {
    const [isSyncing, setIsSyncing] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setIsSearching(true);
            try {
                // Determine if this is a navigation or an analysis request
                // For this NLP feature, we assume all global searches are "Analysis Requests"
                navigate('/ai-analyst', {
                    state: {
                        nlpQuery: searchQuery,
                        timestamp: Date.now()
                    }
                });
                setSearchQuery('');
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsSearching(false);
            }
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                <div className="relative w-96 hidden md:block">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isSearching ? 'text-indigo-500 animate-pulse' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        placeholder="Ask Cortex Analyst (e.g. 'Show denied Medicare claims')..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all bg-gray-50/50 focus:bg-white"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user?.location && (
                    <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
                        Topography: {user.location}
                    </span>
                )}

                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100">
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Sync Active</span>
                </div>

                <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

                <button className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-gray-50 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Logout">
                    <LogOut className="w-5 h-5" />
                </button>

                <div className="ml-2 flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-semibold text-gray-800 leading-none">{user?.name || 'Guest'}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{user?.role || 'Visitor'}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-dark)] text-white flex items-center justify-center font-bold text-sm ring-2 ring-offset-2 ring-transparent hover:ring-[var(--primary)]/20 transition-all cursor-pointer shadow-md">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : 'GU'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
