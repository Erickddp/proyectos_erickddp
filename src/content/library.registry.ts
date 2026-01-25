export interface LibraryLink {
    open?: string;
    download?: string;
}

export interface LibraryPreview {
    image: string;
    alt: string;
}

export interface LibraryItem {
    slug: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    format: string;
    links: LibraryLink;
    preview: LibraryPreview;
    steps: string[];
    useCases: string[];
}

export const libraryRegistry: LibraryItem[] = [
    {
        slug: 'freelance-contract',
        title: 'Freelance Service Agreement',
        category: 'Contracts',
        description: 'A comprehensive contract for freelancers to protect their work and get paid on time.',
        tags: ['Freelance', 'Legal', 'Services'],
        format: 'DOCX',
        links: {
            open: '#',
            download: '#',
        },
        preview: {
            image: '/images/templates-preview.png',
            alt: 'Contract Preview',
        },
        steps: [
            'Fill in your personal details',
            'Define the scope of work',
            'Set payment terms',
            'Sign and send to client',
        ],
        useCases: [
            'Web Design Projects',
            'Consulting Services',
            'Content Writing',
        ],
    },
    {
        slug: 'monthly-invoice-template',
        title: 'Monthly Invoice Template',
        category: 'Accounting',
        description: 'Clean and professional invoice template with auto-calculating totals.',
        tags: ['Finance', 'Invoicing', 'Business'],
        format: 'Google Doc',
        links: {
            open: '#',
        },
        preview: {
            image: '/images/templates-preview.png',
            alt: 'Invoice Preview',
        },
        steps: [
            'Make a copy of the sheet',
            'Add your logo',
            'Input line items',
            'Export as PDF',
        ],
        useCases: [
            'Monthly Retainers',
            'One-off Projects',
            'Expense Reimbursement',
        ],
    },
    {
        slug: 'project-handover-checklist',
        title: 'Project Handover Checklist',
        category: 'Checklists',
        description: 'Ensure nothing slips through the cracks when delivering a project.',
        tags: ['Project Management', 'Quality', 'Process'],
        format: 'Notion',
        links: {
            open: '#',
        },
        preview: {
            image: '/images/templates-preview.png',
            alt: 'Checklist Preview',
        },
        steps: [
            'Duplicate to your Notion',
            'Customize for your project',
            'Check off items as you go',
            'Share with client',
        ],
        useCases: [
            'Software Launch',
            'Design Handoff',
            'Client Onboarding',
        ],
    },
];
