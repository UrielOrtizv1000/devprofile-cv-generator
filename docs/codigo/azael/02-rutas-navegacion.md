# Task 2: Main Routes And Navigation

This task configured application routing and created the base structure for the different views.

## 1. Working Branch

The recommended branch was created and used: `feature/routing-navigation`.

## 2. Navigation Configuration

- Imported and configured `BrowserRouter` in `main.jsx` to wrap the application.
- Configured routes in `App.jsx` using `Routes` and `Route` from `react-router-dom`.

## 3. Page Creation And Route Assignment

The following routes were configured and linked to their respective components. The components were left with a basic structure so Oscar could continue working on them later:

- `/` -> `Home.jsx`
- `/editor` -> `Editor.jsx`
- `/preview` -> `Preview.jsx`
- `/dashboard` -> `Dashboard.jsx`
- `/about` -> `About.jsx`

## 4. Navbar Component

- Updated `Navbar.jsx`.
- Replaced traditional anchor tags (`<a>`) with the `<Link>` component from `react-router-dom` to allow internal navigation without reloading the page.
- Added brief English comments to keep the code clean and professional.

## 5. Version Control

After the changes were completed and validated with a successful build, a signed commit was created with the requested message:

`feat: add main routes and navigation layout`
