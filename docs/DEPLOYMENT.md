# Deployment Guide

This document explains how to build and deploy the DevProfile React app.

## Current Deploy Status

The real production URL is still pending.

Do not mark deploy as complete until the app is published and the final URL is added here.

## 1. Build The Production Bundle

```bash
npm install
npm run build
```

The build command creates a static production bundle in `dist/`.

## 2. Local Production Preview

```bash
npm run preview
```

Use this after `npm run build` to test the production bundle locally before publishing.

## 3. Deploy On Vercel

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Use these settings:
   - Framework preset: Vite
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy the project.
5. Replace the pending deploy note in this file with the real Vercel URL.

For React Router routes, Vercel should serve the SPA fallback. If direct links refresh to 404, add a `vercel.json` rewrite to point all routes to `/index.html`.

## 4. Deploy On Netlify

1. Push the project to a Git repository.
2. Import the repository in Netlify.
3. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add a SPA redirect if route refreshes fail:

```text
/*    /index.html   200
```

This can be placed in `public/_redirects` before building.

## 5. Deploy On GitHub Pages

If deploying to a subfolder, confirm the `base` option in `vite.config.js`.

For client-side routing, GitHub Pages may need a `404.html` fallback copied from `index.html` after build.

## 6. Final URL

Pending. Add the live app URL here after the deploy exists.

```text
Live App: pending
```

## 7. Final Verification Checklist

- `npm install` completes.
- `npm run lint` passes.
- `npm run build` passes.
- The deployed app opens.
- `/`, `/editor`, `/preview`, `/dashboard`, and `/about` load correctly.
- Browser DevTools has no missing asset or MIME type errors.
- PDF export works from `/preview`.
