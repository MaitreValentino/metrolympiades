import { createClient } from '@supabase/supabase-js'

let supabase = null;

export default function useSupabase(){

    const supabaseUrl = process.env.SUPABASE_URL;

    const anon = import.meta.env.VITE_SUPABASE_ANNON;
    
    if(supabase == null){
        supabase = createClient(supabaseUrl, anon)
    }
    
    return {supabase}

}