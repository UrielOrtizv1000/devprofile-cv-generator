# PDF Export Feature Documentation

## Overview

The PDF export feature allows users to download their CV as a professional PDF document. This implementation uses `html2pdf.js` to convert the rendered CV HTML directly to PDF format on the client side, without requiring any server-side processing.

## Features

- ✅ **Client-side PDF generation** - No server dependency
- ✅ **Profile picture support** - Includes user's profile image in the PDF
- ✅ **Validation** - Ensures all required sections have data before export
- ✅ **Professional layout** - Maintains clean design with proper margins and spacing
- ✅ **Page break optimization** - Prevents overlapped and cropped text
- ✅ **Responsive** - Works across different screen sizes
- ✅ **Error handling** - Clear user feedback for missing required data

## Dependencies

### Required Packages

```json
{
  "dependencies": {
    "html2pdf.js": "^0.10.1"
  }
}
```

**Installation:**
```bash
npm install html2pdf.js
```

### How It Works

The library uses two key dependencies internally:
1. **jsPDF** - Generates PDF documents
2. **html2canvas** - Converts HTML elements to canvas images

These are bundled with `html2pdf.js`, so you don't need to install them separately.

## Implementation Details

### 1. **File Structure**

```
src/
├── utils/
│   └── pdfExport.js          # PDF export utilities
├── pages/
│   ├── Preview.jsx            # Updated with export button
│   └── Preview.css            # Updated with export styles
```

### 2. **Core Functions**

#### `validateCVForExport(cvData)`

**Purpose:** Validates that all required CV sections contain necessary data

**Parameters:**
- `cvData` (Object) - The CV data from the context

**Returns:**
```javascript
{
  isValid: boolean,
  errors: string[]  // Array of validation error messages
}
```

**Validation Rules:**
- Full name is required
- Job title is required
- Email is required
- At least one skill must be added
- At least one education entry must be added
- At least one experience entry must be added

**Example:**
```javascript
const validation = validateCVForExport(cvData);
if (!validation.isValid) {
  console.log(validation.errors); // ["Full name is required", ...]
}
```

#### `exportToPDF(fileName, cvData, fullName)`

**Purpose:** Exports the CV to a PDF file

**Parameters:**
- `fileName` (String) - Base name for the PDF file (without extension)
- `cvData` (Object) - The complete CV data
- `fullName` (String) - Full name for default filename

**Returns:**
```javascript
Promise<{
  success: boolean,
  message: string
}>
```

**Configuration:**
The function uses the following `html2pdf` options:

```javascript
{
  margin: [10, 10, 10, 10],           // 10mm margins on all sides
  filename: "Name_CV.pdf",
  image: {
    type: 'jpeg',
    quality: 0.98                     // High quality images
  },
  html2canvas: {
    scale: 2,                         // 2x scale for better quality
    useCORS: true,                    // Allow cross-origin images
    logging: false,
    windowHeight: element.scrollHeight
  },
  jsPDF: {
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true                    // Compress PDF
  },
  pagebreak: {
    mode: ['avoid-all', 'css', 'legacy'],
    avoid: ['.entry', '.skill-card', '.project-entry', '.language-item']
  }
}
```

**Example:**
```javascript
const result = await exportToPDF('John_Doe', cvData, 'John Doe');
if (result.success) {
  console.log('PDF exported successfully');
} else {
  console.error(result.message);
}
```

### 3. **UI Components**

#### Export Button
- Located above the CV preview
- Displays loading state during export
- Shows download icon from `react-icons`
- Disabled state while exporting

#### Error Banner
- Appears when validation fails
- Lists all missing required fields
- Dismissible with close button
- Styled in red for visibility

### 4. **CSS Styling**

#### Export Controls (`.export-controls`, `.export-button`)
- Primary button styling with hover effects
- Flexbox layout for proper alignment
- Responsive sizing

