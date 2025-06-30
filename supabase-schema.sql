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