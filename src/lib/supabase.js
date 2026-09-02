
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } })
export async function safeInsert(table, data) {
  try {
    const { data: res, error } = await supabase.from(table).insert(data).select()
    if (error) throw error
    return { ok: true, data: res }
  } catch (e) {
    const key = `ccsp_${table}`
    const current = JSON.parse(localStorage.getItem(key) || '[]')
    const newItem = { ...data, id: data.id || Date.now().toString(), created_at: new Date().toISOString() }
    current.push(newItem)
    localStorage.setItem(key, JSON.stringify(current))
    return { ok: false, fallback: true, data: [newItem], error: e.message }
  }
}
