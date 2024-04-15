<script setup>
import { onMounted, ref } from 'vue';
import useSupabase from '../api/supabase';
import router from '../router/main_router'

const { supabase } = useSupabase();

const errorMessage = ref('')
const team1Name = ref("")
const team2Name = ref("")
const sport = ref("")
const time = ref("")
const matchId = ref()
const team1Score = ref()
const team2Score = ref()

async function match() {
    const { data } = await supabase.from("matchs")
        .select('id, team1(name), team2 (name),time,sports (intitule), team1_score, team2_score').or('id.eq.3f771bf8-8138-43c2-8e51-34660682accd');
    team1Name.value = data[0].team1.name
    team2Name.value = data[0].team2.name
    sport.value = data[0].sports.intitule
    time.value = data[0].time
    matchId.value = data[0].id
    team1Score.value = data[0].team1_score != null ? data[0].team1_score : 0
    team2Score.value = data[0].team2_score != null ? data[0].team2_score : 0
}

match()

async function submitChanges(){
    errorMessage.value = ""
    if(team1Score.value < 0 || team1Score.value == undefined){
        errorMessage.value += ("The score of " + team1Name.value + " cannot be null or less than 0.\n")
    }
    if(team2Score.value < 0 || team2Score.value == undefined){
        errorMessage.value += ("The score of " + team2Name.value + " cannot be null or less than 0.\n")
    }
    const { error } = await supabase
  .from('matchs')
  .update({ team1_score: team1Score.value , team2_score: team2Score.value })
  .eq('id', matchId.value)
  router.push({ name: 'displayMatchs' })
}

</script>


<template>
    <div class="flex flex-col items-center gap-8 p-20">
        <div v-if="errorMessage.length != 0"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error !</strong>
            <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div class="flex flex-col items-center gap-3">
            <p class="font-bold">{{ team1Name }} vs {{ team2Name }}</p>
            <p>{{ sport }}</p>
            <p>{{ time }}</p>
            <div class="flex">
                <p>score 1  score 2</p>   
            </div>
            <div class="flex">
                <input type="number" class="border-2 flex-1 w-20" v-model="team1Score">
                <input type="number" class="border-2 flex-1 w-20 ml-5" v-model="team2Score">
            </div>
        </div>
        <br>
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            @click="submitChanges()">Submit scores</button>
    </div>
</template>