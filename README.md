# DevProfile CV Builder

DevProfile CV Builder is a React application for creating, editing, previewing, and exporting professional CVs in PDF format.

This repository is used to organize the development of the final Web Technologies / React project. The current README is not the final documentation; its purpose is to guide the team during development and keep the workflow consistent.

---

## Short Project Summary

The application allows users to enter professional information, manage CV sections dynamically, preview the generated CV, and export the final result as a professional PDF.

Main features planned:

* CV editor with dynamic forms.
* Web preview of the generated CV.
* PDF export.
* Skills chart.
* Dark mode.
* Local data persistence.
* Form validations.
* Organized React component structure.

---

## Tech Stack

* React
* Vite
* JavaScript
* React Router DOM
* LocalStorage
* CSS
* PDF generation library
* Chart library

---

## Suggested Project Structure

```text
src/
├── components/
├── pages/
├── context/
├── hooks/
├── utils/
├── styles/
├── App.jsx
└── main.jsx
```

---

## Team Workflow

To keep the repository organized, every team member must work using branches and standardized commits.

Direct commits to the `main` branch should be avoided unless the team agrees otherwise.

Recommended workflow:

1. Create a new branch for the task.
2. Work only on that branch.
3. Make clear and small commits.
4. Push the branch to GitHub.
5. Open a Pull Request when the task is ready.
6. Review changes before merging into `main`.

---

## Branch Naming Convention

Use short and descriptive branch names.

| Branch Type          | Example                    |
| -------------------- | -------------------------- |
| Feature branch       | `feature/cv-editor`        |
| Bug fix branch       | `fix/pdf-export-error`     |
| Refactor branch      | `refactor/forms-structure` |
| Documentation branch | `docs/update-readme`       |
| Styling branch       | `style/dark-mode-layout`   |

---

## Commit Message Convention

All commits must follow this structure:

```text
type(scope): short description
```

Example:

```text
feat(editor): add personal information form
```

The description should be short, clear, and written in English.

---

## Commit Types

| Type       | Use Case                                          | Example                                         |
| ---------- | ------------------------------------------------- | ----------------------------------------------- |
| `feat`     | Adds a new feature                                | `feat(editor): add skills form`                 |
| `fix`      | Fixes a bug or error                              | `fix(pdf): correct profile image rendering`     |
| `refactor` | Improves code structure without changing behavior | `refactor(forms): simplify validation logic`    |
| `docs`     | Updates documentation                             | `docs(readme): add commit guidelines`           |
| `style`    | Changes visual styles without modifying logic     | `style(theme): improve dark mode colors`        |
| `chore`    | General maintenance tasks                         | `chore(project): update dependencies`           |
| `test`     | Adds or updates tests                             | `test(validations): add email validation tests` |
| `perf`     | Improves performance                              | `perf(preview): optimize CV rendering`          |
| `build`    | Changes build configuration or dependencies       | `build(vite): configure production build`       |
| `ci`       | Changes continuous integration configuration      | `ci(github): add workflow for build check`      |
| `revert`   | Reverts a previous commit                         | `revert(editor): remove invalid form change`    |

---

## Push Guidelines

Before pushing changes, check the following:

* The project runs without errors.
* The code belongs to the correct branch.
* The commit message follows the required format.
* The change is related to a specific task.
* Unnecessary files are not included.
* The application still works after the change.

Recommended commands:

```bash
git status
git add .
git commit -m "feat(editor): add personal information form"
git push origin feature/cv-editor
```

---

## Pull Request Guidelines

Each Pull Request should include:

* A short title.
* A brief description of the change.
* Screenshots if the change affects the interface.
* Notes about pending work, if needed.

Example Pull Request title:

```text
feat(editor): add personal information form
```

Example Pull Request description:

```text
This pull request adds the personal information form to the CV editor view. It includes controlled inputs for name, profession, email, phone, location, and professional summary.
```

---

## Development Rules

* Do not place all logic inside `App.jsx`.
* Use reusable components.
* Keep files organized by responsibility.
* Validate forms before saving data.
* Avoid duplicate skills and projects.
* Keep commits small and meaningful.
* Do not push broken code to `main`.
* Update the README when workflow decisions change.

---

## Project Status

```text
Status: In development
```

---

## Team Members

```text
Oscar Iván Gomez Ruiz
Azael Fajardo Espino
Uriel Ezequiel Ortiz Rosales
```

---

## Deployment

```text
Pending deployment link
```
