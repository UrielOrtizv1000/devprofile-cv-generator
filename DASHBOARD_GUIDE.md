# Skills Dashboard Guide

## Overview

The Skills Dashboard is a dynamic, real-time analytics tool that visualizes and tracks your skills data. It provides comprehensive insights into your skills distribution across multiple dimensions including skill levels, categories, and technical vs. soft skills classification.

## Features

### 1. **Dynamic Visualizations**

The dashboard displays four interactive charts that update automatically when skills are added, edited, or deleted:

#### a. **Skill Levels Distribution (Pie Chart)**
- Shows the percentage breakdown of skills by proficiency level
- Levels: Basic, Intermediate, Advanced, Expert
- Each level has a distinct color for easy identification:
  - Basic: Red (#FF9999)
  - Intermediate: Gold (#FFD700)
  - Advanced: Sky Blue (#87CEEB)
  - Expert: Light Green (#90EE90)

#### b. **Top Skill Categories (Horizontal Bar Chart)**
- Displays the top skill categories sorted by frequency
- Shows both absolute count and percentage
- Helps identify which domains you focus on most

#### c. **Technical vs Soft Skills (Pie Chart)**
- Classifies skills as Technical or Soft based on their category
- Technical (Blue): #4A90E2
- Soft (Red): #E24A4A
- Provides an at-a-glance view of skill distribution type

#### d. **Level Distribution Details (Vertical Bar Chart)**
- Detailed view of how many skills are at each proficiency level
- Uses the same color scheme as the Levels Distribution chart
- Makes it easy to identify where you have strength gaps

### 2. **Skills Overview Sidebar**

Positioned on the right side (or below on mobile), the overview sidebar provides:

- **Total Skills**: Overall count of skills in your profile
- **Average Level**: Calculated average proficiency across all skills (displayed as label + numeric score out of 4.0)
- **Most Common Category**: The category with the most skills
- **Technical Skills %**: Percentage of skills classified as technical

### 3. **Detailed Breakdown Sections**

Below the stat cards, three detailed breakdown sections provide:

- **Skills by Level**: Complete breakdown showing count and percentage for each level
- **Top Categories**: Top 5 most common skill categories with counts and percentages
- **Skill Type Distribution**: Complete distribution between Technical and Soft skills

## Architecture

### Component Structure

```
Dashboard (Page)
├── SkillsDashboard (Main Charts)
│   ├── Recharts Components (PieChart, BarChart, etc.)
│   └── Data from skillsAnalytics.analyzeSkills()
└── SkillsOverview (Sidebar)
    └── Data from skillsAnalytics.analyzeSkills()
```

### Data Flow

```
CVContext (Global Skills Data)
    ↓
useCV() Hook
    ↓
Dashboard Page (retrieves cvData.skills)
    ↓
┌─────────────────────────┬──────────────────────┐
│                         │                      │
SkillsDashboard      SkillsOverview
│                         │
└──────────┬──────────────┴────────┐
           ↓
skillsAnalytics.analyzeSkills()
           ↓
Returns: {
  totalSkills,
  byLevel,
  byCategory,
  byType,
  levelDistribution,
  categoryDistribution,
  typeDistribution,
  averageLevel,
  skills (enriched with type)
}
```

### Real-time Updates

The dashboard automatically updates whenever:
- A new skill is added in the SkillsForm
- An existing skill is edited
- A skill is deleted

This is achieved through React's dependency tracking - both SkillsDashboard and SkillsOverview receive the `skills` array as a prop, and any change to this array triggers re-analysis and re-rendering.

## File Structure

### New Files Created

```
src/
├── utils/
│   └── skillsAnalytics.js          # Core analytics logic
├── components/
│   ├── SkillsDashboard.jsx         # Chart visualizations
│   ├── SkillsDashboard.css         # Dashboard styling
│   ├── SkillsOverview.jsx          # Overview statistics
│   └── SkillsOverview.css          # Overview styling
└── pages/
    ├── Dashboard.jsx                # Updated with new components
    └── Dashboard.css                # Page-level styling
```

## Dependencies

### New Dependency Added

- **recharts** (^2.10.3)
  - Composable charting library for React
  - Used for: PieChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
  - Installation: Added to `package.json` - run `npm install` to download

### Existing Dependencies Used

- **React** (^19.2.6) - Core framework
- **react-icons** (^5.6.0) - Can be used for enhanced UI if needed in future

## Installation & Setup

### 1. Install Dependencies

After updating `package.json`, install the new Recharts library:

```bash
npm install
```

### 2. No Additional Configuration Required

Recharts requires no additional setup beyond installation.

## Key Functions in skillsAnalytics.js

### `analyzeSkills(skills)`
Main function that processes skills array and returns comprehensive analytics.

**Parameters:**
- `skills`: Array of skill objects with properties: `name`, `category`, `level`, `description`

**Returns:** Analytics object with:
- `totalSkills`: Number of skills
- `byLevel`: Object with counts by proficiency level
- `byCategory`: Object with counts by category
- `byType`: Object with counts by skill type (Technical/Soft)
- `averageLevel`: Numeric average level (1-4)
- `levelDistribution`: Array formatted for charts
- `categoryDistribution`: Array formatted for charts
- `typeDistribution`: Array formatted for charts

### `classifySkill(category)`
Classifies a skill category as "Technical" or "Soft" based on predefined technical categories.

**Parameters:**
- `category`: String representing the skill category

**Returns:** "Technical" or "Soft"

### `getLevelColor(level)`
Returns color code for a given proficiency level.

**Parameters:**
- `level`: "Basic", "Intermediate", "Advanced", or "Expert"

**Returns:** Hex color code

### `getTypeColor(type)`
Returns color code for skill type.

**Parameters:**
- `type`: "Technical" or "Soft"

**Returns:** Hex color code

## Technical Implementation Details

### Skill Classification Logic

Skills are classified as Technical if their category matches one of these predefined technical categories:

- Frontend, Backend, Mobile, Database, DevOps, Cloud, AI/ML, Data Science, Security
- Systems, Tools, Programming Languages, Frameworks, Libraries, APIs, Databases, Infrastructure, Version Control, Testing

Any category not matching these is classified as "Soft".

### Average Level Calculation

The average level is calculated using numeric values:
- Basic = 1
- Intermediate = 2
- Advanced = 3
- Expert = 4

Formula: `Sum of all skill level values / Total number of skills`

### Responsive Design

- **Desktop (>1024px)**: Two-column layout (main charts + sidebar)
- **Tablet (1024px-768px)**: Two-column layout (responsive grid)
- **Mobile (<768px)**: Single column layout (sidebar below charts)

Charts automatically resize based on container using Recharts' `ResponsiveContainer`.

## Changes Made to Other Components

### 1. Dashboard.jsx (Updated)

**Previous State:**
```jsx
function Dashboard() {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <p>Skills dashboard coming soon.</p>
    </section>
  )
}
```

**New State:**
- Imports `useCV` hook to access skills data
- Imports `SkillsDashboard` and `SkillsOverview` components
- Displays both components in a responsive two-column layout
- Added proper styling with new Dashboard.css

### 2. package.json (Updated)

**Changed:**
- Added `"recharts": "^2.10.3"` to dependencies

**Run:** `npm install` to download the new dependency

### 3. Existing Components (No Changes Required)

- SkillsForm.jsx - Continues to work as before; dashboard listens to data changes
- CVContext.jsx - No changes; existing context structure is sufficient
- All other components - No changes; dashboard is self-contained

## Styling Overview

### Colors & Themes

**Chart Colors:**
- Proficiency Levels: Red → Gold → Sky Blue → Green (progression from low to high)
- Technical: Blue (#4A90E2)
- Soft: Red (#E24A4A)

**Card Styling:**
- White background with rounded corners
- Subtle shadow with hover effects
- Gradient backgrounds for stat cards

**Typography:**
- Headers: 1.1rem bold
- Labels: 0.85-0.95rem
- Values: 1.75rem bold (in stat cards)

## Performance Considerations

1. **Efficient Re-renders**: Components only re-render when the skills array changes
2. **Memoization Ready**: Can be optimized further with React.memo() if needed
3. **No External API Calls**: All calculations done client-side
4. **Lightweight Library**: Recharts is optimized for performance

## Future Enhancement Ideas

1. **Export Functionality**: Add button to export charts as images
2. **Date Tracking**: Track skill changes over time with timeline view
3. **Skill Recommendations**: Suggest new skills based on industry trends
4. **Comparison Mode**: Compare your skills against job requirements
5. **Skill Progression**: Track when skills were added and progressed
6. **Filtering**: Add filters to show specific categories or types
7. **Search**: Add search functionality within skills overview

## Troubleshooting

### Charts Not Displaying

**Issue:** Empty state showing instead of charts
- **Solution:** Ensure skills are added in the SkillsForm before viewing Dashboard

### Charts Look Distorted on Mobile

**Issue:** Charts appear cramped or misaligned
- **Solution:** This is handled by responsive design; refresh the page or resize window

### Package Installation Issues

**Issue:** `npm install` fails
- **Solution:** Clear node_modules: `rm -rf node_modules && npm install`

### Colors Not Showing

**Issue:** Charts appear with default colors
- **Solution:** Ensure skillsAnalytics.js is properly imported and CSS files are loaded

## Testing the Dashboard

### Manual Testing Steps

1. Navigate to the Dashboard page
2. View the empty state message
3. Go to Editor and add several skills with different:
   - Levels (Basic, Intermediate, Advanced, Expert)
   - Categories (Frontend, Backend, Design, etc.)
   - Descriptions
4. Return to Dashboard - all charts should display
5. Add more skills and observe charts updating
6. Edit a skill's level or category - charts update immediately
7. Delete a skill - charts update to reflect removal
8. Test on mobile/tablet - layout should adapt

## Version History

- **v1.0** (2026-06-14): Initial implementation with 4 charts and overview sidebar
  - Skill levels distribution
  - Category distribution
  - Technical vs Soft skills classification
  - Real-time updates on skill changes

## Support & Maintenance

For issues or enhancements:
1. Check the Troubleshooting section above
2. Verify all files were created correctly in the specified paths
3. Ensure `npm install` was run after updating package.json
4. Clear browser cache if UI doesn't update
