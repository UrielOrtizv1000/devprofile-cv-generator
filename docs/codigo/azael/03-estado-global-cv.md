# Task 3: Global CV State

## Objective

Create a centralized context or state system to store and manage CV information across the whole application, allowing any component to read and update the data.

## Defined Data Structure

An initial data model was defined with:

- Personal data: name, role, email, phone, location, and about text.
- Profile image.
- Skills.
- Projects.
- Education, courses, or certifications.
- Experience.
- Languages.
- Professional links.

## Completed Steps

1. **Branch creation:**
   The `feature/cv-context` branch was created and used to isolate this task from the main branch.

2. **Context creation (`src/context/CVContext.jsx`):**
   - Used React `createContext`.
   - Configured global state with the data structure described above.
   - Integrated data persistence with `localStorage` so information is not lost after refreshing the page.
   - Added an `updateCVData` function to update specific CV sections easily.
   - Created a custom `useCV` hook so components can consume the context simply.

3. **Application integration (`src/main.jsx`):**
   - Imported `CVProvider` and wrapped `<App />` so global state was available across all routes and components.

4. **Version control:**
   - Created a signed commit with the suggested message: `feat: add CV context and initial data model`.

## Result

The project now has a robust, persistent, and natural system for managing dynamic portfolio information, ready to be consumed by future UI tasks.
