# Task 4: localStorage Persistence

## Objective

The main objective of this task was to ensure that CV information entered by the user is not lost when the web page reloads. To achieve this, data persistence was implemented with the browser `localStorage` API.

## Implementation

### 1. Working Environment

All changes were developed and integrated in the isolated `feature/local-storage` branch, avoiding direct changes to `main` according to the project's good practices.

### 2. Modified File

The core change is in `src/context/CVContext.jsx`, which is responsible for managing the application's global state.

### 3. Technical Change Details

- **Lazy State Initialization:**
  The `useState` hook for `cvData` was modified. Instead of passing a blank initial state (`initialCVData`) directly, it now receives a function that runs once when the application loads. This function reads `localStorage` using the `'cvData'` key. If previously saved information exists, it restores it with `JSON.parse`; otherwise, it loads the empty initial structure.

- **Automatic Synchronization (`useEffect`):**
  A `useEffect` hook was added with `cvData` as a dependency. Whenever the user adds, edits, or deletes CV data through the components, this effect runs automatically and overwrites `localStorage` with the latest information using `JSON.stringify`.

- **Error Prevention (`try/catch`):**
  `localStorage` interactions were wrapped in `try/catch` blocks. If the browser has strict privacy policies, such as advanced incognito mode, and blocks storage access, the application logs the error instead of crashing the user screen.

### 4. Code Style

The instruction to write concise English comments was respected to keep the code natural and professional.

### 5. Commit

The changes were saved in a signed commit with the recommended message:

`feat: persist CV data with localStorage`

## Results

The application now has a robust and simple mechanism where any progress made while creating a CV is saved instantly, providing a smooth, professional, and persistent user experience.
