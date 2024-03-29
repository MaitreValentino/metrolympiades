<script setup>
const props = defineProps(["my","index","score"])

const myProps = props.my
const indexProps = props.index
const score = props.score
</script>

<template>
    <div class="border-teal-950 border-2 border-solid rounded my-2 flex place-content-center p-2">
       {{ indexProps+1 }} {{myProps.name}} {{ score[indexProps] }}
    </div>
</template>