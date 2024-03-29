<script setup>
import { ref } from 'vue'
import useSupabase from '@/api/supabase'
const { supabase } = useSupabase()

var teamName = ref()

const tabMember = ref(['Mattheo', 'Raphaël', 'Jean', 'Valentin', 'Pric'])

async function getTeamName() {
  const { data: teams } = await supabase.from('teams').select('name')
  teamName.value = teams[0].name
}

getTeamName()
</script>

<template>
  <div class="flex flex-col items-center gap-9 p-5">
    <input class="text-4xl text-center" type="text" :value="teamName" placeholder="Nom d'équipe" />
  </div>

  <div class="flex flex-col">
    <h2 class="pb-9 pl-1 text-xl">Members</h2>
    <div class="pb-5 pl-4" v-for="member in tabMember" :key="member">
      <input type="text" class="border border-black mr-2" :value="member" />
      <button
        v-if="tabMember == null"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      >
        +
      </button>
      <button
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      >
        -
      </button>
    </div>
  </div>
  <div class="flex flex-row justify-center">
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="saveTeam"
    >
      Sauvegarder
    </button>
    <button
      type="submit"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
    >
      Annuler
    </button>
  </div>
</template>
