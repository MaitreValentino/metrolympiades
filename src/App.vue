<script setup>
import RankingBox from './components/RankingBox.vue';
import useSupabase from './api/supabase';
import { onMounted,ref } from 'vue';

const {supabase} = useSupabase();

const teams = ref([])
const score = [15,10,1000,-1000]

// const scores = ref([])

// function getScore(teams){
//     // console.log(teams[0]["matchs"][0].team1_score)
//     const listTeams = [];
//     teams.forEach(team => {
//         listTeams.push(team.id)
//     });
//     teams.forEach(team => {
//         listTeams.forEach(teamId =>{
//             if(teamId == team.matchs[0].team1) {
//                 console.log(scores.value) 
//                 scores.value.push(team[0]["matchs"][0].team1_score)
//             }
//         })
//     })
    
//     // return teams[0]["matchs"][0].team1_score
// }

async function getTeams() {
    const { data } = await supabase.from('teams').select(`
        id,
        name,
        matchs!public_matchs_team1_fkey(team1,team2,team1_score,team2_score)
    `)
    teams.value = data;
    // const result = getScore(data)
    // teams.value = result
    // console.log(teams.value)
}



onMounted( () => {
    getTeams()
    // getScore()
})

const hidden = ref(true)
var teamName = ref()

function afficheNavbar() {
  if (hidden.value == true) hidden.value = false
  else if (hidden.value == false) hidden.value = true
}

async function getTeamName() {
  const { data: teams } = await supabase.from('teams').select('name')
  teamName.value = teams[0].name
}

getTeamName()

</script>

<template>
    <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{
          teamName
        }}</span>
      </a>
      <button
        data-collapse-toggle="navbar-hamburger"
        type="button"
        class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-hamburger"
        aria-expanded="false"
        @click="afficheNavbar"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="w-full" :class="{ hidden: hidden }" id="navbar - hamburger">
        <ul
          class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
              aria-current="page"
              >Team Settings</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Ranking</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >Matchs</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Log out</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Log in</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Sign up</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <main class="grid place-content-center pt-2">
        <h1 class="font-semibold place-self-center text-4xl"> Ranking </h1>
        <RankingBox v-for="(team,index) in teams" :key="team.id" :my="team" :index="index" :score="score"/> 
    </main>
</template>
