'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    // Default to 'light' as per requirement
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (stored) {
            setTheme(stored);
            document.documentElement.setAttribute('data-theme', stored);
        } else {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <div className="fixed top-[calc(env(safe-area-inset-top)+16px)] right-4 md:top-[calc(env(safe-area-inset-top)+24px)] md:right-6 z-[100]">
            <motion.button
                layout
                onClick={toggleTheme}
                className="relative flex items-center justify-center md:justify-start gap-3 px-0 md:px-5 w-[52px] md:w-auto md:min-w-[180px] h-[52px] bg-[var(--text)] text-[var(--bg)] rounded-full shadow-[var(--shadow)] group hover:scale-105 transition-all duration-300 evo-pulse-ring overflow-visible"
                aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Icon Wrapper for consistent centering on mobile */}
                <div className="relative flex items-center justify-center w-[52px] h-[52px] shrink-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <span className="font-bold text-sm tracking-wide whitespace-nowrap hidden md:inline-block pr-1">
                    {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                </span>

                {/* Tooltip helper - Desktop Only */}
                <span className="absolute top-[60px] right-0 bg-[var(--bg-elev)] text-[var(--text)] text-xs py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[var(--border)] pointer-events-none hidden md:block">
                    Ajusta el tema
                </span>
            </motion.button>
        </div>
    );
}
