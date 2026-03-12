import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fauxsuojuzvvpgkzqaop.supabase.co"
const supabaseAnonKey = "sb_publishable_vFifNIHqoRJ5D-3jOcewwA_Keafxw7P"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  }
)