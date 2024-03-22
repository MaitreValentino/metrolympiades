import { createClient } from '@supabase/supabase-js'

export default function useSupabase(){

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    const anon = import.meta.env.VITE_SUPABASE_ANNON;
    
    const supabase = createClient(supabaseUrl, anon)
    
    return {supabase}

}