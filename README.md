# Apps Container

This is the main application container for ErickDDP apps. It is a scalable registry built with Next.js 15 (App Router) and Tailwind CSS v4.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Add a New App

The application is completely data-driven. To add a new app, you only need to modify **one file**.

1. Open `src/content/apps.registry.ts`.
2. Add a new entry to the `appsRegistry` array.
3. Place a preview image in `public/images/`.

### App Entry Structure

```typescript
{
  slug: 'new-app-name', // Unique identifier for URL
  title: 'My New App',
  subtitle: 'Short catchy subtitle',
  status: 'live', // 'live' | 'soon' | 'docs'
  shortDescription: 'One line description for the card.',
  description: 'Full description for the details page.',
  tags: ['Tag1', 'Tag2'],
  links: {
    open: 'https://...', // Optional: Link to open the app
    docs: 'https://...', // Optional: Link to documentation
  },
  preview: {
    image: '/images/my-preview.png',
    alt: 'Preview description',
  },
  quickStart: [
    'Step 1',
    'Step 2',
    'Step 3',
  ],
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4',
    'Feature 5',
  ],
}
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Framer Motion + Custom Canvas Particles
- **Deployment:** Vercel (Ready)

## Project Structure

- `src/content/`: Contains the data registry/source of truth.
- `src/components/`: Reusable UI components.
- `src/app/`: App Router pages and layouts.
- `public/images/`: Static assets.
"# proyectos_erickddp" 
