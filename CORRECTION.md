# CORRECTION.md

## 1. General Project Context

Form-specific CSS plus global styles.

General objective:

- Capture professional information.
- Modify information.
- Delete information.
- Persist CV data.
- Provide a base for CV preview.
- Provide a base for future PDF export.

Current state:

- The React/Vite base exists.
- The main routes exist.
- A global CV context exists.
- Functional forms exist for personal details, skills, projects, education, certifications, experience, and languages.
- Persistence is connected to global state through `localStorage`.
- `Preview`, `Dashboard`, and `About` exist, but they are placeholder pages.
- Compilation was not initially verifiable before dependencies were installed.


Incomplete or risky parts:

- Build/lint/dev verification before installing dependencies.
- Profile image validation before saving.
- Consistency between `personalData` professional links and the unused `professionalLinks` field.
- Fully blocking validation in personal details.
- Real CV preview.
- Real dashboard.
- PDF export.

## 2. Real Project Structure

| Path / file | Detected function | State | Notes |
| ----------- | ----------------- | ----- | ----- |
| `package.json` | Defines scripts, dependencies, and devDependencies | Exists | React project with Vite, React Router DOM, and ESLint |
| `package-lock.json` | Dependency lockfile | Exists | Dependencies can be installed from it |
| `vite.config.js` | Vite configuration | Exists | Uses `@vitejs/plugin-react` |
| `eslint.config.js` | ESLint configuration | Exists | Configures JS/JSX and React Hooks rules |
| `index.html` | Vite base HTML | Exists | Expected React mount point |
| `AZAEL_TASKS_AUDIT.md` | Previous analysis of Azael's first 9 tasks | Exists | Used as a base and code was rechecked |
| `src/main.jsx` | React entry point | Exists | Mounts `BrowserRouter`, `CVProvider`, and `App` |
| `src/App.jsx` | Main layout and routes | Exists | Declares the five required routes |
| `src/context/CVContext.jsx` | Global state and persistence | Exists | Defines `CVProvider`, `cvData`, and `updateCVData` |
| `src/context/CVContextCore.js` | Shared context object | Exists after correction | Keeps Fast Refresh compliant |
| `src/context/useCV.js` | Context consumer hook | Exists after correction | Exposes `useCV` |
| `src/components/Navbar.jsx` | Main navigation | Exists | Uses `Link` for declared routes |
| `src/pages/Home.jsx` | Home page | Exists | Basic placeholder page |
| `src/pages/Editor.jsx` | CV editor page | Exists | Mounts all main forms |
| `src/pages/Preview.jsx` | Preview page | Exists | Placeholder; does not yet consume CV data |
| `src/pages/Dashboard.jsx` | Dashboard page | Exists | Placeholder; no stats yet |
| `src/pages/About.jsx` | About page | Exists | Basic informational page |
| `src/components/forms/PersonalDetailsForm.jsx` | Personal details and image form | Exists | Corrected with final save and image validation |
| `src/components/forms/SkillsForm.jsx` | Skills CRUD | Exists | Add/edit/delete, duplicate validation, and level validation |
| `src/components/forms/ProjectsForm.jsx` | Projects CRUD | Exists | Add/edit/delete, URL validation, duplicate validation, and technology normalization |
| `src/components/forms/EducationForm.jsx` | Education CRUD | Exists | Add/edit/delete |
| `src/components/forms/CertificationsForm.jsx` | Certifications/courses CRUD | Exists | Add/edit/delete |
| `src/components/forms/ExperienceForm.jsx` | Experience CRUD | Exists | Add/edit/delete |
| `src/components/forms/LanguagesForm.jsx` | Languages CRUD | Exists | Add/edit/delete and duplicate validation |
| `src/utils/validations.js` | Reusable validation helpers | Exists | Connected to forms after correction |
| `src/styles/index.css` | Global styles | Exists | Base layout and navbar |
| `src/components/forms/PersonalDetailsForm.css` | Personal form styles | Exists | Includes error, status, image, and action styles |
| `src/components/forms/SkillsForm.css` | Skills form styles | Exists | Includes list, buttons, and errors |
| `src/components/forms/ProjectsForm.css` | Projects form styles | Exists | Includes list, thumbnail, and buttons |
| `src/components/forms/EducationForm.css` | Shared styles for secondary forms | Exists | Reused by education, certifications, experience, and languages |
| `src/hooks/.gitkeep` | Keeps `hooks` folder | Exists | No real hook implemented there |
| `src/assets/.gitkeep` | Keeps `assets` folder | Exists | No real assets |

