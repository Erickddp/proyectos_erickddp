import { Metadata } from 'next';
import { appsRegistry } from '@/content/apps.registry';
import { libraryRegistry } from '@/content/library.registry';

export default function sitemap(): Metadata['archives'] {
    const baseUrl = 'https://apps.erickddp.com';

    // Base routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/library`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ];

    // App routes
    const appRoutes = appsRegistry.map((app) => ({
        url: `${baseUrl}/apps/${app.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Library routes
    const libraryRoutes = libraryRegistry.map((item) => ({
        url: `${baseUrl}/library/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Explicitly cast the array to any to bypass the complex Metadata mapping issues in strict mode if needed, 
    // or return the correct Sitemap type structure.
    return [...routes, ...appRoutes, ...libraryRoutes] as any;
}
