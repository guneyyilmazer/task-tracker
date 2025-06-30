import axios from 'axios'
import { Task, User } from './types/database'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API Response types
interface TasksResponse {
  tasks: Task[]
}

interface UsersResponse {
  users: User[]
}

// Tasks API
export const tasksApi = {
  // Fetch all tasks
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await api.get<TasksResponse>('/tasks')
      return response.data.tasks || []
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      throw new Error('Failed to fetch tasks')
    }
  },

  // Create a new task
  createTask: async (taskData: {
    title: string
    description?: string
    assigned_user?: string
    priority: 'low' | 'medium' | 'high'
    due_date?: string
  }): Promise<void> => {
    try {
      await api.post('/tasks', taskData)
    } catch (error) {
      console.error('Failed to create task:', error)
      throw new Error('Failed to create task')
    }
  },

  // Update an existing task
  updateTask: async (taskId: string, taskData: {
    title: string
    description?: string
    assigned_user?: string
    priority: 'low' | 'medium' | 'high'
    due_date?: string
  }): Promise<void> => {
    try {
      await api.put(`/tasks/${taskId}`, taskData)
    } catch (error) {
      console.error('Failed to update task:', error)
      throw new Error('Failed to update task')
    }
  },

  // Delete a task
  deleteTask: async (taskId: string): Promise<void> => {
    try {
      await api.delete(`/tasks/${taskId}`)
    } catch (error) {
      console.error('Failed to delete task:', error)
      throw new Error('Failed to delete task')
    }
  },

  // Toggle task completion
  toggleTaskComplete: async (taskId: string, completed: boolean): Promise<void> => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`, { completed: !completed })
    } catch (error) {
      console.error('Failed to toggle task completion:', error)
      throw new Error('Failed to toggle task completion')
    }
  },
}

// Users API
export const usersApi = {
  // Fetch all users
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<UsersResponse>('/users')
      return response.data.users || []
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw new Error('Failed to fetch users')
    }
  },
}

// Combined API object for easy importing
export const apiService = {
  tasks: tasksApi,
  users: usersApi,
}

export default apiService 