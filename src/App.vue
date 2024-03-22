<script setup>
import RankingBox from './components/RankingBox.vue';

const nb = ["akjzeb", "fkjqnfkj"]
</script>

<template>
    <main class="h-screen w-screen flex flex-col overflow-hidden grow justify-between">
        <RankingBox v-for="test in nb" :my="test" /> 
    </main>
</template>
