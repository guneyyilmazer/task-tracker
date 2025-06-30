# Task Tracker

A modern, responsive task management application built with Next.js, Supabase, and shadcn/ui. Perfect for team collaboration and individual task tracking.

## ✨ Features

### Core Features
- **Task Management**: Create, edit, and delete tasks with titles and descriptions
- **Status Tracking**: Mark tasks as complete or incomplete with visual indicators
- **Assignment System**: Assign tasks to team members
- **Task Display**: View all tasks with status, assignee, and priority information

### Enhanced Features
- **Search & Filtering**: Filter tasks by status, priority, and assignee
- **Priority Levels**: Set task priorities (High, Medium, Low) with color-coded badges
- **Due Dates**: Set and track task deadlines
- **Real-time Updates**: Automatic data synchronization with Supabase
- **Modern Loading States**: Skeleton loaders for smooth UX (no more spinning circles!)
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **User Avatars**: Visual user identification with initials

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui with Tailwind CSS
- **HTTP Client**: Axios with interceptors
- **Loading States**: shadcn/ui Skeleton components
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd task-tracker
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Create Database Schema

In your Supabase SQL Editor, run the SQL from `supabase-schema.sql`:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  assigned_user UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium'
);

-- Add sample users
INSERT INTO users (name, email) VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Mike Johnson', 'mike@example.com')
ON CONFLICT (email) DO NOTHING;

-- Add sample tasks
INSERT INTO tasks (title, description, assigned_user, priority) VALUES
  ('Setup project', 'Initialize the task tracker project', (SELECT id FROM users WHERE email = 'john@example.com'), 'high'),
  ('Design UI', 'Create the user interface mockups', (SELECT id FROM users WHERE email = 'jane@example.com'), 'medium'),
  ('Write documentation', 'Create user documentation', (SELECT id FROM users WHERE email = 'mike@example.com'), 'low');
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your task tracker in action!

## 📚 Usage Guide

### Adding Tasks
1. Click the "Add Task" button
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Assignee** (optional)
   - **Priority** (High/Medium/Low)
   - **Due Date** (optional)
3. Click "Create" to save

### Managing Tasks
- **Complete/Incomplete**: Click the checkbox on any task card
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon to remove a task

### Filtering and Search
- **Search**: Type in the search box to find tasks by title or description
- **Status Filter**: Show all, completed, or incomplete tasks
- **Priority Filter**: Filter by High, Medium, or Low priority
- **Assignee Filter**: Show tasks for specific team members

## 🏗️ Project Structure

```
task-tracker/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── TaskTracker.tsx    # Main app component
│   ├── TaskCard.tsx       # Individual task display
│   ├── TaskList.tsx       # Task grid with filtering
│   └── AddTaskDialog.tsx  # Task creation/editing modal
├── lib/
│   ├── supabase/
│   │   ├── client.ts      # Client-side Supabase config
│   │   └── server.ts      # Server-side Supabase config
│   ├── types/
│   │   └── database.ts    # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── supabase-schema.sql    # Database schema
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface using shadcn/ui components
- **Skeleton Loading**: Smooth loading experience with content placeholders
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Loading states, hover effects, and smooth transitions
- **Color Coding**: Priority-based color system for quick task identification

## 🔧 Customization

### Adding New Users
Add users directly to the Supabase `users` table or extend the app with user registration.

### Extending Task Properties
1. Update the database schema in Supabase
2. Modify the `Task` interface in `lib/types/database.ts`
3. Update the UI components to handle new fields

### Styling
- Modify `app/globals.css` for global styles
- Use Tailwind classes for component-specific styling
- Customize shadcn/ui theme in `components.json`

## 📝 Interview Notes

This project demonstrates:
- **React Patterns**: Custom hooks, component composition, state management
- **TypeScript**: Type safety, interfaces, and proper typing
- **Database Integration**: CRUD operations with Supabase
- **UI/UX**: Modern component library usage and responsive design
- **Code Organization**: Clean architecture and separation of concerns

Perfect for showcasing full-stack development skills in a modern React ecosystem!

## 🐛 Troubleshooting

**Environment Variables**: Make sure your `.env.local` file is in the root directory and not committed to git.

**Database Connection**: Verify your Supabase URL and anon key are correct and the database schema has been created.

**Build Issues**: Clear your `.next` directory and node_modules, then run `npm install` again.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
# task-tracker
