'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Lock, Github, Download, BookOpen } from 'lucide-react';
import { AppEntry } from '@/content/apps.registry';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

interface AppCardProps {
    app: AppEntry;
}

export function AppCard({ app }: AppCardProps) {
    const isLive = app.status === 'live';
    const hasOpenLink = !!app.links.open;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col h-full bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-lg transition-all duration-300"
        >
            {/* Image Area */}
            <div className="relative h-40 w-full overflow-hidden border-b border-[var(--border)]">
                <Image
                    src={app.preview.image}
                    alt={app.preview.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute top-3 right-3">
                    <StatusBadge status={app.status} />
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                        {app.title}
                    </h3>
                    <p className="text-sm text-[var(--accent)] font-medium mb-2">
                        {app.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {app.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider text-[var(--muted)] bg-[var(--muted)]/10 px-2 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-[var(--muted)] text-xs line-clamp-2 leading-relaxed">
                        {app.shortDescription}
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-[var(--border)]">

                    {(() => {
                        // 1. Determine Actions
                        const { open, download, repo, docs } = app.links;

                        // Priority: Download -> Open -> Repo -> Docs
                        let primaryAction: { type: 'download' | 'open' | 'repo' | 'docs', url: string } | null = null;
                        if (download) primaryAction = { type: 'download', url: download };
                        else if (open) primaryAction = { type: 'open', url: open };
                        else if (repo) primaryAction = { type: 'repo', url: repo };
                        else if (docs) primaryAction = { type: 'docs', url: docs };

                        // Secondary: All others
                        const secondaryActions: { type: 'download' | 'open' | 'repo' | 'docs', url: string }[] = [];
                        if (download && primaryAction?.type !== 'download') secondaryActions.push({ type: 'download', url: download });
                        if (open && primaryAction?.type !== 'open') secondaryActions.push({ type: 'open', url: open });
                        if (repo && primaryAction?.type !== 'repo') secondaryActions.push({ type: 'repo', url: repo });
                        if (docs && primaryAction?.type !== 'docs') secondaryActions.push({ type: 'docs', url: docs });

                        // 2. Render Functions
                        const renderPrimary = (action: typeof primaryAction) => {
                            if (!action) return null;
                            const isDownload = action.type === 'download';
                            // Docs should always operate as external link
                            const isExternal = action.type === 'repo' || action.type === 'docs' || (action.type === 'open' && !action.url.startsWith('/'));
                            const validUrl = action.url || '#';

                            const commonClasses = "flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-fg)] text-xs font-bold transition-all shadow-md hover:shadow-lg";

                            let label = 'Abrir';
                            let Icon = ArrowRight;

                            if (action.type === 'download') { label = 'Descargar'; Icon = Download; }
                            else if (action.type === 'repo') { label = 'Repo'; Icon = Github; }
                            else if (action.type === 'docs') { label = 'Documentación'; Icon = BookOpen; }
                            else if (isExternal) { Icon = ExternalLink; }

                            if (!isExternal && !isDownload) {
                                return (
                                    <Link href={validUrl} className={commonClasses}>
                                        {label} <Icon size={14} />
                                    </Link>
                                );
                            }
                            return (
                                <a href={validUrl} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                                    {label} <Icon size={14} />
                                </a>
                            );
                        };

                        const renderSecondary = (action: typeof secondaryActions[0]) => {
                            const isDownload = action.type === 'download';
                            const isExternal = action.type === 'repo' || action.type === 'docs' || (action.type === 'open' && !action.url.startsWith('/'));
                            const validUrl = action.url || '#';

                            let label = 'Abrir';
                            let Icon = ArrowRight;

                            if (action.type === 'download') { label = 'Descargar'; Icon = Download; }
                            else if (action.type === 'repo') { label = 'Repo'; Icon = Github; }
                            else if (action.type === 'docs') { label = 'Docs'; Icon = BookOpen; }
                            else if (isExternal) { Icon = ExternalLink; }

                            const commonClasses = "flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] text-[11px] font-medium transition-colors px-1 py-0.5";

                            if (!isExternal && !isDownload) {
                                return (
                                    <Link key={action.type} href={validUrl} className={commonClasses}>
                                        <Icon size={12} /> {label}
                                    </Link>
                                );
                            }
                            return (
                                <a key={action.type} href={validUrl} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                                    <Icon size={12} /> {label}
                                </a>
                            );
                        };

                        // 3. Render Logic
                        if (!primaryAction) {
                            return (
                                <button
                                    disabled
                                    className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-[var(--muted)]/10 text-[var(--muted)] border border-[var(--border)] text-xs font-semibold cursor-not-allowed"
                                >
                                    Próximamente <Lock size={14} />
                                </button>
                            );
                        }

                        return (
                            <div className="flex flex-col gap-3">
                                {renderPrimary(primaryAction)}
                                {secondaryActions.length > 0 && (
                                    <div className="flex flex-wrap items-center justify-center gap-3 border-t border-[var(--border)]/40 pt-2 mt-1">
                                        {secondaryActions.map(action => renderSecondary(action))}
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </motion.div>
    );
}
