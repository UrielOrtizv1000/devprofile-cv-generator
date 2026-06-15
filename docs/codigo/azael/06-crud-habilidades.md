# Task 6: Skills Form

## General Description

This task implemented the skills management form inside the CV editor. It includes all CRUD operations (Create, Read, Update, Delete), strict validations, and full integration with the application's global state.

## Created Components

### `SkillsForm.jsx`

- **Local State Management:** Uses `useState` to manage controlled form data and detect whether the form is in edit or create mode.
- **Integrated Validations:**
  - Verifies that the name and category fields are not empty.
  - Validates the skill level to ensure it is one of the allowed options: `Basic`, `Intermediate`, `Advanced`, or `Expert`.
  - Prevents duplicate skills by checking exact name matches while ignoring case, so "React" and "react" are treated as the same skill.
- **CRUD Operations:**
  - **Create:** Adds a new skill to global state.
  - **Read:** Displays a dynamic list of added skills, including their main information and a level badge.
  - **Update:** Loads a skill into the form so it can be modified. The submit button changes to "Update Skill" while editing.
  - **Delete:** Removes the selected skill from the list.

### `SkillsForm.css`

- Created styles consistent with `PersonalDetailsForm`, including soft borders, shadows, and CSS Grid layout.
- Added responsive media queries so the form changes from two columns to one column on mobile devices.
- Added action button color transitions for better visual feedback on hover.

## Modifications

### `Editor.jsx`

- Imported the new `SkillsForm` component.
- Added it immediately below `PersonalDetailsForm`, keeping the editor page modular and clean.

## Global State Integration

The component uses the `useCV` hook imported from `CVContext` to:

1. Read the current `skills` list from `cvData.skills`.
2. Update the list after a change by using `updateCVData('skills', newSkills)`.

## Workflow And Good Practices

- **Branch:** All work was completed in the `feature/skills-crud` branch.
- **Signed Commit:** The changes were included in a single descriptive signed commit: `feat: add skills CRUD form with validation`.
- **Clean Code:** Clear semantic variable names and short English comments were used to keep the code natural and professional.
