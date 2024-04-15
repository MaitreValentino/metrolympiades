<script setup>
import RankingBox from '../components/RankingBox.vue';
import useSupabase from './api/supabase';
import { onMounted,ref } from 'vue';

const {supabase} = useSupabase();

const teams = ref([])
const scores = ref([])

async function getTeams() {
    const { data } = await supabase.from('teams').select(`
        id,
        name,
        matchs!public_matchs_team1_fkey(team1,team2,team1_score,team2_score)
    `)
    teams.value = data;
    getScore(teams.value);
}

function getScore(teams){
    const listTeams = [];

    teams.forEach(team => {
        team.matchs.forEach(match => {
            const [team1Score,team2id,team2Score] = score(match);

            if (!listTeams[team.id]) {
                listTeams[team.id] = { id: team.id, score: team1Score };
            } else {
                listTeams[team.id].score += team1Score;
            }

            if (!listTeams[team2id]) {
                listTeams[team2id] = { id: team2id, score: team2Score };
            } else {
                listTeams[team2id].score += team2Score;
            }
        });
    });
    const teamsArray = Object.values(listTeams);

    teamsArray.sort((a, b) => b.score - a.score);
    
    scores.value = Object.values(teamsArray);
}

function score(match){
  if(match.team1_score == null || match.team2_score == null)return [0,match.team2,0];
  if(match.team1_score == match.team2_score){
    return [1,match.team2,1];
  }
  if(match.team1_score>match.team2_score){
    return [3,match.team2,0];
  }
  else{
    return [0,match.team2,3];
  }
}

function idToName(team){
  var currentName;
  teams.value.forEach(currentTeam=>{
    if(currentTeam.id == team.id){
       currentName =  currentTeam.name;
    }
  })
  return currentName;
}

onMounted( () => {
    getTeams()
})
</script>

<template>
    <main class="grid place-content-center pt-2">
        <h1 class="font-semibold place-self-center text-4xl"> Ranking </h1>
        <RankingBox v-for="(team,index) in scores" :key="team.id" :team="idToName(team)" :index="index" :score="scores"/> 
    </main>
</template>