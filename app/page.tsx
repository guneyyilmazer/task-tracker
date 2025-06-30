'use client'

import { TaskTracker } from '@/components/TaskTracker'
import { AuthPage } from '@/components/AuthPage'
import { Header } from '@/components/Header'
import { useAuthStore } from '@/lib/stores/authStore'

export default function Home() {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return (
    <>
      <Header />
      <TaskTracker />
    </>
  )
}
