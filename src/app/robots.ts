import { Metadata, Route } from 'next';

type Robots = {
    rules: {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
    } | Array<{
        userAgent: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
    }>;
    sitemap?: string | string[];
    host?: string;
}

export default function robots(): Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://apps.erickddp.com/sitemap.xml',
    };
}
