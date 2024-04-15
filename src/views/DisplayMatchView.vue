<script setup>
import { ref } from "vue";
import useSupabase from '@/api/supabase';
const { supabase } = useSupabase()

let matchs = ref([])

const team1Name = ref("")
const team2Name = ref("")
const sport = ref("")
const time = ref("")
const matchId = ref()
const team1Score = ref()
const team2Score = ref()

async function match() {

    const todayDate = new Date();
    const todayHour = todayDate.getHours();
    const todayMinutes = todayDate.getMinutes();
    const todaySeconds = todayDate.getSeconds();

    const todayTime = `${todayHour}:${todayMinutes}:${todaySeconds}`;

    const { data } = await supabase.from("matchs")
        .select('id, team1(name), team2 (name),time,sports (intitule), team1_score, team2_score').gte('time', todayTime).order('time', { ascending: true });
    matchs.value = data
    console.log(matchs.value)
}

match()

</script>

<template>

    <div class="p-5">
        <div v-for="match in matchs" :key="match.id" class="flex flex-col items-center gap-5">
            <div class="border-2 rounded-lg border-cyan-600 p-2">
                <p>{{ match.team1.name }} VS {{ match.team2.name }}</p>
                <div class="flex flex-col items-center">
                    <p>{{ match.sports.intitule  }}</p>
                    <p>{{ match.team1_score != null ? match.team1_score : 0 }} - {{ match.team2_score != null ? match.team2_score : 0 }}</p>
                    <p>{{ match.time }}</p>
                    <div
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <router-link :to="{ name: 'editScore', params:{id : match.id} }" class="text-white text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M18.308 0l-16.87 16.873-1.436 7.127 7.125-1.437 16.872-16.875-5.691-5.688zm-15.751 21.444l.723-3.585 12.239-12.241 2.861 2.862-12.239 12.241-3.584.723zm17.237-14.378l-2.861-2.862 1.377-1.377 2.861 2.861-1.377 1.378z" />
                            </svg>
                            <span class="sr-only">Edit match</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="flex flex-row-reverse p-5 static bottom-0">
        <div class="flex items-center justify-center p-3 bg-cyan-600 rounded-full">
            <router-link :to="{ name: 'createMatch' }" class="text-white text-lg">
                +
            </router-link>
        </div>
    </footer>


</template>