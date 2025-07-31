This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install packages:

```bash

npm install
# or
yarn install

# Finally, run the development server:
npm run dev
# or
yarn dev

bash
yarn mlm new-page DeploymentSizesPage

It will:

🔨 Create a new folder under:
src/app/[locale]/(auth)/sample

📂 Auto-generate the following pages:

├── page.tsx             ← List page
├── new/
│   └── page.tsx         ← Create page
└── [id]/
      └── page.tsx       ← Details page


💡 Each page.tsx will dynamically import the components from @container root:
    @containers/DeploymentSizesPage

    @containers/
└── DeploymentSizePage/
    ├── components/
    │   └── modals/
    │       └── DeleteSamples.tsx
    ├── Create/
    │   ├── index.tsx // UI component for creating a sample
    │   └── styles.module.css
    ├── Detail/
    │   └── index.tsx // UI component for details a sample
    ├── mutation/
    │   ├── useCreateSample.ts
    │   └── useDeleteSample.ts
    ├── query/
    │   ├── useGetSample.ts
    │   └── useGetSamples.ts
    ├── constants.ts
    ├── index.tsx // UI component for list a sample
    └── types.ts

    | Directory/File       | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `components/modals/` | Shared UI modals, such as `DeleteSamples.tsx`                       |
| `Create/`            | Contains the UI and styles for the **create page**                  |
| `Detail/`            | Contains the UI for the **details page**                            |
| `mutation/`          | React Query hooks for **mutating data**, like create and delete     |
| `query/`             | React Query hooks for **fetching data**, single or multiple samples |
| `constants.ts`       | Local constants used across the module                              |
| `index.tsx`          | Entry point for the default exported page (usually the list page)   |
| `types.ts`           | TypeScript type definitions for the module                          |


```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
# namperfume
