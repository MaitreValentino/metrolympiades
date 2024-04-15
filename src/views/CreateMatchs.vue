<script setup>
import { onMounted, ref } from 'vue';
import {getTeam1, getTeam2, getAllSport, createMatch} from "../api/createMatch"
import router from '@/router/main_router';



const team1 = ref([])
const team = ref([])
const sports = ref([])
const team2model = defineModel('team2model')
const sportmodel = defineModel('sportmodel')
const timemodel = defineModel('timemodel')
const errorMessage = ref('')

async function setup(){
    team1.value = await getTeam1()
    team.value = await getTeam2()
    sports.value = await getAllSport()
}


async function submit(){
    if( team2model != undefined && timemodel != undefined && sportmodel != undefined && timemodel.value != undefined){
        if( team1.value.id != team2model.value){
            await createMatch(team1.value.id, team2model.value, sportmodel.value, timemodel.value)
            team2model.value = ""
            sportmodel.value = ""
            timemodel.value = ""
            errorMessage.value = ''
        }else{
            errorMessage.value = 'You have to enter another team than your team'
        }
    }else{
        errorMessage.value = 'You have to enter all fields'
    }
router.push({name: 'displayMatchs'})
}

onMounted(() => {
    setup()
})


</script>


<template>
    <div class="flex flex-col items-center gap-8 p-20">
        <div v-if="errorMessage.length != 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error !</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
      </div>
        
        <h1 class="text-3xl text-blue-600">Matchs</h1>
        <label> Team 1:
            <p class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{{ team1.name }}</p>
        </label>
        <label>Team 2:
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="team2model" name="team2" id="team2-select">
            <option v-for="item in team" :value=item.id>{{ item.name }}</option>
        </select>
        </label>
        <label>Sport:
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="sportmodel" name="sports" id="sport-select">
        <option v-for="item in sports" :value="item.id">{{ item.intitule }}</option>
        </select>
        </label>
        <br>
        <label>Time : <input type="time" id="heurematch" name="heurematch" min="09:00" max="22:00" v-model="timemodel"/> </label>
        <br>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="submit">Create a match</button>
    </div>
</template>             