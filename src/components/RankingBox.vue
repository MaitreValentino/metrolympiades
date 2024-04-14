<script setup>
const props = defineProps(["team","index","score"])

const teamProps = props.team
const indexProps = props.index
const scoreProps = props.score
</script>

<template>
    <div class="border-teal-950 border-2 border-solid rounded my-2 flex place-content-center p-2">
       {{ indexProps+1 }} {{teamProps}} {{ scoreProps[indexProps].score }}
    </div>
</template>