## 3. Routes

| Route | Component | Exists | State | Notes |
| ----- | --------- | ------ | ----- | ----- |
| `/` | `Home` | Yes | Correct | Declared in `src/App.jsx` and linked from `Navbar` |
| `/editor` | `Editor` | Yes | Correct | Mounts all CV capture forms |
| `/preview` | `Preview` | Yes | Review | Exists as placeholder; does not yet display CV data |
| `/dashboard` | `Dashboard` | Yes | Review | Exists as placeholder; does not yet display statistics |
| `/about` | `About` | Yes | Correct | Basic informational page |

Details:

- Uses `react-router-dom`, declared in `package.json`.
- `BrowserRouter` is configured in `src/main.jsx`.
- `Routes` and `Route` are declared in `src/App.jsx`.
- `Navbar` exists in `src/components/Navbar.jsx`.
- Navbar links match declared routes.

## 4. Global CV State

Context file:

- `src/context/CVContext.jsx`

Provider:

- `CVProvider`

Context hook:

- `useCV` from `src/context/useCV.js`

Initial structure:

- `personalData`
- `profileImage`
- `skills`
- `projects`
- `education`
- `certifications`
- `experience`
- `languages`
- `professionalLinks`

Update function:

- `updateCVData(section, data)`

| CV section | Exists in global state | File | Notes |
| ---------- | ---------------------- | ---- | ----- |
| Personal details | Yes | `src/context/CVContext.jsx` | `personalData` object with main fields |
| Profile image | Yes | `src/context/CVContext.jsx` | Separate `profileImage` field |
| Skills | Yes | `src/context/CVContext.jsx` | `skills` array |
| Projects | Yes | `src/context/CVContext.jsx` | `projects` array |
| Education | Yes | `src/context/CVContext.jsx` | `education` array |
| Certifications / courses | Yes | `src/context/CVContext.jsx` | `certifications` array |
| Experience | Yes | `src/context/CVContext.jsx` | `experience` array |
| Languages | Yes | `src/context/CVContext.jsx` | `languages` array |
| Professional links | Yes | `src/context/CVContext.jsx` | Reserved compatibility field; active GitHub, LinkedIn, and portfolio data live in `personalData` |


## 5. Existing Forms

| Form | File | Detected fields | Adds | Edits | Deletes | Updates context | State |
| ---- | ---- | --------------- | ---- | ----- | ------- | --------------- | ----- |
| Personal details | `src/components/forms/PersonalDetailsForm.jsx` | `fullName`, `jobTitle`, `location`, `email`, `phone`, `github`, `linkedin`, `portfolio`, `about` | Yes | Yes | Not applicable | Yes | Complete |
| Profile image | `src/components/forms/PersonalDetailsForm.jsx` | URL, local file converted to base64 | Yes | Yes | Yes | Yes | Complete |
| Skills | `src/components/forms/SkillsForm.jsx` | `name`, `category`, `level`, `description` | Yes | Yes | Yes | Yes | Complete |
| Projects | `src/components/forms/ProjectsForm.jsx` | `name`, `description`, `technologies`, `repoLink`, `deployLink`, `image` | Yes | Yes | Yes | Yes | Complete |
| Education | `src/components/forms/EducationForm.jsx` | `degree`, `institution`, `startDate`, `endDate`, `description` | Yes | Yes | Yes | Yes | Complete |
| Certifications | `src/components/forms/CertificationsForm.jsx` | `name`, `issuer`, `date`, `url` | Yes | Yes | Yes | Yes | Complete |
| Experience | `src/components/forms/ExperienceForm.jsx` | `role`, `company`, `startDate`, `endDate`, `description` | Yes | Yes | Yes | Yes | Complete |
| Languages | `src/components/forms/LanguagesForm.jsx` | `language`, `level` | Yes | Yes | Yes | Yes | Complete |

