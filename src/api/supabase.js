import { createClient } from '@supabase/supabase-js'

let supabase = null;

export default function useSupabase(){

    const supabaseUrl = import.meta.env.SUPABASE_URL;

    const anon = import.meta.env.VITE_SUPABASE_ANNON;
    
    if(!supabaseUrl){
        console.error("Supabase URL is not provided. Please configure it in your environment variables.");
    }

    if(supabase == null){
        supabase = createClient(supabaseUrl, anon)
    }
    
    return {supabase}

}