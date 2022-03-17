<script setup lang="ts">
import {Component} from "vue"

defineProps<{
  component: Component
}>()
</script>

<template>
  <div>
    <component :is="component"/>
  </div>
</template>

<style scoped>

</style>