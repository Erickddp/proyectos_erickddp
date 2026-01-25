import { notFound } from 'next/navigation';
import { appsRegistry } from '@/content/apps.registry';
import { AppDetails } from '@/components/AppDetails';
import { Metadata } from 'next';

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all apps
export function generateStaticParams() {
    return appsRegistry.map((app) => ({
        slug: app.slug,
    }));
}

// Generate metadata for each page
export function generateMetadata({ params }: PageProps): Metadata {
    const app = appsRegistry.find((a) => a.slug === params.slug);
    if (!app) return { title: 'App Not Found' };

    return {
        title: `${app.title} | Apps Container`,
        description: app.shortDescription,
    };
}

export default function AppPage({ params }: PageProps) {
    const app = appsRegistry.find((a) => a.slug === params.slug);

    if (!app) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <AppDetails app={app} />
        </div>
    );
}
