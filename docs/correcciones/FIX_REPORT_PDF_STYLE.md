# FIX_REPORT_PDF_STYLE.md

## 1. Summary

The PDF export was redesigned with a Harvard-style professional CV layout. 
The application now keeps the current web preview design for the browser and uses a separate hidden `.pdf-document` template for `html2pdf.js`.

The exported PDF is intended to look formal, clean, compact, and professional instead of copying the card-based visual style from the `/preview` page.

## 2. Modified Files

- `src/pages/Preview.jsx`
- `src/styles/Preview.css`
- `src/utils/pdfExport.js`
- `docs/correcciones/FIX_REPORT_PDF_STYLE.md`

## 3. PDF Layout Changes

- Header changes:
  - Added a PDF-only header with uppercase full name, professional title, and compact contact line.
  - Contact items are joined only when values exist, avoiding duplicated separators.
  - Profile image is included only when `profileImage` exists and is rendered as a small, sober image aligned to the right.

- Section changes:
  - Added PDF-only sections for Professional Profile, Skills, Projects, Education, Certifications, Experience, and Languages.
  - Sections use uppercase titles with thin horizontal rules.
  - Entries use a one-column, text-first structure instead of cards, badges, shadows, or colored panels.

- Typography changes:
  - PDF-only typography uses a formal serif stack with black/dark gray text.
  - Strong colors, shadows, and decorative borders were avoided.

- Margin and spacing changes:
  - PDF export now uses letter portrait format with `0.5in` margins.
  - The PDF template is `7.5in` wide to fit inside letter margins.
  - Spacing is compact but readable.

- Profile image handling:
  - The existing export image waiting/removal logic remains active.
  - If a profile image fails to load in the export clone, it is removed so PDF generation can continue.

- Page-break handling:
  - `html2pdf.js` now avoids page breaks inside `.pdf-header`, `.pdf-section-title`, `.pdf-entry`, and `.pdf-language-item`.

## 4. What Was Not Changed

- Web page visual style.
- Main routes.
- Editor.
- Dashboard.
- Dark mode.
- Form components.
- `cvData` structure.
- `localStorage` keys.
- Existing browser preview `.cv-document` layout.
