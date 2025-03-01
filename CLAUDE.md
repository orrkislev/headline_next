# Headlines Next Project Guide

## Build & Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run analyze` - Build with bundle analyzer
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Code Style Guidelines

### Imports
- React imports first
- Local components second
- Utilities from project paths with @/ prefix
- External libraries last

### Component Style
- Named function declarations with PascalCase
- Props destructured in parameters
- One component per file

### Styling
- Use Tailwind CSS utility classes
- Custom utility classes in globals.css
- MUI components for complex UI elements

### State Management
- React hooks (useState, useEffect, useRef)
- Computed values with useMemo
- Optional chaining for safe property access

### Naming Conventions
- PascalCase for components
- camelCase for variables and functions
- Boolean variables prefixed with 'is'
- Handler functions with descriptive verbs

### Error Handling
- Simple null checks before rendering
- Fallback content for empty states
- Defensive coding with optional chaining