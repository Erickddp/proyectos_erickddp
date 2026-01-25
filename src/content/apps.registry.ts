export type AppStatus = 'live' | 'soon' | 'docs';

export interface AppLink {
    open?: string;
    docs?: string;
}

export interface AppPreview {
    image: string;
    alt: string;
}

export interface AppEntry {
    slug: string;
    title: string;
    subtitle: string;
    status: AppStatus;
    shortDescription: string;
    description: string;
    tags: string[];
    links: AppLink;
    preview: AppPreview;
    quickStart: string[];
    features: string[];
}


























export const appsRegistry: AppEntry[] = [
    {
        slug: 'evoapp',
        title: 'EVOAPP',
        subtitle: 'Primera app con diversas herramientas',
        status: 'live',
        shortDescription: 'Fue creada a partir de la necesidad de juntar diversas herrmeintas para conectarla a un flujo guiado.',
        description: 'Esta aplicacion fue creada con typescripy y nextjs para conectar diversas herramientas en modulos aisados de errores pero concetada para juntar y conciliar datos que se crean en distintas herrmeintas.',
        tags: ['App Web', 'Herramientas', 'Contabilidad'],
        links: {
            open: 'https://app.evorix.com.mx',
        },
        preview: {
            image: '/images/evoapp.png', // Placeholder
            alt: 'EVOAPP Dashboard Preview',
        },
        quickStart: [
            'Sign up for an account',
            'Create your first project',
            'Deploy in seconds',
        ],
        features: [
            'Visual Builder',
            'One-click Deployment',
            'Integrated Analytics',
            'Team Collaboration',
            'Custom Domains',
        ],
    },
    {
        slug: 'conthabil',
        title: 'ContHabil',
        subtitle: 'Una app para toda la contabilidad RESICO',
        status: 'soon',
        shortDescription: 'Esta aplicacione sta pensada para automatizar la contabilidad de las perosnas y empresas con el regimen de RESICO.',
        description: 'ContHabil simplifies accounting processes with AI-driven automation. Track expenses, generate reports, and manage payroll with ease, all from a single intuitive interface.',
        tags: ['Contabilidad', 'RESICO', 'Automatización', 'IA', 'Finanzas'],
        links: {},
        preview: {
            image: '/images/conthabil.png', // Placeholder
            alt: 'ContHabil Interface Preview',
        },
        quickStart: [
            'Connect your bank account',
            'Upload past invoices',
            'Generate your first report',
        ],
        features: [
            'Automated Bookkeeping',
            'Tax Preparation',
            'Expense Tracking',
            'Payroll Management',
            'Financial Insights',
        ],
    },
    {
        slug: 'templates-contracts',
        title: 'Plataformas Digitales (ISR & IVA)',
        subtitle: 'Guía fiscal para creadores, apps y servicios en línea',
        status: 'docs',
        shortDescription: 'Documento claro y práctico que explica cómo tributan los ingresos obtenidos por plataformas digitales (Uber, Didi, Airbnb, YouTube, TikTok, apps y servicios online), con ejemplos simples de retenciones, pagos definitivos y obligaciones ante el SAT.',
        description: 'A curated collection of legal contracts, business proposals, and project templates. standardized and vetted by professionals to ensure quality and compliance.',
        tags: ['Plataformas Digitales', 'Creadores', 'ISR - IVA'],
        links: {
            open: 'https://drive.google.com/file/d/17H7a9TwP9DWh6dlgweFWqukx5I2hdZZN/view?usp=sharing',
        },
        preview: {
            image: '/images/pd3.png',
            alt: 'Plataformas Digitales (ISR & IVA)',
        },
        quickStart: [
            'Search for a template',
            'Download or edit online',
            'Export to PDF/Word',
        ],
        features: [
            'Legal Contracts',
            'Business Proposals',
            'Project Charters',
            'Invoice Templates',
            'NDA Forms',
        ],
    },
];
