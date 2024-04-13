<script setup>

import { ref } from "vue"
import {isLoggedIn, logIn} from "../api/auth"

const email = ref()
const password = ref()
const errorMessage = ref('')

async function loginFun(){
  errorMessage.value = ''
  await logIn(email.value, password.value)
  let logged = await isLoggedIn()
  if(!logged){
    errorMessage.value = "credentials don't match ou records "
  }
}



</script>


<template>
  <div class="flex flex-col items-center gap-5 p-20">
    <h1 class="text-3xl text-blue-600">Metrolympiades</h1>
    <img src="../../public/images/olympiade_logo.png">  
    <h2 class="text-2xl">Login</h2>
    <div v-if="errorMessage.length != 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error !</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>
    <input type="email" placeholder="Email" v-model="email"/>
      <input id="password" name="password" type="password" placeholder="Password" required v-model="password">
      <button @click="loginFun()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Jump In !</button>
  </div>
  <div class="flex flex-col items-center ">
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Visit as a guest</button>
  </div>

</template>

