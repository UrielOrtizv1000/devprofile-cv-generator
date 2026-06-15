# Responsive Design Guide

## Overview

The DevProfile CV Generator is fully responsive across desktop, tablet, and phone displays. All pages — Home, Editor, Preview, and Dashboard — adapt their layout, navigation, and typography based on viewport width, while keeping the same visual language (buttons, cards, forms) used on desktop.

The implementation relies on plain CSS media queries (no CSS framework), CSS Grid/Flexbox reflow, and a small amount of React state for the mobile navigation menu.

## Breakpoints

Three breakpoints are used consistently across the stylesheets:

| Breakpoint | Target device | Typical usage |
|---|---|---|
| `max-width: 1024px` | Tablet (landscape) / small laptop | Collapse multi-column layouts (e.g. Dashboard sidebar) to a single column |
| `max-width: 768px` | Tablet (portrait) / large phone | Switch navbar to hamburger menu, stack form grids to one column, reduce padding |
| `max-width: 480px` | Phone | Further reduce font sizes/padding, stack list items vertically, shrink chart heights |

These breakpoints appear in `src/styles/index.css`, `src/styles/Preview.css`, `src/styles/Dashboard.css`, `src/components/Navbar.css`, `src/components/SkillsDashboard.css`, and the form CSS files under `src/components/forms/`.

## How It Works

### 1. Responsive Navigation (Hamburger Menu)

`src/components/Navbar.jsx` and `src/components/Navbar.css`

- On desktop, the navbar shows all links inline (Home, Editor, Preview, Dashboard, About, theme toggle).
- A `.navbar-toggle` button (hamburger / close icon from `react-icons/fa`) is hidden on desktop (`display: none`) and shown (`display: flex`) at `max-width: 768px`.
- Clicking the toggle flips a local `isMenuOpen` state, which adds an `.open` class to `.navbar-links`. At ≤768px, `.navbar-links` is `display: none` by default and becomes a full-width, column-stacked menu when `.open` is applied.
- Each `<Link>` calls a `closeMenu()` handler on click, so the menu automatically collapses after navigating — important on mobile where the menu otherwise covers the page.
- The theme toggle button remains accessible inside the mobile menu, centered in its own row.

### 2. Global Layout Safety Net

`src/styles/index.css`

- `html` and `body` both set `overflow-x: hidden` as a safety net against any element that might otherwise cause horizontal scrolling/overflow on narrow screens.
- `.main-content` and `.home` get reduced padding at `768px` and `480px` so content doesn't feel cramped against the viewport edge on small devices.
- Heading and paragraph font sizes on the Home page scale down at smaller breakpoints to avoid oversized text wrapping awkwardly.
- The `.editor` wrapper (used by the Editor page) is a centered, max-width container that collapses its padding to `0` on mobile, since the inner form cards already have their own padding.

### 3. Preview Page & CV Document

`src/styles/Preview.css`

- `.cv-document` (the rendered CV) uses `overflow-wrap: break-word` and `word-break: break-word`. These properties are inherited by all descendants, so long names, email addresses, URLs, and project/job descriptions wrap instead of overflowing the card on narrow screens.
- Existing `768px`/`480px` media queries adjust the document's padding and font sizing so the preview remains readable on tablet and phone, while keeping the same overall card-based structure as desktop.

### 4. Forms & CRUD List Items

`src/components/forms/*.css` (Skills, Projects, Education/Experience/Certifications/Languages, Personal Details)

- Form grids (`.personal-form`, `.crud-form`) switch from a 2-column grid to a single column at `768px`.
- List/card rows (`.skill-item`, `.project-item`, `.list-item`) use `flex-wrap: wrap` so the info block and action buttons can wrap onto separate lines if needed.
- The info block of each row (`.skill-info`, `.project-info`, `.item-info`) uses `flex: 1 1 200px; min-width: 0;` combined with `overflow-wrap: break-word` so long skill names, project titles, or descriptions wrap cleanly instead of pushing buttons off-screen.
- At `480px`, these rows switch to `flex-direction: column` so the title/description sit above the edit/delete buttons, which are right-aligned via `justify-content: flex-end`.
- `.form-container` padding is reduced at `480px`, and the "or" divider between image URL/file upload (`.or-text`) is re-centered when the image inputs stack vertically at `768px`.

