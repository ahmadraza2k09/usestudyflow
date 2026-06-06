# StudyFlow

**Stay Organized. Stay Ahead.**

StudyFlow is a modern academic productivity platform designed to help students manage assignments, track deadlines, monitor progress, and stay organized.

## Features

- **Dashboard Overview**: View comprehensive statistics including total, pending, completed, and overdue assignments
- **Assignment Management**: Add, edit, delete, and toggle assignment status
- **Smart Filtering**: Search and filter by subject, priority, and status
- **Progress Tracking**: Visual progress bars and completion rates
- **Due Date Countdown**: Automatic detection of overdue assignments with smart date formatting
- **Statistics & Insights**: Detailed analytics on performance, subject distribution, and priority breakdown
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **LocalStorage Persistence**: All data is stored locally in your browser - no account required

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to the provided local URL

## Building for Production

Build the project:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Vercel will automatically detect the configuration and deploy

Alternatively, deploy directly using Vercel CLI:
```bash
vercel
```

## Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main application component
├── imports/                # Assets (logo, images)
└── styles/                 # CSS files
```

## Features in Detail

### Assignment Fields
- Title
- Subject Name
- Due Date
- Priority Level (Low, Medium, High)
- Status (Pending, Completed)
- Optional Notes

### Filtering Options
- Search by title, subject, or notes
- Filter by subject
- Filter by priority level
- Filter by status (All, Pending, Completed, Overdue)
- Sort by due date, newest, oldest, or priority

### Smart Features
- Automatic overdue detection
- Due date countdown (Due Today, Due Tomorrow, X Days Remaining)
- Priority-based color coding
- Completion percentage tracking
- Subject distribution analytics

## Portfolio Project

This is a portfolio demonstration project showcasing modern web development practices, clean architecture, and professional UI/UX design.

For a production-ready version with authentication, cloud database, multi-user support, backups, notifications, and enterprise features, contact: ahmadrazahfa@gmail.com

## License

This project is for portfolio and demonstration purposes.
