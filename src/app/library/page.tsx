'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ExternalLink, ArrowLeft, FileText, Download } from 'lucide-react';
import { libraryRegistry, LibraryItem } from '@/content/library.registry';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(libraryRegistry.map((item) => item.category));
        return ['All', ...Array.from(cats)];
    }, []);

    const filteredItems = useMemo(() => {
        return libraryRegistry.filter((item) => {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(q) ||
                item.tags.some((t) => t.toLowerCase().includes(q));
            const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm font-medium mb-6 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Mission Control
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4">
                        Library
                    </h1>
                    <p className="text-xl text-[var(--muted)] max-w-2xl font-light">
                        Recursos profesionales listos para usar.
                    </p>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                                categoryFilter === cat
                                    ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
                                    : "bg-[var(--bg-elev)] text-[var(--muted)] border-[var(--border)] hover:bg-[var(--muted)]/10 hover:text-[var(--text)]"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl py-2.5 pl-11 pr-4 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            key={item.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href={`/library/${item.slug}`} className="group block h-full">
                                <article className="h-full bg-[var(--card)] backdrop-blur border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)]/30 hover:shadow-lg transition-all flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="inline-block px-2 py-1 rounded bg-[var(--muted)]/10 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] w-fit">
                                                {item.category}
                                            </span>
                                            <h2 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                                                {item.title}
                                            </h2>
                                        </div>
                                        <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-500/20">
                                            <FileText size={12} />
                                            {item.format}
                                        </span>
                                    </div>

                                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 line-clamp-2">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                        <div className="flex gap-2">
                                            {item.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-xs text-[var(--muted)] font-medium">#{tag}</span>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            View <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
