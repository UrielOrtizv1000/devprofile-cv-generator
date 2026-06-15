# DevProfile: Dynamic CV Generator

## Project Overview

DevProfile is a React and Vite web application for building a professional CV dynamically. Users can enter career information, preview the result, review skills analytics, switch between light and dark mode, persist data locally, and export the CV as a PDF.

## Main Features

- Personal information editor with profile image support.
- Dynamic sections for skills, projects, education, certifications, experience, and languages.
- Live CV preview.
- Professional PDF export from the preview page.
- Skills dashboard with charts.
- Light and dark mode.
- LocalStorage persistence.
- Responsive layout for desktop and mobile use.

## Technologies Used

- React
- Vite
- JavaScript
- React Router DOM
- Context API
- LocalStorage
- Recharts
- html2pdf.js
- react-icons
- CSS
- ESLint

## Project Structure

```text
src/
  assets/
  components/
  context/
  hooks/
  pages/
  styles/
  utils/
.github/
  workflows/
```

- `src/assets/`: static project assets.
- `src/components/`: reusable UI components and form components.
- `src/context/`: global providers and shared context logic for CV data and theme state.
- `src/hooks/`: custom hooks used by the application.
- `src/pages/`: main route views for home, editor, preview, dashboard, and about.
- `src/styles/`: global and page-specific CSS files.
- `src/utils/`: helper functions for validation, analytics, and PDF export.
- `.github/workflows/`: GitHub Actions workflow for GitHub Pages deployment.

## Requirements

- Node.js 18 or higher recommended.
- npm.

## Local Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

This command generates the production build in `dist/`.

## Lint

```bash
npm run lint
```

## Available Routes

```text
/           Home
/editor     CV editor
/preview    CV preview and PDF export
/dashboard  Skills dashboard
/about      Project information
```

For GitHub Pages, the app uses hash-based routing, so deployed URLs look like:

```text
/#/editor
/#/preview
/#/dashboard
/#/about
```

## How It Works

1. The user enters CV information in the editor.
2. React context stores the current CV state.
3. The browser saves the data in `localStorage`.
4. The preview page renders the CV using the saved data.
5. The dashboard displays skills analytics from the same CV state.
6. The preview page exports the professional CV layout to PDF.

## Deployment on GitHub Pages

The project is prepared for GitHub Pages deployment from the `main` branch using GitHub Actions.

The workflow in `.github/workflows/deploy.yml` installs dependencies, runs the production build, uploads the generated `dist/` folder, and deploys it through GitHub Pages.

The Vite base path is configured for this repository:

```js
base: '/devprofile-cv-generator/'
```

After merging to `main`, enable GitHub Pages in the repository settings and select GitHub Actions as the source.

Expected deployment URL:

```text
https://urielortizv1000.github.io/devprofile-cv-generator/
```

## Notes

- The app runs entirely in the browser and does not require a backend.
- CV data is saved locally using `localStorage`.
- To clear saved CV data, remove this site's local storage from the browser.
- PDF export is available from the preview page.
- `node_modules/` and `dist/` are intentionally ignored by Git because dependencies and production builds are generated during installation and deployment.
