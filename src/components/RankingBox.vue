<script setup>
const props = defineProps(["my"])

const myProps = props.my
</script>

<template>
    <div>
        {{myProps}}
    </div>
</template>