#### Error Banner (`.export-error-banner`, `.error-*`)
- Red-themed error notification
- Slide-down animation
- Clear typography hierarchy
- Close button for dismissal

#### Print Styles (`@media print`)
Comprehensive print optimization:
- **Margin Management** - 10mm margins on A4 paper
- **Page Breaks** - Prevents orphaned content
  - Sections avoid page breaks
  - Entries stay together
  - Grid layouts optimize for printing
- **Spacing Optimization** - Reduced gaps for PDF layout
- **Element Hiding** - Export button and error messages hidden
- **Font Scaling** - Adjusted sizes for print
- **Image Handling** - Profile and project images properly sized

### 5. **Workflow**

```
User Clicks Export Button
         ↓
Validate CV Data
         ↓
If Invalid: Show Error Messages (Stop)
If Valid: ↓
Clone CV Element
         ↓
Configure PDF Options
         ↓
Generate PDF using html2canvas → jsPDF
         ↓
Download PDF File
```

## Usage

### For Users

1. **Fill in Required Information**
   - Personal Details (name, job title, email)
   - Add at least one skill
   - Add at least one education entry
   - Add at least one experience entry

2. **Navigate to Preview**
   - View the formatted CV

3. **Click "Export as PDF"**
   - Validation runs automatically
   - If validation passes: PDF downloads
   - If validation fails: Error message displays with missing fields

### For Developers

**Integrate Export in Other Pages:**

```javascript
import { validateCVForExport, exportToPDF } from '../utils/pdfExport';

// Check if CV is ready for export
const validation = validateCVForExport(cvData);

// If valid, trigger export
if (validation.isValid) {
  await exportToPDF('filename', cvData, fullName);
}
```

## Technical Specifications

### PDF Output

| Aspect | Specification |
|--------|---------------|
| Format | A4 Portrait |
| Margins | 10mm all sides |
| Image Quality | 98% JPEG |
| Render Scale | 2x for clarity |
| Compression | Enabled |
| File Size | 200-800KB (depends on images) |

### Browser Support

- ✅ Chrome/Edge 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Opera 47+
- ⚠️ IE 11 (limited support)

**Limitations:**
- Cross-origin images must have CORS headers
- Large images may increase PDF size
- Very long CVs may require multiple pages

## Troubleshooting

### Common Issues

**1. "Full name is required" error**
- Solution: Go back to Personal Details form and enter a name

**2. PDF download doesn't start**
- Check browser's download settings
- Ensure pop-ups aren't blocked
- Try a different browser

**3. Images don't appear in PDF**
- Ensure image URLs are accessible
- Check CORS configuration on image server
- Use local images when possible

**4. Text appears cut off or overlapped**
- The print CSS should prevent this
- Try exporting again
- Check if content exceeds page width

### Debug Mode

Enable logging by modifying `pdfExport.js`:

```javascript
html2canvas: {
  logging: true,  // Change from false to true
  // ... other options
}
```

This will show detailed console messages during PDF generation.

## Performance Considerations

- **File Size**: PDFs are typically 200-800KB
- **Generation Time**: 2-5 seconds depending on CV complexity
- **Memory**: Requires temporary canvas rendering
- **Network**: No server requests (client-side only)

## Future Enhancements

Possible improvements for future versions:

1. **Template Selection** - Multiple PDF layout styles
2. **Font Customization** - Choose different fonts
3. **Color Themes** - Dark/light modes for PDF
4. **Section Toggles** - Hide/show specific sections in export
5. **Preview Before Export** - Show PDF preview before download
6. **Multiple Formats** - Export to DOCX, RTF, etc.
7. **Cloud Storage** - Save to Google Drive, Dropbox

## References

- [html2pdf.js GitHub](https://github.com/eKoopmans/html2pdf.js)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [html2canvas Documentation](https://html2canvas.hertzen.com/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Verify all required CV sections are filled
4. Try clearing browser cache and re-exporting
