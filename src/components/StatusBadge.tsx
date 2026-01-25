import { cn } from '@/lib/utils';
import { AppStatus } from '@/content/apps.registry';

interface StatusBadgeProps {
    status: AppStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const styles = {
        live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        soon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        docs: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    };

    const labels = {
        live: 'Live',
        soon: 'Coming Soon',
        docs: 'Docs / Setup',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                styles[status],
                className
            )}
        >
            {labels[status]}
        </span>
    );
}
