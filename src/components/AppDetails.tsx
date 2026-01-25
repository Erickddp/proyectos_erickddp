'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, BookOpen, CheckCircle, Zap, ArrowLeft, Lock, ArrowUpRight } from 'lucide-react';
import { AppEntry } from '@/content/apps.registry';
import { GLOBAL_LINKS } from '@/content/links';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';

export function AppDetails({ app }: { app: AppEntry }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'quickStart' | 'features'>('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BookOpen },
        { id: 'quickStart', label: 'Quick Start', icon: Zap },
        { id: 'features', label: 'Features', icon: CheckCircle },
    ] as const;

    const openLink = app.links.open;
    const docsLink = app.links.docs;
    const whatsappLink = GLOBAL_LINKS.whatsapp;

    // Shortened URL display
    const displayUrl = openLink
        ? openLink.replace(/^https?:\/\//, '').split('/')[0]
        : 'access.restricted';

    return (
        <div className="max-w-7xl mx-auto z-10 relative">
            {/* 1. Header Section */}
            <div className="mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm font-medium mb-6 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Apps
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h1 className="text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight">{app.title}</h1>
                            <StatusBadge status={app.status} className="px-3 py-1 text-sm" />
                        </div>
                        <p className="text-xl md:text-2xl text-[var(--accent)] font-light mb-4">{app.subtitle}</p>

                        <div className="flex flex-wrap gap-2">
                            {app.tags.map(tag => (
                                <span key={tag} className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] bg-[var(--bg-elev)] border border-[var(--border)] px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {openLink ? (
                            <a
                                href={openLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-[var(--accent-fg)] font-bold rounded-lg shadow-lg transition-all flex items-center gap-2"
                            >
                                Open App <ExternalLink size={18} />
                            </a>
                        ) : (
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[var(--muted)]/20 hover:bg-[var(--muted)]/30 text-[var(--text)] font-bold rounded-lg border border-[var(--border)] transition-all flex items-center gap-2"
                            >
                                Request Access <Lock size={18} />
                            </a>
                        )}

                        {docsLink && (
                            <a
                                href={docsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3 bg-transparent hover:bg-[var(--muted)]/10 text-[var(--muted)] hover:text-[var(--text)] font-medium rounded-lg border border-[var(--border)] transition-all flex items-center gap-2"
                            >
                                Docs <BookOpen size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Main Layout Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                {/* Left: Premium Preview (8 cols) */}
                <div className="xl:col-span-8">
                    <div className="group relative rounded-t-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl overflow-hidden ring-1 ring-[var(--border)]/20">
                        {/* Browser Header */}
                        <div className="h-10 bg-[var(--bg)]/80 backdrop-blur border-b border-[var(--border)] flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                            </div>
                            <div className="ml-4 px-3 py-0.5 rounded-full bg-[var(--bg-elev)] border border-[var(--border)] text-[10px] text-[var(--muted)] font-mono w-48 text-center truncate">
                                {displayUrl}
                            </div>
                        </div>

                        {/* Image Container */}
                        <div className="relative aspect-[16/10] bg-[var(--bg)]">
                            <Image
                                src={app.preview.image}
                                alt={app.preview.alt}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                        </div>
                    </div>
                </div>

                {/* Right: Tabs & Info (4 cols) */}
                <div className="xl:col-span-4 flex flex-col gap-4">

                    {/* Info Tabs Card */}
                    <div className="bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] rounded-xl overflow-hidden flex flex-col min-h-[400px]">
                        {/* Tab Nav */}
                        <div className="flex border-b border-[var(--border)]">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all relative",
                                            isActive
                                                ? "text-[var(--accent)] bg-[var(--accent)]/10"
                                                : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--muted)]/10"
                                        )}
                                    >
                                        <Icon size={14} />
                                        {tab.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {/* Overview */}
                                    {activeTab === 'overview' && (
                                        <div className="space-y-6">
                                            <p className="text-[var(--text)] leading-relaxed text-sm md:text-base">
                                                {app.description}
                                            </p>
                                            <div className="p-4 bg-[var(--muted)]/5 rounded-lg border border-[var(--border)]">
                                                <h4 className="text-xs font-bold text-[var(--muted)] uppercase mb-2">Ideal For</h4>
                                                <p className="text-[var(--text)] text-sm font-medium">
                                                    Teams requiring precise control and scalability.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'quickStart' && (
                                        <div className="space-y-4">
                                            {app.quickStart.map((step, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className="flex-col items-center flex gap-1 pt-1">
                                                        <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-[10px] font-bold">
                                                            {i + 1}
                                                        </div>
                                                        {i !== app.quickStart.length - 1 && (
                                                            <div className="w-px h-full bg-[var(--border)] min-h-[20px]" />
                                                        )}
                                                    </div>
                                                    <p className="text-[var(--text)] text-sm pb-4">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Features */}
                                    {activeTab === 'features' && (
                                        <div className="grid grid-cols-1 gap-2">
                                            {app.features.map((feature, i) => (
                                                <div key={i} className="group/item flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]/5 transition-all">
                                                    <CheckCircle size={14} className="text-[var(--accent2)] group-hover/item:text-[var(--accent2)]" />
                                                    <span className="text-[var(--muted)] group-hover/item:text-[var(--text)] text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Micro Action Panel */}
                    <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                                <Zap size={16} className="text-[var(--accent)]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-[var(--muted)]">Ready to launch?</span>
                                <span className="text-sm font-bold text-[var(--text)]">v1.0.0 Stable</span>
                            </div>
                        </div>
                        <button
                            onClick={() => window.open(openLink || docsLink || whatsappLink, '_blank')}
                            className="w-10 h-10 rounded-full bg-[var(--muted)]/10 hover:bg-[var(--muted)]/20 flex items-center justify-center text-[var(--text)] transition-colors"
                            title="Open Resource"
                        >
                            <ArrowUpRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
