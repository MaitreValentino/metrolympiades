<script setup>
import { ref } from "vue"
import {signUp} from "../api/auth"

const email = ref()
const password = ref()
const passwordCheck = ref()
const errorMessage = ref('')

function signup(){
  errorMessage.value = "";
  let mail_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if(password.value == undefined) errorMessage.value += 'Please put a password\n';
  if(mail_regex.test(email.value)){
    if(password.value == passwordCheck.value){
      signUp(email.value,password.value)
    }else{
      errorMessage.value += "Password don't match\n";
    }
  }else{
    errorMessage.value += 'email is not correct\n';
  }
}

</script>

<template>
  <div class="flex flex-col items-center gap-9 p-20">
    <h1 class="text-3xl text-blue-600">Metrolympiades</h1>
    <img src="../../public/images/olympiade_logo.png">  
    <h2 class="text-2xl">Create my account</h2>
    <div v-if="errorMessage.length != 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error !</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>
      <input type="email" placeholder="Email" v-model="email"/>
      <input id="password" name="password" type="password" placeholder="Password" required v-model="password">
      <input id="password_check" name="password_check" type="password" placeholder="Verify Password" required v-model="passwordCheck">
      <button @click="signup()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Jump In !</button>
    
  </div>

</template>

