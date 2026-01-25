'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Lock } from 'lucide-react';
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
                    {hasOpenLink ? (
                        app.links.open?.startsWith('/') ? (
                            <Link
                                href={app.links.open}
                                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-fg)] text-xs font-bold transition-all shadow-md hover:shadow-lg"
                            >
                                Abrir <ArrowRight size={14} />
                            </Link>
                        ) : (
                            <a
                                href={app.links.open}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-fg)] text-xs font-bold transition-all shadow-md hover:shadow-lg"
                            >
                                Abrir <ExternalLink size={14} />
                            </a>
                        )
                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-[var(--muted)]/10 text-[var(--muted)] border border-[var(--border)] text-xs font-semibold cursor-not-allowed"
                        >
                            Próximamente <Lock size={14} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
