# Dark Mode Implementation Guide

## Overview

The DevProfile CV Generator now includes a comprehensive dark mode feature that provides a seamless user experience across all pages and components. The theme preference is automatically saved to localStorage, so users' choice persists across browser sessions.

## How It Works

### 1. Theme Context System

The dark mode is managed through a **ThemeContext** (`src/context/ThemeContext.jsx`) that:

- Manages the theme state (`isDark` boolean)
- Provides a `toggleTheme()` function to switch between light and dark modes
- Automatically detects system preference if no saved preference exists
- Persists the theme choice to localStorage with the key `theme-mode`
- Updates the DOM's `data-theme` attribute for CSS-based styling

**Theme Detection Priority:**
1. Check localStorage for saved preference (`theme-mode`)
2. Fall back to system preference using `prefers-color-scheme` media query
3. Default to light mode if no preference is found

### 2. Theme Toggle Button

The **Navbar** component includes a theme toggle button with emoji indicators:
- **🌙** (Moon) - Click to switch to dark mode
- **☀️** (Sun) - Click to switch to light mode

The button is accessible (includes `aria-label`) and provides visual feedback on hover.

### 3. CSS Variable System

The styling system uses CSS custom properties for all colors, allowing dynamic theme switching without page reload:

**Light Mode Variables** (`:root`):
```css
--color-primary: #2563eb
--color-bg: #f9fafb
--color-text: #111827
--color-text-light: #6b7280
--color-border: #e5e7eb
--color-white: #ffffff
--color-surface: #ffffff
--color-surface-dark: #f3f4f6
```

**Dark Mode Variables** (`[data-theme="dark"]`):
```css
--color-bg: #0f172a
--color-text: #f1f5f9
--color-text-light: #cbd5e1
--color-border: #334155
--color-white: #1e293b
--color-surface: #1e293b
--color-surface-dark: #0f172a
```

### 4. Component Integration

All components automatically support dark mode through:

- **CSS Variables**: Form inputs, containers, and text use CSS variables instead of hard-coded colors
- **Theme-Specific Selectors**: Some elements use `[data-theme="dark"]` selectors for color adjustments
- **useTheme Hook**: Components can access the theme state via the custom `useTheme()` hook if needed

**Example Usage in Components:**
```jsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div>
      <button onClick={toggleTheme}>
        Toggle to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

### 5. Pages and Components with Dark Mode Support

All pages and components have been updated to support dark mode:

**Pages:**
- ✅ Home
- ✅ Editor (with all forms)
- ✅ Preview
- ✅ Dashboard
- ✅ About

**Components:**
- ✅ Navbar (with toggle button)
- ✅ SkillsDashboard
- ✅ SkillsOverview
- ✅ All forms (PersonalDetails, Education, Experience, Projects, Skills, Languages, Certifications)

**Features:**
- Ensures text readability in both modes
- Maintains visual hierarchy and structure
- Smooth transitions between theme changes
- Accessible color contrasts for both modes

## File Structure

```
src/
├── context/
│   ├── ThemeContext.jsx          # Theme context provider
│   ├── CVContext.jsx             # Existing CV context
│   └── CVContextCore.js          # Core CV context
├── hooks/
│   └── useTheme.js               # Custom hook for theme access
├── components/
│   ├── Navbar.jsx                # Updated with toggle button
│   ├── Navbar.css                # Navbar styles
│   └── forms/                    # All forms with dark mode support
├── styles/
│   ├── index.css                 # Root CSS variables + dark mode
│   ├── Preview.css               # Updated with dark mode
│   └── Dashboard.css             # Updated with dark mode
└── App.jsx                       # Updated to use ThemeProvider
```

## localStorage Details

The app automatically saves and loads the theme preference:

**Storage Key:** `theme-mode`

**Possible Values:**
- `"light"` - Light mode is enabled
- `"dark"` - Dark mode is enabled

**Persistence:**
- Preference is saved immediately when the toggle button is clicked
- Preference is restored automatically when the user returns to the app

## Browser Compatibility

Dark mode works on all modern browsers with support for:
- CSS Custom Properties (CSS Variables)
- localStorage API
- CSS media queries (`prefers-color-scheme`)

## Accessibility Considerations

✅ **Color Contrast:** All text maintains WCAG AA contrast standards in both modes
✅ **Accessible Toggle:** Button includes `aria-label="Toggle dark mode"`
✅ **System Preference Respect:** Falls back to user's system preference
✅ **No Forced Preference:** Users can override system preference

## Performance

- **Zero Runtime Cost:** Theme switching uses CSS variables (instant update)
- **No Page Reload:** Changes apply immediately without refresh
- **Minimal Storage:** Only saves a 5-character preference string
- **Efficient CSS:** Uses cascading selectors instead of JavaScript-based theming

## Future Enhancements

Potential improvements for future versions:

1. **Theme Customization Panel** - Allow users to customize specific colors
2. **Auto Mode** - Automatically switch based on time of day
3. **Color Scheme Options** - Provide multiple dark/light variants
4. **Contrast Adjustment** - High contrast mode for accessibility
5. **Transition Timing** - Customizable fade duration for theme switching

## Troubleshooting

**Theme not persisting?**
- Check browser's localStorage is enabled
- Clear cache and try again
- Check browser console for any errors

**Colors look different from screenshot?**
- Ensure your browser CSS rendering is up to date
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check that CSS files have been properly compiled

**Toggle button not working?**
- Verify ThemeProvider wraps your entire app in App.jsx
- Check that useTheme is being called within a ThemeProvider
- Look for JavaScript errors in browser console

## Code Examples

### Access Theme in Any Component

```jsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { isDark } = useTheme();
  
  return <div>{isDark ? 'Dark Mode' : 'Light Mode'}</div>;
}
```

### Using CSS Variables

```css
.my-component {
  background-color: var(--color-white);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

/* Dark mode automatically applied */
[data-theme="dark"] .my-component {
  /* Redefine colors if needed, or inherit from variables */
}
```

## Summary

The dark mode implementation provides:
- ✅ Seamless theme switching across all pages
- ✅ Persistent user preference via localStorage
- ✅ System preference detection
- ✅ Accessible, readable design in both modes
- ✅ Easy integration with new components
- ✅ High performance with no page reloads
- ✅ Future-proof CSS variable system
