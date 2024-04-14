<script setup>
import useSupabase from '@/api/supabase';
const { supabase } = useSupabase()

async function getMatchs() {
    const { data, error } = await supabase
        .from('matchs')
        .select()
    console.log(data)
}

getMatchs()

</script>

<template>



</template>