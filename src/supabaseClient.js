import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient('https://ifenhtfedffkotsqiuuy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZW5odGZlZGZma290c3FpdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMTEzMTgsImV4cCI6MjAxMTU4NzMxOH0.jdKA0tEJguoBAeoY_DdYunhnyWdZpFuaNrj-4ye6m4g')