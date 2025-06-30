export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  assigned_user?: string
  created_at: string
  updated_at: string
  due_date?: string
  priority?: 'low' | 'medium' | 'high'
}

export interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
}

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: Task
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>
      }
      users: {
        Row: User
        Insert: Omit<User, 'id'>
        Update: Partial<Omit<User, 'id'>>
      }
    }
  }
} 