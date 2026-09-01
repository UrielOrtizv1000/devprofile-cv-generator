# Security Audit

**Date:** 2026-09-01

A security review of this repository was conducted. Findings were remediated and verified with a production build.

## Findings remediated

- **Outdated dependency with known vulnerabilities** — `react-router-dom` was within a version range affected by published advisories (XSS, open redirect, DoS). Updated to the patched release (`7.18.3`). `npm audit` now reports **0 vulnerabilities**.
- **GitHub Actions referenced by mutable tags** — the workflow pinned `actions/*` by tag (`@v4`), which can be reassigned. Now pinned to immutable commit SHAs (tag kept as a comment).
- **`main` unprotected** — direct pushes and force-pushes to `main` were allowed. A ruleset now requires pull requests and blocks force-push and branch deletion.
- **Stale branches** — merged `feature/*` and `fix/*` branches were left on the remote. Removed to keep the repository clean.

## Verification

- `npm audit` → **0 vulnerabilities**.
- `npm run build` → succeeds after the dependency update.
- `main` → protected (pull request required, force-push blocked).

## Note

A production-bundle size warning (> 500 kB) was observed but is a performance concern, not a security one. Left as-is.
