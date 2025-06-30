'use client'

import { useState, useEffect } from 'react'
import { TaskList } from './TaskList'
import { AddTaskDialog } from './AddTaskDialog'
import { TaskListSkeleton } from './TaskCardSkeleton'
import { Task, User } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import apiService from '@/lib/api'

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const fetchTasks = async () => {
    try {
      const tasks = await apiService.tasks.getTasks()
      setTasks(tasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const users = await apiService.users.getUsers()
      setUsers(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await Promise.all([fetchTasks(), fetchUsers()])
    setRefreshing(false)
  }

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true)
      await Promise.all([fetchTasks(), fetchUsers()])
      setLoading(false)
    }
    initialLoad()
  }, [])

  const handleEdit = (task: Task) => {
    setEditingTask(task)
  }

  const handleEditComplete = () => {
    setEditingTask(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <AddTaskDialog 
            users={users} 
            onRefresh={handleRefresh}
            editTask={editingTask}
            onEditComplete={handleEditComplete}
          />
        </div>
      </div>

      {loading || refreshing ? (
        <TaskListSkeleton />
      ) : (
        <TaskList
          tasks={tasks}
          users={users}
          onEdit={handleEdit}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  )
} 