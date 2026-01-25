'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MessageCircle, X } from 'lucide-react';
import { appsRegistry, AppEntry, AppStatus } from '@/content/apps.registry';
import { AppCard } from '@/components/AppCard';
import { cn } from '@/lib/utils';

export function MissionControl() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<AppStatus | 'all'>('all');
    const [tagFilter, setTagFilter] = useState<string | null>(null);

    // 1. Calculate Stats
    const stats = useMemo(() => {
        return {
            live: appsRegistry.filter((a) => a.status === 'live').length,
            soon: appsRegistry.filter((a) => a.status === 'soon').length,
            docs: appsRegistry.filter((a) => a.status === 'docs').length,
        };
    }, []);

    // 2. Calculate Top Tags
    const topTags = useMemo(() => {
        const allTags = appsRegistry.flatMap((app) => app.tags);
        const tagCounts: Record<string, number> = {};
        allTags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        return Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag]) => tag);
    }, []);

    // 3. Filter Apps
    const filteredApps = useMemo(() => {
        return appsRegistry.filter((app) => {
            // Search
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                app.title.toLowerCase().includes(q) ||
                app.subtitle.toLowerCase().includes(q) ||
                app.tags.some((t) => t.toLowerCase().includes(q));

            // Status
            const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

            // Tag
            const matchesTag = tagFilter ? app.tags.includes(tagFilter) : true;

            return matchesSearch && matchesStatus && matchesTag;
        });
    }, [searchQuery, statusFilter, tagFilter]);

    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setTagFilter(null);
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Background Overlay for text readability */}
            <div className="fixed inset-0 bg-gradient-to-b from-[var(--overlay-start)] via-[var(--overlay-mid)] to-[var(--overlay-end)] pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-24 pb-32 relative z-10 flex-1 flex flex-col">
                {/* HERO SECTION */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-[var(--text)] mb-6 tracking-tight drop-shadow-sm">
                            Proyectos
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--muted)] font-light mb-8 max-w-2xl mx-auto">
                            Herramientas reales creadas para automatizar y escalar procesos contables.
                        </p>
                    </motion.div>

                    {/* Stats Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-2 mb-10"
                    >
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-400 text-xs font-bold tracking-wider">{stats.live} LIVE</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-amber-400 text-xs font-bold tracking-wider">{stats.soon} SOON</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-blue-400 text-xs font-bold tracking-wider">{stats.docs} DOCS</span>
                        </div>
                    </motion.div>

                    {/* SEARCH & FILTERS CONTAINER */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-2xl p-4 md:p-6 shadow-2xl max-w-3xl mx-auto"
                    >
                        {/* Search Input */}
                        <div className="relative mb-6 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search apps, tags, or features..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl py-3 pl-12 pr-4 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-medium"
                            />
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                            {/* Status Filters */}
                            <div className="flex flex-wrap gap-1">
                                {(['all', 'live', 'soon', 'docs'] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border",
                                            statusFilter === status
                                                ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
                                                : "bg-transparent text-[var(--muted)] border-transparent hover:bg-[var(--muted)]/10 hover:text-[var(--text)]"
                                        )}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>

                            {/* Divider for mobile */}
                            <div className="h-px w-full bg-[var(--border)] md:hidden" />

                            {/* Tag Filters */}
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-xs text-[var(--muted)] font-bold uppercase mr-1">Top Tags:</span>
                                {topTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                                        className={cn(
                                            "px-2 py-1 rounded text-xs transition-colors border",
                                            tagFilter === tag
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30"
                                                : "bg-[var(--muted)]/5 text-[var(--muted)] border-[var(--border)] hover:bg-[var(--muted)]/10 hover:text-[var(--text)]"
                                        )}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                                {tagFilter && (
                                    <button
                                        onClick={() => setTagFilter(null)}
                                        className="ml-2 text-slate-500 hover:text-red-400 transition-colors"
                                        title="Clear tag filter"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RESULTS GRID */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
                    <AnimatePresence mode='popLayout'>
                        {filteredApps.length > 0 ? (
                            filteredApps.map((app) => (
                                <AppCard key={app.slug} app={app} />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20"
                            >
                                <p className="text-[var(--muted)] text-lg mb-4">No systems matching your criteria.</p>
                                <button
                                    onClick={clearFilters}
                                    className="text-[var(--accent)] hover:text-[var(--accent)]/80 underline font-medium"
                                >
                                    Reset all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* FOOTER CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-[var(--muted)] font-mono hidden md:inline-block">STATUS: ONLINE</span>
                    </div>

                    <a
                        href="https://wa.me/525534806184?text=Hola%20Erick%2C%20vengo%20desde%20la%20secci%C3%B3n%20de%20Proyectos%20y%20quiero%20informaci%C3%B3n."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--text)] hover:bg-[var(--accent)] text-[var(--bg)] hover:text-white font-bold text-sm transition-all"
                    >
                        <MessageCircle size={16} className="text-inherit" />
                        <span>Hablemos</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