Notes:

- `Editor.jsx` mounts all listed forms.
- Personal details now save through a section-level button.
- Profile image can be saved by validated URL, uploaded as a local file, or removed.
- CRUD forms use `editingIndex` for edits.

## 6. Existing Validation

| Validation | Exists | File | Connected to form | Blocks save | Notes |
| ---------- | ------ | ---- | ----------------- | ----------- | ----- |
| Required fields | Yes | `src/utils/validations.js` | Yes | Yes | Connected in personal details and CRUD forms |
| Valid email | Yes | `src/utils/validations.js` | Yes | Yes | Connected in `PersonalDetailsForm` |
| Valid URLs | Yes | `src/utils/validations.js` | Yes | Yes | GitHub, LinkedIn, portfolio, project URLs, and certification URL |
| Minimum length | Yes | `src/utils/validations.js` | Yes | Yes | Connected in relevant personal, skill, project, and secondary fields |
| Maximum length | Yes | `src/utils/validations.js` | Yes | Yes | Connected across forms |
| Valid skill level | Yes | `src/utils/validations.js` | Yes | Yes | `SkillsForm.jsx` uses `isValidSkillLevel` |
| Duplicate skills | Yes | `src/utils/validations.js` | Yes | Yes | `SkillsForm.jsx` uses `isDuplicateSkill` |
| Duplicate projects | Yes | `src/utils/validations.js` | Yes | Yes | `ProjectsForm.jsx` uses `isDuplicateProject` |
| Valid profile image | Yes | `src/utils/validations.js` and `PersonalDetailsForm.jsx` | Yes | Yes | Validates URL shape and image load before saving |

## 7. Azael First 9 Tasks Compliance

| Task | Name | State | Evidence | Risk |
| ---- | ---- | ----- | -------- | ---- |
| 1 | Initial project setup | Complete | `npm install`, `npm run build`, and `npm run lint` pass | Low |
| 2 | Main routes and navigation | Complete | `src/App.jsx`, `src/main.jsx`, `src/components/Navbar.jsx` | Low |
| 3 | Global CV state | Complete | `src/context/CVContext.jsx`, `CVProvider`, `useCV` | Low |
| 4 | Persistence with localStorage | Complete | `CVContext.jsx` reads/writes `cvData` and normalizes saved data | Low |
| 5 | Personal details and profile image form | Complete | `PersonalDetailsForm.jsx` validates and saves personal details and image | Low |
| 6 | Skills form | Complete | `SkillsForm.jsx` keeps CRUD, levels, and duplicates | Low |
| 7 | Projects form | Complete | `ProjectsForm.jsx` keeps CRUD, URLs, duplicates, and technologies array | Low |
| 8 | Education, certifications, experience, and languages form | Complete | Secondary forms keep add/edit/delete | Low |
| 9 | General validation | Complete | `validations.js` and forms connect required fields, URLs, min/max, duplicates, and levels | Low |

## 8. Recommended Correction Guide

Recommended order for any future correction:

1. Keep build/lint green.
2. Avoid changing routes unless required.
3. Keep `personalData` as the source of truth for GitHub, LinkedIn, and portfolio.
4. If `professionalLinks` is used later, add an explicit migration.
5. Keep `projects[].technologies` as an array for preview/dashboard/PDF.
6. Add date validation only if the final rubric requires it.
7. Add automated tests if the project introduces a test setup.
8. Let Oscar consume the stable `cvData` model for preview, dashboard, and PDF.

Do not do yet:

- Do not implement PDF export in Azael's scope.
- Do not implement dark mode in Azael's scope.
- Do not implement the skills chart in Azael's scope.
- Do not rename routes without a clear requirement.

## 9. Commands Run or Recommended

| Command | Run | Result | Notes |
| ------- | --- | ------ | ----- |
| `npm install` | Yes | Successful | Installed dependencies, 0 vulnerabilities |
| `npm run build` | Yes | Successful | Final build passes |
| `npm run lint` | Yes | Successful | Final lint passes |
| `npm run dev` | Yes | Successful | Verified locally on port `5299` because nearby ports showed another app |

