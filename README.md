# KPI Dashboard

This is a brief summary of the work completed:

## Features

### KPI Library
- Browse and search through available KPIs
  - Real-time search functionality
  - Combined search and category filtering
  - Dynamic results updating
  - Search by KPI name, description, or data source

- Filter KPIs by categories
  - Category dropdown with predefined options
  - Combined filtering with search queries

- Detailed KPI information including:
  - Description and calculation methodology
  - Industry context and relevance
  - Business questions addressed
  - Data sources
  - Access level controls

- Multiple visualization options:
  - Line charts for trend analysis
  - Bar charts for comparison
  - Pie charts for distribution

- Interactive chart controls with customizable views

- Access control system:
  - Request access workflow for restricted KPIs
  - Access approval simulation

### Dashboard Creation
- Create custom dashboard layouts
- Drag-and-drop interface for arranging charts
- Save and manage multiple dashboard

- Features include:
  - Flexible grid layout system
  - Resizable chart components
  - Multiple chart types support
  - Quick edit and delete options
  - Chart annotations and comments
  - Customize title for each chart

### Access Request

###

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kpi-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dependencies

### Core Dependencies
```json
{
  "next": "15.2.2",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5"
}
```

### State Management & Utilities
```json
{
  "zustand": "^5.0.3",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.0.2"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.2.2",
  "tailwindcss": "^4.0.13"
}
```

## Project Structure

```
kpi-dashboard/
├── components/
│   ├── charts/                             # Chart components
│   ├── dashboard-creation/                 # Dashboard creation components
│   ├── kpi-interface/                      # KPI interface components
│   ├── library-dashboard/                  # Library Dashboard components
├── types/                                  # TypeScript type definitions
├── store/                                  # State management
└── data/                                   # Mock data and constants
```

## Developer Notes

Each technology and practice was chosen to address specific needs while maintaining a cohesive and efficient development experience, including:

###Technologies

1. **Next.js & React 19** as the base framework for the entire application, utilizing the App Router for efficient routing and server-side rendering. The "use client" directive is applied to interactive components while leveraging Next.js's built-in optimizations.

2. **TypeScript** is used throughout the codebase, particularly in the `/types` directory for defining KPI and Dashboard interfaces, component props, and state management types, enhancing the developer experience with improved autocomplete and type safety.

3. **Zustand** is used in the `/store` directory for global state management as a lightweight alternative to Redux. It seamlessly integrates with TypeScript and manages dashboard layouts, KPI access control state, and search/filter states.

4. **Recharts** built on D3.js, is implemented in the `/components/charts` directory for powerful, customizable, and responsive data visualizations, ensuring consistent styling and interaction patterns.

### Techniques

5. **Component Architecture** designed with a `/components` directory structure to maintain a clean, modular codebase, promoting reusability and clear component responsibilities.

6. **State Management Strategy** implemented throughout the application to address complex dashboard state requirements, ensure shared state across components, and optimize performance. This includes global state for dashboard layouts, local state for component-specific UI, and efficient re-renders through a well-structured state management approach.

### Best Practices

7. **Code Organization** designed with a feature-based folder structure, clear and consistent file naming conventions, and standardized component patterns to ensure maintainability, support scalability, and improve the developer experience.  

8. **JSDoc Documentation** maintained across the codebase by JSDinline documentation comments to improve maintainability. It allows for the automatic generation of documentation and enhances the developer experience with features like autocomplete and type checking.



Clendson Gonçalves