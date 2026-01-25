import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Download, FileText, CheckCircle, Zap, Target } from 'lucide-react';
import { libraryRegistry } from '@/content/library.registry';

interface PageProps {
    params: {
        slug: string;
    };
}

export function generateStaticParams() {
    return libraryRegistry.map((item) => ({
        slug: item.slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
    const item = libraryRegistry.find((i) => i.slug === params.slug);
    if (!item) return { title: 'Not Found' };

    return {
        title: `${item.title} | Library`,
        description: item.description,
    };
}

export default function LibraryItemPage({ params }: PageProps) {
    const item = libraryRegistry.find((i) => i.slug === params.slug);

    if (!item) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-24 max-w-5xl">
            {/* Header */}
            <div className="mb-10">
                <Link
                    href="/library"
                    className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm font-medium mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-[var(--muted)]/10 border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                                {item.category}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <FileText size={12} /> {item.format}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4 tracking-tight">
                            {item.title}
                        </h1>
                        <div className="flex gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="text-sm font-medium text-[var(--muted)]">#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {item.links.open && (
                            <a
                                href={item.links.open}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-[var(--accent-fg)] font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg"
                            >
                                Open Template <ExternalLink size={18} />
                            </a>
                        )}
                        {item.links.download && (
                            <a
                                href={item.links.download}
                                className="px-6 py-3 bg-[var(--muted)]/20 hover:bg-[var(--muted)]/30 text-[var(--text)] font-bold rounded-lg border border-[var(--border)] transition-all flex items-center gap-2"
                            >
                                Download <Download size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Col: Preview + Overview (2 cols) */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Browser Preview */}
                    <div className="group relative rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-2xl overflow-hidden ring-1 ring-[var(--border)]/20">
                        <div className="h-8 bg-[var(--bg)]/80 backdrop-blur border-b border-[var(--border)] flex items-center px-4 gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--muted)]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--muted)]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--muted)]" />
                        </div>
                        <div className="relative aspect-[16/9] bg-[var(--bg)]">
                            <Image
                                src={item.preview.image}
                                alt={item.preview.alt}
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2">
                            <Zap className="text-amber-500" size={20} /> Overview
                        </h3>
                        <p className="text-[var(--text)] leading-relaxed text-lg">
                            {item.description}
                        </p>
                    </div>

                    {/* Steps Section */}
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text)] mb-6">How to use</h3>
                        <div className="space-y-4">
                            {item.steps.map((step, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--muted)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </span>
                                    <p className="text-[var(--text)] pt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Sidebar (1 col) */}
                <div className="lg:col-span-1">
                    <div className="bg-[var(--card)] backdrop-blur border border-[var(--border)] rounded-xl p-6 sticky top-24">
                        <h3 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Target size={16} /> Use Cases
                        </h3>
                        <ul className="space-y-4">
                            {item.useCases.map((useCase) => (
                                <li key={useCase} className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-[var(--accent2)] shrink-0 mt-0.5" />
                                    <span className="text-[var(--text)] font-medium">{useCase}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-8 border-t border-[var(--border)]">
                            <p className="text-xs text-[var(--muted)] mb-4 text-center">Need a custom template?</p>
                            <a
                                href="#"
                                className="block w-full py-3 px-4 rounded-lg bg-[var(--muted)]/10 hover:bg-[var(--muted)]/20 text-[var(--text)] text-sm font-bold text-center transition-colors"
                            >
                                Request Template
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
