# Task 7: Projects Form

## Implementation Summary

A CRUD system (Create, Read, Update, Delete) was implemented for portfolio projects in the CV application. All functionality was developed in the `feature/projects-crud` branch.

## Created And Modified Components

1. **`src/components/forms/ProjectsForm.jsx`**
   - Created this new component to manage the project form.
   - Added the required fields: Name, Description, Technologies, Repository URL, Deploy URL, and Image URL.
   - Implemented basic validations to prevent empty required fields such as name and description.
   - Implemented URL validation with the native JavaScript `new URL()` API.
   - Prevented duplicate projects based on project name.
   - Connected to global context (`CVContext`) to read existing projects and save/update them globally, which also persists them in `localStorage`.

2. **`src/components/forms/ProjectsForm.css`**
   - Created specific styles for this form while keeping consistency with `SkillsForm`.
   - Ensured input fields explicitly keep a white background and dark text to preserve a consistent light mode design.

3. **`src/components/forms/PersonalDetailsForm.css`**
   - Corrected a dark global style inheritance issue that affected Personal Details form inputs.
   - Forced background and text colors on inputs and textareas so they display correctly in light mode.

4. **`src/pages/Editor.jsx`**
   - Imported and rendered the new `<ProjectsForm />` component below `<SkillsForm />`.

5. **`.gitignore`**
   - Included the current task file (`Tarea 7.md`) in exceptions so it could be tracked locally without being pushed to the remote GitHub repository if pushed later, as requested.

## Commits

A single signed commit was created to group all changes under the recommended naming convention:

`feat: add projects CRUD form with URL validation`
