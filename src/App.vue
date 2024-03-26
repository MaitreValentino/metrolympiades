<script setup>
import RankingBox from './components/RankingBox.vue';
import useSupabase from './api/supabase';
import { onMounted,ref } from 'vue';

const {supabase} = useSupabase();

const teams = ref([])

const scores = ref([])

function getScore(teams){
    // console.log(teams[0]["matchs"][0].team1_score)
    const listTeams = [];
    teams.forEach(team => {
        listTeams.push(team.id)
    });
    teams.forEach(team => {
        listTeams.forEach(teamId =>{
            if(teamId == team.matchs[0].team1) {
                console.log(scores.value) 
                scores.value.push(team[0]["matchs"][0].team1_score)
            }
        })
    })
    

    // return teams[0]["matchs"][0].team1_score
}

async function getTeams() {
    const { data } = await supabase.from('teams').select(`
        id,
        name,
        matchs!public_matchs_team1_fkey(team1,team2,team1_score,team2_score)
    `)
    console.log(data);
    const result = getScore(data)
    teams.value = result
    // console.log(teams.value)
}



onMounted( () => {
    getTeams()
    getScore()
})


</script>

<template>
    <main class="h-screen w-screen overflow-hidden grow justify-between">
        <RankingBox v-for="(team,index) in teams" :key="team.id" :my="team" :index="index" /> 
    </main>
</template>
