<script setup lang="ts">
import {Component} from "vue"

defineProps<{
  component1: Component,
  component2: Component
}>()
</script>

<template>
  <div>
    <div class="mdui-col-sm-6">
      <component :is="component1"/>
    </div>
    <div class="mdui-col-sm-6">
      <component :is="component2"/>
    </div>
  </div>
</template>

<style scoped>

</style>