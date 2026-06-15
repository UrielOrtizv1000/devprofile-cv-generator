# Task 9: General Validations - Implementation Report

This task implemented a robust and reusable form validation system across the application, ensuring that data entered by the user is valid before it is saved in global context (`CVContext`) and therefore in LocalStorage.

The completed work is detailed below.

## 1. Reusable Validation Utility

The `src/utils/validations.js` file was created to centralize system validation logic. This avoids repeated code and makes future maintenance easier.

**Implemented functions:**

- `isValidEmail`: Validates that text follows the standard email format using regular expressions (RegEx).
- `isValidUrl`: Uses the native JavaScript `URL` API to validate correct link formats, such as GitHub repositories or LinkedIn profiles.
- `isRequired`: Validates that a required field has at least one character and is not empty.
- `hasMinLength` / `hasMaxLength`: Limit text length to prevent overflow or invalid input.
- Business validation helpers: `isValidSkillLevel`, `isDuplicateSkill`, and `isDuplicateProject`, which validate whether an item has already been added while ignoring case and whether levels such as Expert or Advanced are valid.

## 2. Component Implementation

### Personal Details Form (`PersonalDetailsForm.jsx`)

- Implemented local state (`localData`) to temporarily store changes while the user types.
- Validations run dynamically on `onChange` and `onBlur`.
- Global context is updated only when required fields (*Full Name*, *Profession/Area*, *Email*) and URL/email formats are correct.
- Added visual feedback: fields with errors are highlighted in red with the `.input-error` class and display a message below describing the problem.

### CRUD Forms (Skills, Projects, Education, Experience, Certifications, Languages)

- Instead of blocking typing, form submission is intercepted in `handleSubmit`.
- When adding or updating an item, data is passed through the `validations.js` checks.
- **Duplicate Prevention:** If the user tries to add a skill such as *React* or a project that already exists in the list, the action is blocked and a clear on-screen error is shown.
- Critical fields such as company names, degrees, certification names, and languages were marked as required.
- Project and certification URLs must be well-formed links.

## 3. Error Handling And User Experience

- The `.error-text` class was standardized and `.input-error` was added to CSS files such as `PersonalDetailsForm.css` so error messages remain visually consistent.
- Messages are written in professional, concise English.

## 4. Version Control

- The code was developed in the `feature/form-validations` branch to isolate changes from production code (`main`).
- The final code was integrated with a signed conventional commit: `feat: add reusable form validations and error messages`.
