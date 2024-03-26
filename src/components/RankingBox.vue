<script setup>
const props = defineProps(["my","index"])


const myProps = props.my
const indexProps = props.index
</script>

<template>
    <div>
       {{ indexProps+1 }} {{myProps.name}}
    </div>
</template>