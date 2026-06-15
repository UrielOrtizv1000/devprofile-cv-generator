# Task 5: Personal Details Form And Profile Image

## Summary

This task implemented the controlled form for managing the user's personal information and profile image, linking it to the application's global context so it remains persistent and available to other components.

## Completed Changes

### 1. Global State Update (`CVContext.jsx`)

- Extended the initial `personalData` state to explicitly include the requested fields: `github`, `linkedin`, and `portfolio`.
- This makes the complete personal information live in one accessible structure.

### 2. Form Creation (`PersonalDetailsForm.jsx` and `PersonalDetailsForm.css`)

- **Controlled Fields:** Created a form component with controlled inputs for:
  - Full name.
  - Profession or area.
  - Location.
  - Email address.
  - Phone number.
  - Professional links: GitHub, LinkedIn, and portfolio.
  - Professional profile text area.
- **Styles:** Applied a clean two-column responsive layout that collapses to one column on mobile, using modular CSS.

### 3. Profile Image Management

- **Dual Support:** The profile image can be set in two ways:
  1. **URL:** Useful for linking images already hosted on the web.
  2. **File Upload:** Allows selecting an image from the computer. The file is read with `FileReader` and converted to Base64 so it can be stored in state and `localStorage`.
- **Visual Error Prevention:** Used `object-fit: cover` with a circular container to avoid layout breaks when images have different proportions.
- **Broken Image Handling:** Added an `onError` handler to the `<img>` tag. If the provided URL is invalid or fails to load, the image is hidden and a clear error message is shown to the user.
- **Upload Bugfix:** Added a manual reset of the `input type="file"` value in its `onClick` event. This ensures that if the user uploads an image, changes it to a URL, and then tries to upload the exact same local image again, the browser correctly fires the change event.

### 4. Editor Integration (`Editor.jsx`)

- The form was imported and instantiated on the Editor page, allowing immediate editing of personal information. Because it is connected to global context, any change is reflected automatically and persists after reloading the page.

### 5. Version Control

- **Branch:** All development was completed in the isolated `feature/personal-profile-form` branch.
- **Commit:** The changes were committed with:

  `feat: add personal profile form with avatar support`
