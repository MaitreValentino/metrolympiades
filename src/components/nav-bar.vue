<script setup>
import { ref } from 'vue'
import { signOut, isLoggedIn } from '@/api/auth';
import useSupabase from '@/api/supabase';
const { supabase } = useSupabase()

const hidden = ref(true)
const logged = ref(false)

async function afficheNavbar() {
  if(logged == true){
    getTeam()
  }
  if (hidden.value == true) hidden.value = false
  else if (hidden.value == false) hidden.value = true
  logged.value = await isLoggedIn()
}

const teamName = ref('')

async function getTeam(){
  let {data: {user}} = await supabase.auth.getUser()
  const {data} = await supabase.from("teams").select('name').eq('leader',user.id)
  teamName.value = data[0].name == null ? 'Temporary name' : data[0]
}

function logout(){
  signOut()
  logged.value = false
}
</script>

<template>
  <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ teamName.name }}</span>
      </a>
      <button data-collapse-toggle="navbar-hamburger" type="button"
        class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-hamburger" aria-expanded="false" @click="afficheNavbar">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>

      <div class="w-full" :class="{ hidden: hidden }" id="navbar - hamburger">
        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li v-if="logged">
              <router-link :to="{ name: 'teamManager' }">
              <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                aria-current="page">Team
                Settings</a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'home' }">
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Ranking</a>
              </router-link>
            </li>
            <li v-if="logged">
              <router-link :to="{ name: 'displayMatchs' }">
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Matchs</a>
              </router-link>
            </li>
            <li v-if="logged">
              <router-link :to="{ name: 'teamManager' }">
              <button @click="logout()"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Log
                out</button>
              </router-link>
            </li>
            <li v-if="!logged">
              <router-link :to="{ name: 'login' }">
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Log
                in</a>
              </router-link>
            </li>
            <li v-if="!logged">
              <router-link :to="{ name: 'signup' }">
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Sign
                up</a>
              </router-link>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
