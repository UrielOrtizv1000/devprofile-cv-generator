# DevProfile: Dynamic CV Generator

## 1. Project overview

DevProfile is a web application built with React and Vite for creating a professional CV dynamically. It lets users capture, edit, delete, preview, and export professional information.

The app includes a CV editor, live preview, skills dashboard, dark mode, LocalStorage persistence, responsive layout, and PDF export.

## 2. Main features

- Personal information editor.
- Profile image support.
- Skills management.
- Projects management.
- Education management.
- Certifications management.
- Experience management.
- Languages management.
- Dynamic CV preview.
- PDF export.
- Skills dashboard/chart.
- Dark mode.
- LocalStorage persistence.
- Responsive design.

## 3. Technologies used

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

## 4. Project structure

```text
src/
  components/
  pages/
  context/
  hooks/
  utils/
  styles/
docs/
```

- `src/components/`: reusable UI components and form components.
- `src/pages/`: main route views for home, editor, preview, dashboard, and about.
- `src/context/`: global providers and context objects for CV data and theme state.
- `src/hooks/`: custom hooks used by the application.
- `src/utils/`: reusable helper functions for validation, analytics, and PDF export.
- `src/styles/`: global and page-specific CSS files.
- `docs/`: additional project documentation, correction reports, and technical notes.

## 5. Requirements

- Node.js 18 or higher recommended.
- npm.

No specific Node.js version is declared in `package.json`.

## 6. Local installation

1. Clone or open the project folder.
2. Install dependencies:

```bash
npm install
```

## 7. Run in development mode

```bash
npm run dev
```

Vite will show a local URL, normally:

```text
http://localhost:5173
```

The port can vary if another process is already using the default Vite port.

## 8. Build for production

```bash
npm run build
```

This command generates the production files in the `dist/` folder.

## 9. Preview production build

```bash
npm run preview
```

This command serves the production build locally after running `npm run build`.

## 10. Linting

```bash
npm run lint
```

This command checks the project for style and code-quality issues using ESLint.

## 11. Available routes

```text
/           Home
/editor     CV editor
/preview    CV preview and PDF export
/dashboard  Skills dashboard
/about      Project information
```

## 12. How the app works

1. The user opens the CV editor.
2. The user captures or updates professional information.
3. Data is stored in global React state through context.
4. Data persists in the browser through `localStorage`.
5. The preview view renders the CV with the current information.
6. The dashboard displays skills analytics and charts.
7. The user can export the CV to PDF from the preview page.

## 13. Documentation

Additional documentation is available in:

```text
docs/
```

Relevant documentation folders:

```text
docs/codigo/
docs/correcciones/
```

- `docs/codigo/`: technical documentation and implementation notes.
- `docs/correcciones/`: correction reports, diagnostics, and follow-up reports.

## 14. Notes

- Data is stored locally in the browser using `localStorage`.
- This version does not require a backend to run locally.
- To clear saved CV data, delete the site's local storage from the browser.
- The real deploy URL is still pending and should be added to the documentation when available.
