<script setup>
import { onMounted, ref } from 'vue';
import useSupabase from '../api/supabase';

const {supabase} = useSupabase();



const team = ref([])
const sports = ref([])
const team1model = defineModel('team1model')
const team2model = defineModel('team2model')
const sportmodel = defineModel('sportmodel')

async function getTeam(){
    const{data} = await supabase.from('teams').select()
    team.value = data
}

async function getSport(){
    const{data} = await supabase.from('sports').select()
    sports.value = data
}

async function submit(){
    await supabase.from('matchs').insert({
        team1: team1model.value,
        team2: team2model.value,
        sport: sportmodel.value,
        
    })
}

onMounted(() => {
    getTeam()
    getSport()
})


</script>


<template>
    <div class="flex flex-col items-center gap-8 p-20">
        
        <h1 class="text-3xl text-blue-600">Matchs</h1>

        <label> Team 1:<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="team1model" name="team1" id="team1-select">
        <option value="">Team 1 :</option>
        <option v-for="item in team" :value=item.id>{{ item.name }}</option>
        </select></label>
        <label>Team 2:
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="team2model" name="team2" id="team2-select">
            <option value="">Team 2 :</option>
            <option v-for="item in team" :value=item.id>{{ item.name }}</option>
        </select>
        </label>
        <label>Sport:
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="sportmodel" name="sports" id="sport-select">
        <option value="">Sports :</option>
        <option v-for="item in sports" :value="item.id">{{ item.intitule }}</option>
        </select>
        </label>
        <br>
        <label>Time : <input type="time" id="heurematch" name="heurematch" min="09:00" max="22:00"/> </label>
        <br>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="submit">Create a match</button>
    </div>
</template>