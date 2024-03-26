<script setup>

</script>


<template>
  <div class="flex flex-col items-center gap-9 p-20">
    <h1 class="text-3xl text-blue-600">Metrolympiades</h1>
    <h2 class="text-2xl">Log-in</h2>
    <form action="" class="flex flex-col items-center gap-9 p-10">
      <input type="email" placeholder="Email" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"/>
      <input id="password" name="password" type="password" pattern="^\S{6,}$" onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Must have at least 6 characters' : ''); if(this.checkValidity()) form.password_check.pattern = this.value;" placeholder="Password" required>
      <input id="password_check" name="password_check" type="password" pattern="^\S{6,}$" onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Please enter the same Password as above' : '');" placeholder="Verify Password" required>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
    </form>
  </div>

</template>

