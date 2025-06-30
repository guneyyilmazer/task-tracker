import { create } from 'zustand'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  initialized: boolean
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },

  initialize: async () => {
    if (get().initialized) return

    const supabase = createClient()
    
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession()
    set({ 
      session, 
      user: session?.user ?? null, 
      loading: false,
      initialized: true 
    })

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      set({ 
        session, 
        user: session?.user ?? null, 
        loading: false 
      })
    })
  },
}))

// Auto-initialize on store creation
if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize()
} 