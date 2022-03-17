<script setup lang="ts">
import {Component} from "vue"
defineProps<{
  component: Component
}>()
</script>

<template>
  <component :is="component"/>
</template>

<style scoped>

</style>