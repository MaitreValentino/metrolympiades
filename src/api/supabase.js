import { createClient } from '@supabase/supabase-js'

let supabase = null;

export default function useSupabase(){

    const supabaseUrl = process.env.VITE_SUPABASE_URL;

    const anon = process.env.VITE_SUPABASE_ANNON;
    
    if(supabase == null){
        supabase = createClient(supabaseUrl, anon)
    }
    
    return {supabase}

}