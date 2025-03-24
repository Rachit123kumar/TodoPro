
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseKey = process.env.NEXT_PUBLIC_API_KEY
const supabaseKey2 = process.env.NEXT_PUBLIC_ANON_KEY
// console.log(supabaseKey)
export const supabase = createClient(supabaseUrl, supabaseKey2)
// export const supabase2 = createClient(supabaseUrl, supabaseKey2)