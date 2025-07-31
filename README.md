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

## Usage Guide

### 1. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 2. Start Development Server

To start the development server, use:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Project Structure Overview

- **`containers/`**: Contains main UI components.
- **`hooks/`**: Custom React hooks for reusable logic.
- **`queries/`** and **`mutation/`**: React Query hooks for fetching and mutating data.
- **`utils/`**: Utility functions and constants.
- **`public/`**: Static assets like images.
- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`postcss.config.js`**: PostCSS configuration.

### 4. Run Lint and Format

- To check and fix linting issues:
  ```bash
  npm run lint
  ```
- To format code:
  ```bash
  npm run format
  ```

### 5. Run `lint-staged` Before Committing

To ensure only staged files are linted and formatted before committing:

1. Stage your changes:
   ```bash
   git add .
   ```
2. Run lint-staged:
   ```bash
   npm run lint-staged
   ```
3. If no errors, commit your changes:
   ```bash
   git commit -m "Your commit message"
   ```

### 6. Create a New Page

To generate a new page, use the following command:

```bash
yarn mlm new-page <PageName>
```

For example:

```bash
yarn mlm new-page DeploymentSizesPage
```

This will create a new folder and auto-generate files for the page.

### 7. Access the Application

After starting the development server, access the application at [http://localhost:3000](http://localhost:3000).

### 8. Modify Pages

You can start editing pages by modifying files in the `src/app/` directory. Changes will be reflected automatically.