### 5. Dashboard & Charts

`src/styles/Dashboard.css` and `src/components/SkillsDashboard.css`

- `.dashboard-container` is a 2-column grid (`1fr 320px`) on desktop. At `1024px` it collapses to a single column and the sidebar (`.dashboard-sidebar`) switches from `position: sticky` to `position: static`.
- `.dashboard-grid` (the chart grid) uses `repeat(auto-fit, minmax(350px, 1fr))`, so charts naturally reflow from multiple columns to one as the viewport shrinks — at `768px` it's forced to a single column with reduced gap/padding.
- Chart containers use `recharts`' `ResponsiveContainer`, so chart SVGs always fill `.chart-wrapper`, which has a fixed `height` that decreases at `768px` (250px) and `480px` (220px) to keep charts proportionate on small screens.
- Dashboard header text (`h2`, `.subtitle`) scales down at `768px` and `480px`.

### 6. PDF Export Always Uses the Desktop Layout

`src/utils/pdfExport.js`

A key requirement is that the **exported PDF must always match the desktop preview**, even if the user triggers the export from a tablet or phone.

This is handled in `exportToPDF()` via the `html2canvas` options:

```js
html2canvas: {
  scale: 2,
  useCORS: true,
  logging: false,
  // Force desktop layout for the PDF regardless of the device/viewport
  // the export is triggered from, so responsive (tablet/mobile) CSS
  // rules don't apply to the rendered document.
  windowWidth: 1200,
  windowHeight: element.scrollHeight
}
```

By setting `windowWidth: 1200`, `html2canvas` renders the cloned `.cv-document` as if the browser viewport were 1200px wide. Since all responsive breakpoints in `Preview.css` are `≤1024px`, none of them apply during rendering — the PDF always reflects the desktop `.cv-document` layout, independent of the actual device screen size.

## File Reference

```
src/
├── components/
│   ├── Navbar.jsx              # Hamburger menu state + markup
│   ├── Navbar.css              # Navbar responsive styles (768px breakpoint)
│   ├── SkillsDashboard.css     # Chart grid + chart height breakpoints
│   └── forms/
│       ├── PersonalDetailsForm.css
│       ├── SkillsForm.css
│       ├── ProjectsForm.css
│       └── EducationForm.css   # Shared list-item styles (Education/Experience/Certifications/Languages)
├── pages/
│   └── Editor.jsx              # Uses shared .editor class from index.css
├── styles/
│   ├── index.css               # Global overflow safety, .main-content, .home, .editor
│   ├── Preview.css              # .cv-document word-break + responsive padding
│   └── Dashboard.css            # Dashboard grid + sidebar collapse
└── utils/
    └── pdfExport.js             # windowWidth: 1200 forces desktop layout in PDF
```

## Testing Checklist

When making further layout changes, verify at these widths:

- **Desktop:** 1280px+
- **Tablet:** 1024px and 768px
- **Phone:** 375px and 320px

For each page (`/`, `/editor`, `/preview`, `/dashboard`):
- No horizontal scrollbar (`document.documentElement.scrollWidth === clientWidth`)
- Navbar hamburger opens/closes and closes on navigation (≤768px)
- Long text (names, emails, URLs, descriptions) wraps instead of overflowing
- Form list items (skills, projects, education, etc.) remain usable and don't clip action buttons
- Dashboard charts remain visible and proportionate
- PDF export (from any viewport) renders using the desktop layout

## Summary

The responsive implementation provides:
- ✅ Consistent buttons, cards, and form styling across all breakpoints
- ✅ A collapsible hamburger menu for tablet/phone navigation
- ✅ Zero horizontal overflow, even with long user-entered text
- ✅ Single-column reflow for forms, dashboard grid, and CRUD list items on small screens
- ✅ A desktop-locked PDF export regardless of the device used to generate it
