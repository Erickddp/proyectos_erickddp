import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { ThemeToggle } from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://proyectos.erickddp.com'),
  title: {
    default: 'ErickDDP | Proyectos',
    template: '%s | ErickDDP',
  },
  description: 'Contenedor de proyectos, herramientas y recursos creados por ErickDDP.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://proyectos.erickddp.com',
    siteName: 'ErickDDP Proyectos',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'ErickDDP Proyectos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@erickddp',
    creator: '@erickddp',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticlesBackground />
        <main className="relative z-10 min-h-screen flex flex-col selection:bg-[var(--accent)] selection:text-[var(--accent-fg)]">
          {children}

          <ThemeToggle />

          <footer className="py-8 text-center text-[var(--muted)] text-xs font-mono">
            <p className="hover:text-cyan-500 transition-colors cursor-default">
              SYSTEM STATUS: NOMINAL • © {new Date().getFullYear()} ERICKDDP
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
