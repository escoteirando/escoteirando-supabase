import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://vltaaixcxzefmjfcefrj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdGFhaXhjeHplZm1qZmNlZnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NDg5ODYsImV4cCI6MTk2MzUyNDk4Nn0.EOVaur4P5_L4TlZhN7s817siSBlhrk22s4sz0T0uhoI'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()
  user.value = session?.user || null
})
console.info('Supabase', supabase)

export default function useSupabase () {
  return { supabase }
}
