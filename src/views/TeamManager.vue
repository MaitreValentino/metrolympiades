<script setup>
import { computed, ref } from 'vue'
import useSupabase from '@/api/supabase'
const { supabase } = useSupabase()

var teamName = ref()

const name = ref()

const tabMember = ref([])

const countMember = computed(() => tabMember.value.length)

async function getMemberInList() {
  const { data: members } = await supabase.from('teams').select('members').eq('name', 'LesGoats')
  members[0].members.forEach((member) => {
    tabMember.value.push(member)
  })
}

async function getTeamName() {
  let {
    data: { user }
  } = await supabase.auth.getUser()
  const { data } = await supabase.from('teams').select().eq('leader', user.id)
  console.log(data[0])
}

function addMember() {
  tabMember.value.push(name.value)
  name.value = ''
}

function deleteMember(member) {
  tabMember.value.splice(tabMember.value.indexOf(member), 1)
}

async function saveTeam() {
  const newMembers = Array()

  tabMember.value.forEach((member) => {
    newMembers.push(member)
  })

  await supabase.from('teams').update({ members: newMembers }).eq('name', 'LesGoats').select()
}

getTeamName()
getMemberInList()
</script>

<template>
  <div class="flex flex-col items-center gap-9 p-5">
    <input class="text-4xl text-center" type="text" :value="teamName" placeholder="Nom d'équipe" />
  </div>

  <div class="flex flex-col">
    <h2 class="pb-9 pl-1 text-xl">Members</h2>
    <div class="pb-5 pl-4" v-if="countMember != 5">
      <input type="text" class="border border-black mr-2" v-model="name" @keyup.enter="addMember" />
      <button
        v-if="countMember < 5"
        @click="addMember"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      >
        +
      </button>
    </div>
    <div class="pb-5 pl-4" v-for="member in tabMember" :key="member.value">
      <input type="text" class="border border-black mr-2" :value="member" disabled />
      <button
        v-if="countMember > 0"
        @click="deleteMember(member)"
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
