# Deployment Guide

This document explains how to build and deploy the DevProfile React app to production, and the configuration changes needed to avoid common runtime errors (such as MIME type errors and blank pages caused by broken asset paths).

## 1. Build the production bundle

```bash
npm install
npm run build
```

This runs `vite build` and outputs the static production files into the `dist/` folder. These are the only files needed for deployment — the app is a static SPA (no server-side runtime required).

## 2. Required configuration changes

### 2.1 `vite.config.js` — `base` path

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
})
```

By default, Vite generates asset URLs (JS, CSS, images) rooted at `/`, e.g. `/assets/index-abc123.js`. If the app is deployed to a path other than the domain root (e.g. `https://example.com/devprofile/`), or served from `file://` / a static host that doesn't map `/` to the app's directory, the browser requests these assets from the wrong location.

This typically fails silently or produces errors like:

```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html".
```

This happens because the asset request 404s and the server returns an HTML error page (with MIME type `text/html`) instead of the JS file, which the browser then refuses to execute as a module.

Setting `base: './'` makes all generated asset paths **relative** to `index.html`, so the app works correctly regardless of the subdirectory it's deployed to.

### 2.2 SPA routing fallback (react-router-dom)

Since this app uses `react-router-dom`, any client-side route (e.g. `/projects`, `/about`) doesn't exist as a real file on the server. If a user refreshes the page on one of these routes, or links directly to it, the host will return a 404 unless it's configured to fall back to `index.html`.

Configuration depends on the hosting provider:

- **Netlify**: add a `_redirects` file in `public/` with:
  ```
  /*    /index.html   200
  ```
- **Vercel**: add a `vercel.json` with a rewrite rule pointing all routes to `/index.html`.
- **GitHub Pages**: copy `index.html` to `404.html` in the `dist/` output as a workaround.
- **Generic Nginx**: use `try_files $uri $uri/ /index.html;` in the server block.

## 3. Deploying

1. Run `npm run build` to generate the `dist/` folder.
2. Upload the contents of `dist/` to your static hosting provider (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, etc.), or point your web server's document root at `dist/`.
3. Configure the SPA fallback as described in [2.2](#22-spa-routing-fallback-react-router-dom) if applicable.
4. Verify the deployed app loads correctly and that browser DevTools shows no MIME type or 404 errors for assets.

## 4. Local verification before deploying

You can preview the production build locally before deploying:

```bash
npm run build
npm run preview
```

This serves the `dist/` folder exactly as it will be served in production, helping catch path/MIME issues early.

## 5. Deployed URL

> _TODO: Add the deployed webapp URL here once available._

[Live App](#)
